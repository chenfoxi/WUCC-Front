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
                                    @click="goEventDetail(item, 0)"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.title"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                            <v-divider></v-divider>
                            <v-subheader>Casual Events</v-subheader>
                            <v-list-item-group v-model="casualEventItems" color="primary">
                                <v-list-item
                                    v-for="(item, i) in casualEventItems"
                                    :key="i"
                                    @click="goEventDetail(item, 1)"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.title"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item @click="goEvents">
                                    <v-list-item-content>
                                        <v-list-item-title>Show more...</v-list-item-title>
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
                    <v-menu right offset-y transition="slide-y-transition">
                        <template v-slot:activator="{ on }">
                            <v-btn fab tile icon @click="getEventData">
                                <v-avatar :color="getColor" v-on="on"  size="36" class="ma-2 hidden-sm-and-down">
                                    <span class="white--text">{{ getAvatarName }}</span>
                                </v-avatar>
                            </v-btn>

                        </template>
                        <v-list dense>
                            <v-subheader>My Space</v-subheader>
                            <v-list-item-group color="primary">
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon>mdi-account-circle</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Profile</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                            <v-divider></v-divider>
                            <v-list-item-group color="primary">
                                <v-list-item
                                    @click="logOut"
                                >
                                    <v-list-item-icon>
                                        <v-icon>mdi-logout-variant</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>LogOut</v-list-item-title>
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
    import { mapMutations } from 'vuex';
    import router from "../../router";
    import MetaEventService from '@/service/open/meta.event.service';

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
            logOut() {
                this.$store.dispatch('auth/logout');
                this.$router.push('/home');
            },

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
                MetaEventService.getValidEventList(0).then(
                    data => {
                        data.forEach(ele => this.regularEventItems.push(ele));
                        console.log(data);
                    }
                );
                MetaEventService.getValidEventList(1).then(
                    data => {
                        data.forEach(ele => this.casualEventItems.push(ele));
                        console.log(data);
                    }
                )
            },
            goEventDetail(item, type) {
                if (type === 0){
                    router.push(`/revent/${item.id}`);
                }
                if (type === 1){
                    router.push(`/event/1/${item.id}`);
                }
            },
            goEvents(){
                router.push("/events");
            }
        }

    }
</script>

