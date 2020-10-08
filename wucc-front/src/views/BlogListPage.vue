<template>
    <div class="event">
        <v-container>
            <v-row>
                <main-part :colSize="9">
                        <v-row v-for="(value, i) in blogSet" :key="i + value.title">
                            <BlogCard
                                :size="9"
                                :blog="value"
                                class="mx-auto">
                            </BlogCard>
                        </v-row>
                </main-part>

                <side-part :colSize="3" :sticky=true>
                    <list-card
                        color="secondary"
                        :value="mostViews"
                        title="Top View 10 Blog"
                        :itemType=2
                    ></list-card>
                </side-part>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "BlogListPage",
        components: {
            ListCard: () => import('@/components/ListCard'),
            BlogCard: () => import('@/components/BlogCard'),
            SidePart: () => import('@/components/core/SidePart'),
            MainPart: () => import('@/components/core/MainPart'),
        },
        data() {
            return{

            }
        },
        computed: {
            ...mapState('blogModule', ['blogList', 'mostViewList']),
            blogSet() {
                return this.blogList
            },
            mostViews() {
                return this.mostViewList
            },
        },
        mounted() {
            if (this.$store.state.blogModule.blogList.length === 0) {
                this.$store.dispatch('blogModule/getBlogList', {
                    'post_type': 1,
                    'audit_status': 1
                })
                    .then(
                        error => {
                            console.log(error)
                        }
                    );
                this.$store.dispatch('blogModule/getMostView')
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
