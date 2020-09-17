<template>
    <v-snackbar
        :timeout="timeout"
        top
        :color="getColor"
        elevation="24"
        :value="notifyModel"
    >
        {{ msg }}

        <template v-slot:action="{ attrs }">
            <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="clickClose"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    export default {
        name: "MsgBar",
        props: {
            success: {
                type: Boolean,
                require: true
            },
            notifyModel: {
                type: Boolean,
                require: true
            },
            msg: {
                type: String,
                require: true
            },
            timeout: {
                type: Number,
                default: 5000
            }
        },
        computed: {
            getColor() {
                return this.success === true ? 'success' : 'info';
            }
        },
        methods: {
            clickClose(){
                this.$emit('update:notifyModel', false);
                this.$emit('update:msg', '');
                this.$emit('update:success', true);
            },
            changeState() {
                if(this.notifyModel === false){
                    this.clickClose();
                }
            }
        },
        watch: {
            'notifyModel': 'changeState'
        }
    }
</script>

<style scoped>

</style>
