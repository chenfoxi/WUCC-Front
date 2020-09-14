<template>
    <v-btn
        color="orange"
        text
        @click="handleClick"
    >
        Explore
    </v-btn>
</template>

<script>
    import router from "@/router";

    export default {
        name: "ViewMoreAction",
        props: {
            id: {
                type: Number,
                require: true
            },
            eventType: {
                type: Number,
                require: true,
                default: 1
            }
        },
        methods: {
            handleClick() {
                router.push(`/event/${this.eventType}/${this.id}`);
            },
        }
    }
</script>

<style scoped>

</style>
