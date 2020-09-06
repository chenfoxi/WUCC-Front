<template>
    <div class="event">
        <v-container>
            <v-row>
                <main-part :colSize="9">
                    <div v-if="eventSet.length % 2 === 0">
                        <v-row>
                            <EventCard
                                v-for="(value, i) in eventSet" :key="i"
                                :size="6"
                                :value="value"
                                class="mx-auto mt-n3">
                            </EventCard>
                        </v-row>

                    </div>
                    <div v-else>
                        <v-row v-for="(value, i) in eventSet" :key="i">
                            <EventCard
                                :size="6"
                                :value="value"
                                class="mx-auto">
                            </EventCard>
                        </v-row>
                    </div>

                </main-part>

                <side-part :colSize="3" :sticky=true>
                    <list-card
                        color="secondary"
                        :value="regularEvents"
                        title="Regular Event"
                    ></list-card>
                </side-part>
            </v-row>
        </v-container>
    </div>

</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "EventList",
        components: {
            ListCard: () => import('@/components/ListCard'),
            EventCard: () => import('@/components/EventCard'),
            SidePart: () => import('@/components/core/SidePart'),
            MainPart: () => import('@/components/core/MainPart'),
        },
        data() {
            return {
                oEventCount: {
                    start: 0,
                    end: 10
                },
                rEventCount: {
                    start: 0,
                    end: 10
                }
            }
        },
        computed: {
            ...mapState('event', ['eventList', 'regularEventList']),
            eventSet() {
                return this.eventList
            },
            regularEvents() {
                return this.regularEventList
            },
        },
        mounted() {
            console.log(this.$store.state.event.eventList);
            if (this.$store.state.event.eventList.length === 0) {
                this.$store.dispatch('event/getOEventList', this.oEventCount)
                    .then(
                        error => {
                            console.log(error)
                        }
                    );
                this.$store.dispatch('event/getREventList')
                    .then(
                        error => {
                            console.log(error)
                        }
                    );
            }
        }
    }
</script>

<style scoped>

</style>
