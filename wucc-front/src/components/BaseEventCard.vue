<template>
    <v-col
        cols="12"
        :md=size
    >
        <base-card
            light
            elevation="2"
        >
            <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                v-if="isIntro"
            >
                <v-card-title>{{ value.title }}</v-card-title>
            </v-img>

            <div v-if="isIntro">
                <v-card-subtitle class="pb-0 subtitle-2 text-uppercase">Introduction</v-card-subtitle>
                <v-card-text class="text--primary">
                    <div class="intro-h">
                        <p>{{ value.description }}</p>
                    </div>
                </v-card-text>
                <v-card-subtitle class="pb-0 subtitle-2 text-uppercase">time</v-card-subtitle>
                <v-card-text v-if="eventType === 1 " class="text--primary">
                    {{ formatDate }}
                </v-card-text>
                <v-card-text v-else>
                    {{ formatWeekday }}
                </v-card-text>
                <v-card-subtitle class="pb-0 subtitle-2 text-uppercase">address</v-card-subtitle>
                <v-card-text class="text--primary">
                    <div class="address">
                        {{ formatAddress }}
                    </div>
                </v-card-text>
            </div>
            <div v-else>
                <v-card-title>{{ getTitleWithTime }}</v-card-title>
                <v-card-text class="text--primary">
                    <div class="intro-h">
                        <p>{{ value.content }}</p>
                    </div>
                </v-card-text>
            </div>

            <v-card-actions>
                <slot name="joinBtn"></slot>
                <slot name="viewMoreBtn"></slot>
                <slot name="commentBtn"></slot>
            </v-card-actions>
        </base-card>
    </v-col>
</template>

<script>
    export default {
        name: "BaseEventCard",
        components: {
        },
        props: {
            size: {
                type: Number,
                require: true
            },
            value: {
                type: Object,
                require: true
            },
            eventType: {
                type: Number,
                default: 1
            },
            isIntro: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            formatWeekday() {
                return '';
            },
            formatAddress() {
                if (this.value.street === null && this.value.suburb === null) {
                    return `${this.value.city}`;
                } else if (this.value.street === null && this.value.suburb !== null) {
                    return `${this.value.suburb}, ${this.value.city}`;
                } else if (this.value.street !== null && this.value.suburb === null) {
                    return `${this.value.street}, ${this.value.city}`;
                } else {
                    return `${this.value.street}, ${this.value.suburb}, ${this.value.city}`
                }
            },
        },
        methods: {
            getTitleWithTime(title, date){
                return title + date;
            }
        }
    }
</script>

<style scoped>

</style>
