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
                <v-card-title>
                    <slot name="title"></slot>
                </v-card-title>
                <v-card-subtitle class="subtitle-2 font-weight-bold ">{{ formatTitle }}</v-card-subtitle>
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
    import { convertDateFormat, convertWeekdayFormat, convertDateTimeFormat } from '@/util/date.js';
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
            formatDate() {
                let startTime = convertDateTimeFormat(this.value.startTime);
                let endTime = convertDateTimeFormat(this.value.endTime);
                return `${startTime} --- ${endTime}`;
            },
            formatWeekday() {
                return "Every week: " + convertWeekdayFormat(this.value.dayOfWeek)
                    + " " + convertDateFormat(this.value.startTime, 'LT');
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
            formatTitle() {
                if (this.eventType === 1){
                    return `${this.value.title}`;
                } else {
                    return 'Time: ' + convertDateFormat(this.value.startDate);
                }
            }
        }
    }
</script>

<style scoped>

</style>
