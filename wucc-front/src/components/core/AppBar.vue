<template>
    <v-app-bar
        app
        flat
    >
        <v-app-bar-nav-icon
            class="hidden-md-and-up"
            @click="toggleDrawer"
        />

        <v-container class="mx-auto py-0">
            <v-row align="center">
                <v-img
                    :src="require('@/assets/logo.png')"
                    class="mr-5"
                    contain
                    height="48"
                    width="48"
                    max-width="48"
                    @click="$vuetify.goTo(0)"
                />

                <v-text-field
                    append-icon="mdi-magnify"
                    flat
                    hide-details
                    solo-inverted
                    style="max-width: 300px;"
                />
                <v-spacer/>
                <div v-if="!currentUser">
                    <v-btn
                        v-for="(link, i) in NoUserLinks"
                        :key="i"
                        v-bind="link"
                        class="hidden-sm-and-down"
                        text
                        @click="onClick($event, link)"
                    >
                        {{ link.text }}
                    </v-btn>
                </div>
                <div v-if="currentUser && !isEditPostPage">
                    <v-menu left offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn class="hidden-sm-and-down ma-2" text v-on="on" @click="getEventData">Events
                                <v-icon right>mdi-menu-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list dense>
                            <v-subheader>Regular Events</v-subheader>
                            <v-list-item-group v-model="regularEventItems" color="primary">
                                <v-list-item
                                    v-for="(item, i) in regularEventItems"
                                    :key="i"
                                    @click="goEventList(item)"
                                >
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.text"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                            <v-divider></v-divider>
                            <v-subheader>Casual Events</v-subheader>
                            <v-list-item-group v-model="casualEventItems" color="primary">
                                <v-list-item
                                    v-for="(item, i) in casualEventItems"
                                    :key="i"
                                    @click="goEventList(item)"
                                >
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.text"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-menu>
                    <v-btn
                        class="hidden-sm-and-down ma-2"
                        text
                        to="/about"
                    >
                        Blog
                    </v-btn>
                    <v-menu left offset-y class="">
                        <template v-slot:activator="{ on }">
                            <v-avatar :color="getColor" v-on="on" @click="getEventData" size="36" class="ma-2 hidden-sm-and-down">
                                <span class="white--text">{{ getAvatarName }}</span>
                            </v-avatar>
                        </template>
                        <v-list dense>
                            <v-subheader>Regular Events</v-subheader>
                            <v-list-item-group v-model="regularEventItems" color="primary">
                                <v-list-item
                                    v-for="(item, i) in regularEventItems"
                                    :key="i"
                                    @click="goEventList(item)"
                                >
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.text"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                            <v-divider></v-divider>
                            <v-subheader>Casual Events</v-subheader>
                            <v-list-item-group v-model="casualEventItems" color="primary">
                                <v-list-item
                                    v-for="(item, i) in casualEventItems"
                                    :key="i"
                                    @click="goEventList(item)"
                                >
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.text"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-menu>
                </div>

            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
    import {mapMutations} from 'vuex';
    import router from "../../router";

    export default {
        name: "CoreAppBar",
        data() {
            return {
                home: {
                    'href': "/"
                },
                regularEventItems: [],
                casualEventItems: []
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            isEditPostPage() {
                return this.$store.state.pathes.editPostPage;
            },
            NoUserLinks() {
                return [
                    {
                        "text": "Home",
                        "href": "/"
                    },
                    {
                        "text": "Sign Up",
                        "href": "/register"
                    },
                    {
                        "text": "Login",
                        "href": "/login"
                    }
                ]
            },
            getColor(){
                if (this.$store.state.auth.user.gender === 1) {
                    return "red lighten-1";
                } else {
                    return "blue-grey lighten-3"
                }
            },
            getAvatarName(){
                let user = this.$store.state.auth.user;
                return user.firstName.slice(0, 1).toUpperCase() + user.lastName.slice(0, 1).toUpperCase();
            }
        },
        methods: {
            // logOut() {
            //     this.$store.dispatch('auth/logout');
            //     this.$router.push('login');
            // },

            ...mapMutations("pathes", ['toggleDrawer']),

            onClick(e, item) {
                e.stopPropagation();
                console.log(item);

                if (item.to || !item.href) return;

                this.$vuetify.goTo(item.href.endsWith('!') ? 0 : item.href)
            },
            getEventData() {
                this.regularEventItems = [];
                this.casualEventItems = [];
                this.regularEventItems.push({
                    text: "Bible Study",
                    icon: "mdi-book-open-blank-variant",
                    href: "/login"
                });
                this.regularEventItems.push({
                    text: "Dinner Meeting",
                    icon: "mdi-cake",
                    href: "!"
                });
                this.casualEventItems.push({
                    text: "Visit Wellington",
                    icon: "mdi-google-maps",
                    href: "!"
                });
                this.casualEventItems.push({
                    text: "Visit Wellington",
                    icon: "mdi-google-maps",
                    href: "!"
                });
                this.casualEventItems.push({
                    text: "Visit Wellington",
                    icon: "mdi-google-maps",
                    href: "!"
                });
                // more than 3 casual events show more link
                this.casualEventItems.push({
                    text: "Show More",
                    icon: "",
                    href: "/events"
                });
            },
            goEventList(item) {
                router.push(item.href);
            }

        }

    }
</script>

