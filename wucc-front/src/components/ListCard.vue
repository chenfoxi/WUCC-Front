<template>
    <base-card
        class="mx-auto md-width"
        light
        elevation="10"
    >
        <v-app-bar
            dark
            :color=color
        >
            <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-app-bar>
        <v-list>
            <v-list-item-group>
                <v-list-item
                    v-for="(item, i) in value"
                    :key="i + item.title"
                    color="secondary"
                    @click="handleClick(item, itemType)"
                >
                    <v-list-item-content
                    >
                        <v-list-item-title

                        >{{ i + 1 }}. {{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <slot name="pagination"></slot>
    </base-card>
</template>

<script>
    import router from '@/router';

    export default {
        name: "ListCard",
        props: {
            value: {
                type: Array,
                require: true
            },
            title: {
                type: String,
                require: true
            },
            color: {
                type: String,
                default: "secondary"
            },
            // 0--rEvent 1--rEventDetail 2--blog
            itemType: {
                type: Number,
                default: 0
            }
        },
        methods: {
            handleClick(item, type) {
                if (type === 0){
                    router.push("/revent/" + item.id);
                }
                if (type === 1){
                    router.push(`/event/0/${item.rid}`);
                }
                if (type === 2) {
                    router.push(`/blog/${item.id}`);
                }

            }
        }
    }
</script>

<style scoped>
    .md-width {
        max-width: 100%;
    }

    @media (min-width: 960px) {
        .md-width {
            max-width: 80%;
        }
    }

    .on-hover {
        cursor: pointer;
    }

</style>
