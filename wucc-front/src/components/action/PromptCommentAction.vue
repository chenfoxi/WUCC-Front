<template>
    <v-btn
        outlined
        color="secondary"
        @click.stop="toggleCommentDrawer"
    >
        <v-icon left>mdi-pencil</v-icon>Comment
    </v-btn>
</template>

<script>
    import { mapMutations } from "vuex";

    export default {
        name: "PromptCommentAction",
        methods: {
            ...mapMutations("pathes", ['toggleCommentDrawer']),
        }
    }
</script>

<style scoped>

</style>
