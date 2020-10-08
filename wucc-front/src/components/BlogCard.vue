<template>
    <v-col
        cols="12"
        :md=size
    >
        <base-card
            light
            elevation="2"
        >
            <div v-if="hasImg">
                <v-img
                    class="white--text align-end"
                    height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"

                >
                    <v-card-title>{{ blog.title }}</v-card-title>
                </v-img>
            </div>
            <div v-else>
                <v-card-title>{{ blog.title }}</v-card-title>
            </div>
            <v-card-text class="text--primary">
                <div class="intro-h">
                    <p>{{ blog.excerpt}}</p>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="orange"
                    text
                    @click="showDetails(blog)"
                >
                    Explore
                </v-btn>
            </v-card-actions>
        </base-card>
    </v-col>
</template>

<script>
    import router from "vue-router";

    export default {
        name: "BlogCard",
        props: {
            size: {
                type: Number,
                require: true
            },
            blog: {
                type: Object,
                require: true
            },
        },
        computed: {
            hasImg() {
                return this.blog.img_url !== '' && this.blog.img_url !== undefined;
            }
        },
        methods: {
            showDetails(blog) {
                router.push(`/blog/${blog.id}`);
            }
        }
    }
</script>

<style scoped>

</style>
