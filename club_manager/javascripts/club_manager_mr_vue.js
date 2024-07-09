// eslint-disable-next-line no-unused-vars, no-undef
const club_manager_mr_vue = Vue.createApp({
    data() {
        return {
            event_rsvps: [],
            club_members: [],
            club_info: {},
            club_events: [],
            club_updates: [],

            editing_club_description: false,
            edited_club_description: "",

            query_parameters: [],

            // The id of the current club we are working with
            working_club_id: 1
        };
    },

    created() {
        const params = new URLSearchParams(window.location.search);

        params.forEach((value, key) => {
            this.query_parameters[key] = value;
        });

        if ('club_id' in this.query_parameters) {
            // Assign the club_id value to the working_club_id attribute
            this.working_club_id = parseInt(this.query_parameters.club_id, 10);
        }
    },

    methods: {
        get_rsvps: function (event_id) {
            let req = new XMLHttpRequest();
            const vue_this = this;

            req.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    vue_this.event_rsvps = JSON.parse(req.response);
                } else {
                    vue_this.event_rsvps = [];
                }
            };

            let url = new URL("/club_manager/get_rsvps", window.location.href);
            let params = new URLSearchParams(url.search);

            params.append("event_id", event_id);

            url.search = params.toString();

            req.open("GET", url.toString());
            req.send();
        },
        get_members: function () {
            let req = new XMLHttpRequest();
            const vue_this = this;

            req.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    vue_this.club_members = JSON.parse(req.response);
                } else {
                    vue_this.club_members = [];
                }
            };

            let url = new URL("/club_manager/get_members", window.location.href);
            let params = new URLSearchParams(url.search);

            params.append("club_id", this.working_club_id);

            url.search = params.toString();

            req.open("GET", url.toString());
            req.send();
        },
        get_clubinfo: function () {
            let req = new XMLHttpRequest();
            const vue_this = this;

            req.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    // eslint-disable-next-line prefer-destructuring
                    vue_this.club_info = JSON.parse(req.response)[0];
                    vue_this.edited_club_description = vue_this.club_info.description;
                } else {
                    vue_this.club_info = {
                        name: "Unknown Club",
                        description: "..."
                    };
                }
            };

            let url = new URL("/get_clubinfo", window.location.href);
            let params = new URLSearchParams(url.search);

            params.append("club_id", this.working_club_id);

            url.search = params.toString();

            req.open("GET", url.toString());
            req.send();
        },
        get_eventinfo: function () {
            let req = new XMLHttpRequest();
            const vue_this = this;

            req.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    vue_this.club_events = JSON.parse(req.response);
                } else {
                    vue_this.club_events = [];
                }
            };

            let url = new URL("/get_eventinfo", window.location.href);
            let params = new URLSearchParams(url.search);

            params.append("club_id", this.working_club_id);

            url.search = params.toString();

            req.open("GET", url.toString());
            req.send();
        },
        get_eventupdates: function () {
            let req = new XMLHttpRequest();
            const vue_this = this;

            req.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    vue_this.club_updates = JSON.parse(req.response);
                } else {
                    vue_this.club_updates = [];
                }
            };

            let url = new URL("/get_eventupdates", window.location.href);
            let params = new URLSearchParams(url.search);

            params.append("club_id", this.working_club_id);

            url.search = params.toString();

            req.open("GET", url.toString());
            req.send();
        },

        get_all_clubinfo: function () {
            this.get_clubinfo(this.working_club_id);
            this.get_eventinfo(this.working_club_id);
            this.get_eventupdates(this.working_club_id);

        },

        edit_club_description_method: function () {
            if (!this.editing_club_description) {
                // Set the text in the text area to the current description
                this.edited_club_description = this.club_info.description;
                // NOW WE EDIT
                this.editing_club_description = true;
            }
        },

        save_club_description_edits: function () {
            // Extracts the text from the text area and sends its contense to the server
            this.editing_club_description = false;

            const info_to_send = {
                new_description: this.edited_club_description
            };

            let req = new XMLHttpRequest();

            const vue_this = this;

            req.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    // If a success then reload the club information
                    vue_this.get_clubinfo();
                }
            };

            let url = new URL("/club_manager/update_description", window.location.href);
            let params = new URLSearchParams(url.search);

            // eslint-disable-next-line no-param-reassign

            params.append("club_id", this.working_club_id);

            url.search = params.toString();

            req.open("POST", url.toString());
            req.setRequestHeader("Content-Type", "application/json");
            req.send(JSON.stringify(info_to_send));
        },

        cancel_club_description_edits: function () {
            //
            this.editing_club_description = false;
        }

    }
}).mount('#app');
