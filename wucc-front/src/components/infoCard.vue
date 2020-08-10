<template>
    <v-col
        cols="12"
        :md="size === 2 ? 6 : size === 3 ? 4 : size === 4 ? 3 : undefined"
    >
        <base-card
            height="350"
            light
            href="#!"
            elevation="10"
        >
            <v-row
                class="fill-height text-center ma-0"
            >
                <v-col cols="12" class="mt-10">
                    <v-icon style="font-size: 64px" color="dark">{{ value.icon}}</v-icon>
                </v-col>
                <v-col cols="12">
                    <h1 class="mx-0 mb-2 text-uppercase font-weight-black">
                        {{ value.title }}
                    </h1>

                    <h3 class="title font-weight-bold mb-2 myFont myFont-color">
                        {{ value.description}}
                    </h3>

                </v-col>

                <v-col align-self="end">
                    <v-chip
                        class="text-uppercase ma-0"
                        color="primary"
                        label
                        small
                        @click.stop=""
                    >
                        Read More
                    </v-chip>
                </v-col>
            </v-row>
        </base-card>
    </v-col>
</template>

<script>
    export default {
        name: "InfoCard",
        props: {
            size: {
                type: Number,
                require: true
            },
            value: {
                type: Object,
                require: true
            }
        }
    }
</script>

<style scoped>
    .myFont {
        font-family: "Schoolbell", sans-serif !important;
    }
    .myFont-color {
        color: #78909C !important;
    }
</style>
