<template>
    <v-container>
        <v-row>
            <main-part :colSize="9">
                <base-event-card
                    :size="12"
                    :value="general"
                    :eventType="0"
                    :isIntro="true"
                >
                </base-event-card>
                <base-event-card
                    :size="12"
                    :value="last"
                    :eventType="0"
                    :isIntro="false"
                >
                    <template v-slot:viewMoreBtn>
                        <view-more-action :id="lastId" :eventType="0"></view-more-action>
                    </template>
                </base-event-card>
                <base-event-card
                    :size="12"
                    :value="next"
                    :eventType="0"
                    :isIntro="false"
                >
                    <template v-slot:joinBtn>
                        <join-action :id="nextId" :eventType="0"></join-action>
                    </template>
                    <template v-slot:viewMoreBtn>
                        <view-more-action :id="nextId" :eventType="0"></view-more-action>
                    </template>
                </base-event-card>
            </main-part>

            <side-part :colSize="3" :sticky=true>
                <list-card
                    color="secondary"
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
            BaseEventCard: () => import('@/components/BaseEventCard'),
            SidePart: () => import('@/components/core/SidePart'),
            MainPart: () => import('@/components/core/MainPart'),
            JoinAction: () => import('@/components/action/JoinAction'),
            ViewMoreAction: () => import('@/components/action/ViewMoreAction')
        },
        data() {
            return {
                general: {},
                last: {},
                next: {},
                id: 0,
                lastId: 0,
                nextId: 0
            }
        },
        mounted() {
            this.id = Number(this.$route.params.id);
            REventService.getREventsForPage(this.id).then(
                data => {
                    console.log("event" + data);
                    this.general = data.general;
                    this.last = data.last;
                    this.next = data.next;
                    this.lastId = data.last.rid;
                    this.nextId = data.next.rid;
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
