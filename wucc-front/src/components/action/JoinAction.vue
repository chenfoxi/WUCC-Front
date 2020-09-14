<template>
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
                       @click="joinEvent(id, eventType, dialog)">Agree
                </v-btn>
            </v-card-actions>
        </v-card>
        <join-card
            v-else
            :isRegAndJoin="true"
            v-bind:dialogC.sync="dialog"
            v-bind:checkJoinC.sync="checkJoin"
            :eventType="eventType"
            :eventId="id"
        >
            <template v-slot:title>
                <h3 class="text-uppercase font-weight-bold">Register and Join Us</h3>
            </template>
            <template v-slot:cancelBtn>
                <v-btn color="grey darken-1" text @click="dialog = false">cancel</v-btn>
                <v-spacer></v-spacer>
            </template>
        </join-card>
        <msg-bar
           :success.sync="successColor"
           :notifyModel.sync="successNotify"
           :msg.sync="msg"
        ></msg-bar>
    </v-dialog>
</template>

<script>
    import MetaEventService from '@/service/open/meta.event.service';

    export default {
        name: "JoinAction",
        components: {
            JoinCard: () => import('@/components/JoinCard'),
            MsgBar: () => import('@/components/core/MsgBar')
        },
        props: {
            id: {
                type: Number,
                require: true
            },
            eventType: {
                type: Number,
                default: 1
            },
        },
        data() {
            return {
                checkJoin: false,
                msg: '',
                successNotify: false,
                successColor: true,
                dialog: false
            }
        },
        computed: {
            isLogin() {
                return this.$store.state.auth.user !== null;
            }
        },
        methods: {
            joinEvent(eventId, eventType, dialog) {
                let userId = this.$store.state.auth.user.id;
                MetaEventService.joinEventByEventIdAndUId(eventId, userId, eventType).then(
                    data => {
                        if (data.code === 0 && data.data) {
                            // alert a success banner
                            this.msg = "Well done! You have successfully registered!";
                            this.checkJoin = true;
                            this.successNotify = true;
                            this.successColor = true;
                        } else {
                            // alert fail
                            this.msg = "Something is wrong";
                            this.successNotify = true;
                            this.successColor = false;
                            console.log(data.errorMsg);
                        }
                        dialog = false;
                    },
                    error => {
                        console.log(error);
                        this.msg = "Something is wrong";
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
            let user = this.$store.state.auth.user;
            if (user === null) {
                this.checkJoin = false;
            } else {
                MetaEventService.checkRegByEventIdAndUId(this.eventId, user.id, this.eventType).then(
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

</style>
