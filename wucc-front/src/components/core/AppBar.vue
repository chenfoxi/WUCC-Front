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
                <v-spacer />
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
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn text v-on="on">Events</v-btn>
                        </template>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title>
                                    <v-menu offset-x>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                Regular Events
                                            </v-btn>
                                        </template>

                                        <v-list>
                                            <v-list-item>
                                                <v-list-item-title>Bible Study</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-title>Bible Study</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    <v-btn
                                        class="hidden-sm-and-down"
                                        text
                                        @click="onClick($event, link)"
                                    >
                                        {{ link.text }}
                                    </v-btn>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>

            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        name: "CoreAppBar",
        data(){
            return {
                home: {
                    'href': "/"
                }
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
        },
        methods: {
            // logOut() {
            //     this.$store.dispatch('auth/logout');
            //     this.$router.push('login');
            // },

            ...mapMutations("pathes", ['toggleDrawer']),

            onClick (e, item) {
                e.stopPropagation();

                if (item.to || !item.href) return;

                this.$vuetify.goTo(item.href.endsWith('!') ? 0 : item.href)
            },

        }

    }
</script>

