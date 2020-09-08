<template>
    <v-col
        cols="12"
        :md=size
    >
        <base-card
            light
            elevation="2"
        >
            <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
                <v-card-title>{{ value.title }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0 subtitle-2 text-uppercase">Introduction</v-card-subtitle>
            <v-card-text class="text--primary">
                <div class="intro-h">
                    <p>{{ value.description }}</p>
                </div>
            </v-card-text>
            <v-card-subtitle class="pb-0 subtitle-2 text-uppercase">time</v-card-subtitle>
            <v-card-text class="text--primary">
                {{ formatDate }}
            </v-card-text>
            <v-card-subtitle class="pb-0 subtitle-2 text-uppercase">address</v-card-subtitle>
            <v-card-text class="text--primary">
                <div class="address">
                    {{ formatAddress }}
                </div>
            </v-card-text>
            <v-card-actions>

                <v-dialog v-if="!checkJoin" v-model="dialog" persistent max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="orange"
                            v-bind="attrs"
                            v-on="on"
                            text
                        >
                            Join
                        </v-btn>
                    </template>
                    <v-card v-if="isLogin">
                        <v-card-title class="headline"></v-card-title>
                        <v-card-text class="text--primary">
                            Do you want to join the event?
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="grey darken-1" text @click="dialog = false">cancel</v-btn>
                            <v-btn color="green darken-1" text
                                   @click="joinEvent(eventId, eventType, dialog)">Agree
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <join-card
                        v-else
                        :isRegAndJoin="true"
                        v-bind:dialogC.sync="dialog"
                        v-bind:checkJoinC.sync="checkJoin"
                        :eventType="eventType"
                        :eventId="eventId"
                    >
                        <template v-slot:title>
                            <h3 class="text-uppercase font-weight-bold">Register and Join Us</h3>
                        </template>
                        <template v-slot:cancelBtn>
                            <v-btn color="grey darken-1" text @click="dialog = false">cancel</v-btn>
                            <v-spacer></v-spacer>
                        </template>
                    </join-card>

                </v-dialog>

                <v-btn
                    color="orange"
                    text
                    @click="handleClick(value)"
                >
                    Explore
                </v-btn>
            </v-card-actions>
        </base-card>
        <v-snackbar
            :timeout="5000"
            :value="true"
            top
            :color="successColor === true ? 'success' : 'info'"
            elevation="24"
            v-model="successNotify"
        >
            {{ joinMsg }}

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="successNotify = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-col>
</template>

<script>
    import router from "../router";
    import convertDateFormat from "../util/date";
    import MetaEventService from '@/service/open/meta.event.service';

    export default {
        name: "EventCard",
        components: {
            JoinCard: () => import('@/components/JoinCard'),
        },
        props: {

            size: {
                type: Number,
                require: true
            },
            value: {
                type: Object,
                require: true
            },
            eventType: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                dialog: false,
                checkJoin: false,
                userId: 0,
                eventId: 0,
                successNotify: false,
                joinMsg: "",
                successColor: true
            }
        },
        computed: {
            formatDate() {
                let startTime = convertDateFormat(this.value.start_time);
                let endTime = convertDateFormat(this.value.end_time);
                return `${startTime} --- ${endTime}`;
            },
            formatAddress() {
                if (this.value.street === null && this.value.suburb === null) {
                    return `${this.value.city}`;
                } else if (this.value.street === null && this.value.suburb !== null) {
                    return `${this.value.suburb}, ${this.value.city}`;
                } else if (this.value.street !== null && this.value.suburb === null) {
                    return `${this.value.street}, ${this.value.city}`;
                } else {
                    return `${this.value.street}, ${this.value.suburb}, ${this.value.city}`
                }
            },
            isLogin() {
                return this.$store.state.auth.user !== null;
            }
        },
        methods: {
            handleClick(item) {
                router.push("/oevent/" + item.id);
            },
            joinEvent(eventId, eventType, dialog) {
                let userId = this.$store.state.auth.user.id;
                MetaEventService.joinEventByEventIdAndUId(eventId, userId, eventType).then(
                    data => {
                        if (data.code === 0 && data.data) {
                            // alert a success banner
                            this.joinMsg = "Well done! You have successfully registered!";
                            this.checkJoin = true;
                            this.successNotify = true;
                            this.successColor = true;
                        } else {
                            // alert fail
                            this.joinMsg = "Something is wrong";
                            this.successNotify = true;
                            this.successColor = false;
                            console.log(data.errorMsg);
                        }
                        dialog = false;
                    },
                    error => {
                        console.log(error);
                        this.joinMsg = "Something is wrong";
                        this.successNotify = true;
                        this.successColor = false;
                        dialog = false;
                    }
                );
                dialog = false;
                console.log(dialog);
            }
        },
        mounted() {
            this.eventId = this.value.id;
            let user = this.$store.state.auth.user;
            if (user === null) {
                this.checkJoin = false;
            } else {
                this.userId = user.id;
                MetaEventService.checkRegByEventIdAndUId(this.eventId, this.userId, 1).then(
                    data => {
                        if (data.code === 0) {
                            this.checkJoin = data.data;
                        } else {
                            this.checkJoin = false;
                        }
                    },
                    error => {
                        console.log(error);
                        this.checkJoin = false;
                    }
                );
            }
        }
    }
</script>

<style scoped>
    .intro-h {
        height: 100px;
    }
</style>
