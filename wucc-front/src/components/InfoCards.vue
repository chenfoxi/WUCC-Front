<template>
    <v-container>
        <v-row>
            <info-card
                v-for="(info, i) in informationSet"
                :key="i"
                :size="layout[i]"
                :value="info"
            />
        </v-row>

       <slot name="paginate"></slot>
    </v-container>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "InfoCards",
        components: {
            InfoCard: () => import('@/components/infoCard')
        },
        data() {
            return {
                layout: [4, 4, 4, 4]
            }
        },
        computed: {
            ...mapState('info', ['information']),
            informationSet () {
                return this.information
            },

        }

    }
</script>

<style scoped>

</style>
