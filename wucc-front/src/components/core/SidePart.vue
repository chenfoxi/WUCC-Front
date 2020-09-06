<template>
    <v-col cols="12" :md=colSize :style="calStyle(sticky)">
        <slot />
    </v-col>
</template>

<script>
    export default {
        name: "SidePart",
        props: {
            sticky: {
                type: Boolean,
                default: false
            },
            colSize: {
                type: Number,
                require: true
            }
        },
        methods: {
            calStyle(sticky) {
                if(sticky === true) {
                    return "position: sticky; top: 15%; height: 100%";
                }else {
                    return ""
                }
            }
        }
    }
</script>

<style scoped>

</style>
