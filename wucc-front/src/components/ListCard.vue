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
                    :key="item.title"
                    color="secondary"
                    @click="handleClick(item)"
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
            }
        },
        methods: {
            handleClick(item) {
                router.push("/revent/" + item.id);
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
