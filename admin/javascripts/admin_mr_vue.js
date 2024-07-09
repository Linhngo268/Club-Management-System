// eslint-disable-next-line no-unused-vars, no-undef
const admin_mr_vue = Vue.createApp({
    data() {
        return {
            // Results from querying the server for user information
            users_to_display: [],
            users_query_result: "",
            users_to_display_search_term: "",

            // Results from querying the server for club information
            clubs_to_display: [],
            clubs_query_result: "",
            clubs_to_display_search_term: "",

            query_parameters: []
        };
    },

    created() {
        const params = new URLSearchParams(window.location.search);

        params.forEach((value, key) => {
            this.query_parameters[key] = value;
        });
    },

    computed: {
        see_all_users_feed_title() {
            if (this.users_to_display_search_term) {
                return `Searching for: ${this.users_to_display_search_term}`;
            }
            return "All Users";
        },

        filtered_users() {
            const search_term = this.users_to_display_search_term.toLowerCase().trim();

            if (search_term === "") {
                return this.users_to_display;
            }

            return this.users_to_display.filter((user) => {
                const firstName = user.first_name.toLowerCase();
                const lastName = user.last_name.toLowerCase();
                const username = user.username ? user.username.toLowerCase() : "";

                return (
                    firstName.includes(search_term)
                    || lastName.includes(search_term)
                    || username.includes(search_term)
                );
            });
        },

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
        highlightText(text, searchTerm) {
            // Black magic
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        },

        get_all_users: function () {
            // Does stuff
            let req = new XMLHttpRequest();

            const vue_this = this;

            req.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    // Stuff was found
                    vue_this.users_to_display = JSON.parse(req.response);
                    if (vue_this.users_to_display === []) {
                        vue_this.users_query_result = "No Users Found";
                    } else {
                        vue_this.users_query_result = "Users Found";
                    }
                } else if (this.readyState === 4 && this.status === 500) {
                    // Server error
                    vue_this.users_to_display = [];
                    vue_this.users_query_result = "Server Error";
                }
            };

            let url = new URL("/admin/get_all_users", window.location.href);

            req.open("GET", url.toString());
            req.send();
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
        }
    }
}).mount('#app');
