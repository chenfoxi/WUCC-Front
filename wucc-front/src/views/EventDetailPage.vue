<template>
    <div class="event">
        <v-container>
            <v-row>
                <main-part :colSize="12">
                    <event-detail-card :event="event" :eventType="eventType" />
                    <photo-gallery class="mt-4" :id="id" :type="eventType" />
                    <comment-drawer :uId="getUserId" :articleId="id" :articleType="eventType" />
                </main-part>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";
    import OEventService from '@/service/open/oevent.service';
    import REventService from '@/service/open/revent.service';

    export default {
        name: "EventDetailPage",
        components: {
            MainPart: () => import('@/components/core/MainPart'),
            CommentDrawer: () => import('@/components/CommentDrawer'),
            EventDetailCard: () => import('@/components/EventDetailCard'),
            PhotoGallery: () => import('@/components/PhotoGallery')
        },
        data() {
            return {
                event: {},
                eventType: 0,
                id: 0
            }
        },
        methods: {
            ...mapMutations("pathes", ['toggleCommentDrawer']),
            fetchEventDetailData: function () {
                this.eventType = Number(this.$route.params.type);
                this.id = Number(this.$route.params.id);
                if (this.eventType === 1) {
                    OEventService.getValidOnceEventDetail(this.id).then(
                        data => {
                            this.event = data;
                        },
                        error => {
                            console.log(error)
                        }
                    );
                } else if (this.eventType === 0) {
                    REventService.getValidRegularEventDetail(this.id).then(
                      data => {
                          this.event = data;
                      }
                    );
                }
                this.$store.dispatch('commentModule/getCommentList', {
                    'post_id': this.id,
                    'comment_type': this.eventType
                });
            }
        },
        computed: {
            getUserId(){
                let state = this.$store.state.auth.user;
                if (state === null){
                    return 0;
                } else {
                    return state.id;
                }
            }
        },
        created() {
            this.fetchEventDetailData();

        },
        watch: {
            // call again the method if the route changes
            '$route': 'fetchEventDetailData'
        },
    }
</script>

<style scoped>

</style>
