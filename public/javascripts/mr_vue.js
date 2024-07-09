/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars, no-undef
const mr_vue = Vue.createApp({
    data() {
        return {
            // Should be true if the user is signed in
            // Does nothing more than hide the sign in/up buttons and show the sign out button.
            user_signed_in: false,

            // Results from querying the server for club information
            clubs_to_display: [],
            clubs_query_result: "",
            clubs_to_display_search_term: "",

            // Results from querying for updates
            updates_to_display: [],
            updates_query_result: "",

            // Results from querying for events
            events_to_display: [],
            events_query_result: "",

            query_parameters: [],

            logged_in: false,
            is_manager: false,
            is_admin: false
        };
    },
    created() {
        // console.log("public vue created");
        this.check_signin_status();

        const params = new URLSearchParams(window.location.search);

        params.forEach((value, key) => {
            this.query_parameters[key] = value;
        });

        if ('logged_in' in this.query_parameters) {
            this.logged_in = Boolean(this.query_parameters.logged_in);
        }
        if ('is_manager' in this.query_parameters) {
            this.logged_in = Boolean(this.query_parameters.is_manager);
        }
        if ('is_admin' in this.query_parameters) {
            this.is_admin = Boolean(this.query_parameters.is_admin);
        }

        this.user_signed_in = this.logged_in;
    },

    computed: {
        see_all_clubs_feed_title() {
            if (this.clubs_to_display_search_term) {
                return `Searching for: ${this.clubs_to_display_search_term}`;
            }
            return "All Clubs";
        },

        filtered_clubs() {
            const search_term = this.clubs_to_display_search_term.toLowerCase().trim();

            if (search_term === "") {
                return this.clubs_to_display;
            }

            return this.clubs_to_display.filter((club) => {
                const club_name = club.name.toLowerCase();
                const club_description = club.description.toLowerCase();

                return (
                    club_name.includes(search_term)
                    || club_description.includes(search_term)
                );
            });
        }
    },

    methods: {
        check_signin_status() {
            let req = new XMLHttpRequest();

            const vue_this = this;

            req.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    if (req.cookies.logged_in === true) {
                        // console.log("req.cookiess.logged_in === true");
                        vue_this.user_signed_in = true;
                    } else {
                        // console.log("req.cookies.logged_in === false");
                        vue_this.user_signed_in = false;
                    }
                } else if (this.readyState === 4 && this.status === 500) {
                    // Server error
                    // console.log("server error");
                    vue_this.user_signed_in = false;
                }
            };

            let url = new URL('/login_check', window.location.href);

            req.open("POST", url.toString());
            req.send();
        },

        highlightText(text, searchTerm) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        },

        get_all_clubs: function () {
            let req = new XMLHttpRequest();

            const vue_this = this;

            req.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    // Stuff was found
                    vue_this.clubs_to_display = JSON.parse(req.response);
                    if (vue_this.clubs_to_display === []) {
                        vue_this.clubs_query_result = "No Clubs Found";
                    } else {
                        vue_this.clubs_query_result = "Clubs Found";
                    }
                } else if (this.readyState === 4 && this.status === 500) {
                    // Server error
                    vue_this.clubs_to_display = [];
                    vue_this.clubs_query_result = "Server Error";
                }
            };

            let url = new URL("/get_all_clubs", window.location.href);

            req.open("GET", url.toString());
            req.send();
        },

        get_updates(user_specific = false) {
            let req = new XMLHttpRequest();

            const vue_this = this;

            req.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    // Stuff was found
                    vue_this.updates_to_display = JSON.parse(req.response);
                    if (vue_this.updates_to_display === []) {
                        vue_this.updates_query_result = "No Updates Found";
                    } else {
                        vue_this.updates_query_result = "Updates Found";
                    }
                } else if (this.readyState === 4 && this.status === 500) {
                    // Server error
                    vue_this.updates_to_display = [];
                    vue_this.updates_query_result = "Server Error";
                }
            };

            let url; // Vomits
            if (user_specific) {
                url = new URL("/users/get_updates", window.location.href);
            } else {
                url = new URL("/get_updates", window.location.href);
            }

            req.open("GET", url.toString());
            req.send();
        },

        get_events(user_specific = false) {
            let req = new XMLHttpRequest();

            const vue_this = this;

            req.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    // Stuff was found
                    vue_this.events_to_display = JSON.parse(req.response);
                    if (vue_this.events_to_display === []) {
                        vue_this.events_query_result = "No Events Found";
                    } else {
                        vue_this.events_query_result = "Events Found";
                    }
                } else if (this.readyState === 4 && this.status === 500) {
                    // Server error
                    vue_this.events_to_display = [];
                    vue_this.events_query_result = "Server Error";
                }
            };

            let url;
            if (user_specific) {
                url = new URL("/users/get_events", window.location.href);
            } else {
                url = new URL("/get_events", window.location.href);
            }

            req.open("GET", url.toString());
            req.send();
        },

        get_events_and_updates(user_specific = false) {
            // If `user_specific` is true then the request is for events and updates of clubs the
            //  user is a part of.

            this.get_updates(user_specific);
            this.get_events(user_specific);
        }

    },
    mounted() {
        this.check_signin_status();
    }
}).mount('#app');
