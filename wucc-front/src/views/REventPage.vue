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
                    <template v-slot:title>
                        <h3>Previous Activity ...</h3>
                    </template>
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
                    <template v-slot:title>
                        <h3>Next Coming ...</h3>
                    </template>
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
                    :title="sidePartTitle"
                    :isDetail=true
                    :value="hisREventSet"
                >
                    <template v-if="length > 5" v-slot:pagination>
                        <div class="text-center">
                            <v-pagination
                                v-model="page"
                                :length="length / 5"
                                color="secondary"
                                @input="nextClick"
                            ></v-pagination>
                        </div>
                    </template>
                </list-card>
            </side-part>
        </v-row>
    </v-container>
</template>

<script>
    import REventService from '@/service/open/revent.service';
    import {convertDateFormat} from "../util/date";

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
                nextId: 0,
                title: '',
                page: 1,
                endPoint: 5,
                length: 0,
                hisREventSet: []
            }
        },
        computed: {
            sidePartTitle() {
                return `${this.title} History`;
            },
        },
        methods: {
            fetchREventData: function () {
                this.id = Number(this.$route.params.id);
                REventService.getREventsForPage(this.id).then(
                    data => {
                        console.log("event" + data);
                        this.title = data.general.title;
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
                REventService.getCountByStatusAndId(this.id, 2).then(
                    data => {
                        this.length = data;
                    },
                    error => {
                        console.log(error);
                    }
                );
                REventService.getPagedREventsByIdAndStatus(this.id, 2,
                    0, this.endPoint, "end_date desc").then(
                    data => {
                        console.log("begin" + data);
                        data.forEach(item => {
                            let temp = {
                                "title": this.handleTitle(item),
                                "rid": item.rid
                            };
                            this.hisREventSet.push(temp);
                        });
                    },
                    error => {
                        console.log(error);
                    }
                )
            },
            handleTitle(item) {
                return convertDateFormat(item.endDate, "MMM, Do YYYY");
            },
            nextClick(page) {
                this.page = page;
                REventService.getPagedREventsByIdAndStatus(this.id, 2,
                    (page - 1) * this.endPoint, this.endPoint, "end_date desc").then(
                    data => {
                        console.log(data);
                        this.hisREventSet = [];
                        data.forEach(item => {
                            let temp = {
                                "title": this.handleTitle(item),
                                "rid": item.rid
                            };
                            this.hisREventSet.push(temp);
                        });
                    },
                    error => {
                        console.log(error);
                    }
                )
            }
        },
        created() {
            this.fetchREventData();
        },
        watch: {
            // call again the method if the route changes
            '$route': 'fetchREventData',
        },
    }
</script>

<style scoped>

</style>
