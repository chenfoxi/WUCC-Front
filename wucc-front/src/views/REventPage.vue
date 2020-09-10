<template>
    <v-container>
        <v-row>
            <main-part :colSize="9">
                <EventCard
                    :size="6"
                    :value="event.general"
                    :eventType="0"
                    class="mx-auto mt-n3">
                </EventCard>

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
</template>

<script>
    import REventService from '@/service/open/revent.service';

    export default {
        name: "REventPage",
        components: {
            ListCard: () => import('@/components/ListCard'),
            EventCard: () => import('@/components/EventCard'),
            SidePart: () => import('@/components/core/SidePart'),
            MainPart: () => import('@/components/core/MainPart'),
        },
        data() {
            return {
                event: {},
                id: 0
            }
        },
        mounted() {
            this.id = Number(this.$route.params.id);
            REventService.getREventsForPage(this.id).then(
                data => {
                    this.event = data;
                },
                error => {
                    console.log(error)
                }
            );

        }
    }
</script>

<style scoped>

</style>
