<template>

    <base-card
        class="mx-auto"
        :elevation="2"
    >
        <v-list-item>
            <v-list-item-avatar color="primary"></v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="headline">{{ event.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-img
            src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
            height="200"
        ></v-img>

        <v-card-text class="text--primary">
            <div class="content-h">
                <p>{{ event.content }}</p>
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
            <v-btn v-if="!checkJoin"
                color="secondary"
            >
                <v-icon left>mdi-account-plus-outline</v-icon>Join
            </v-btn>
            <v-btn
                outlined
                color="secondary"
                @click.stop="toggleCommentDrawer"
            >
                <v-icon left>mdi-pencil</v-icon>Comment
            </v-btn>
        </v-card-actions>
    </base-card>
</template>

<script>
    import { mapMutations } from "vuex";
    import { convertDateFormat, beforeDate } from "../util/date";
    import MetaEventService from '@/service/open/meta.event.service';

    export default {
        name: "EventDetailCard",
        props: {
            eleNumber: {
                type: Number,
                default: 2
            },
            event: {
                type: Object,
                require: true
            },
            eventType: {
                type: Number,
                require: true
            }
        },
        data() {
            return {
                checkJoin: false
            }
        },
        computed: {
            formatDate() {
                let startTime = convertDateFormat(this.event.start_time);
                let endTime = convertDateFormat(this.event.end_time);
                return `${startTime} --- ${endTime}`;
            },
            formatAddress() {
                if (this.event.street === null && this.event.suburb === null) {
                    return `${this.event.city}`;
                } else if (this.event.street === null && this.event.suburb !== null) {
                    return `${this.event.suburb}, ${this.event.city}`;
                } else if (this.event.street !== null && this.event.suburb === null) {
                    return `${this.event.street}, ${this.event.city}`;
                } else {
                    return `${this.event.street}, ${this.event.suburb}, ${this.event.city}`
                }
            },
        },
        methods: {
            ...mapMutations("pathes", ['toggleCommentDrawer']),
        },
        mounted() {
            this.eventId = this.event.id;
            console.log(this.event.start_time + " " + this.event.end_time);
            let user = this.$store.state.auth.user;
            if (beforeDate(this.event.start_time)) {
                console.log("1111");
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
            } else {
                this.checkJoin = true;
            }
        }
    }
</script>

<style scoped>
    .content-h {
        height: 200px;
    }
</style>
