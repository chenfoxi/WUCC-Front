<template>
    <div class="event">
        <v-container>
            <v-row>
                <main-part :colSize="12">
                    <event-detail-card :event="event" :eventType="eventType" />
                    <photo-gallery class="mt-4" :id="id" :type="eventType" />
                    <comment-drawer />

                </main-part>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";
    import OEventService from '@/service/open/oevent.service';

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
                items: [
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                    },
                ],
                drawer: null,
                event: {},
                eventType: 0,
                id: 0
            }
        },
        methods: {
            ...mapMutations("pathes", ['toggleCommentDrawer']),
        },
        mounted() {
            console.log(this.$route.params.id);
            console.log(this.$route.params.type);
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
            } else if( this.eventType === "2") {
                console.log();
            }

        }
    }
</script>

<style scoped>

</style>
