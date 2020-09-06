<template>
    <v-col
        cols="12"
        :md=colSize
    >
        <slot />
    </v-col>
</template>

<script>
    export default {
        name: "MainPart",
        props: {
            colSize: {
                type: Number,
                require: true
            }
        }
    }
</script>

<style scoped>

</style>
