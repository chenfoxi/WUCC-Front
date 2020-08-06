<template>
    <v-app>
        <v-img
            :src="require('@/assets/bg.jpg')"
        >
            <v-card width="400" class="mx-auto mt-10 pa-2">
                <v-card-title >
                    <h1 class="display-1
                    text-uppercase font-weight-bold" >Login</h1>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field
                            label="Email"
                            prepend-icon="mdi-account-circle"
                        />
                        <v-text-field
                            label="Password"
                            :type="showPassword ? 'text' : 'password'"
                            prepend-icon="mdi-lock"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword = !showPassword"
                        />
                    </v-form>
                </v-card-text>
<!--                <v-divider></v-divider>-->
                <v-card-actions>
                    <v-btn color="error" @click="resetForm">Reset</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="info">Login</v-btn>
                </v-card-actions>

                <div class="align-center register-divider">
                    <p class="body-2">New to Our Club?</p>
                </div>


                <v-btn color="info mb-2" style="width: 100%">Create Your Own Account</v-btn>
            </v-card>
        </v-img>

    </v-app>
</template>

<script>
    export default {
        name: "LoginForm",
        data() {
            return {
                showPassword: false
            }
        },
        methods: {
            resetForm () {
                this.$refs.form.reset()
            },
        }
    }
</script>

<style scoped>
    .register-divider:after {
        content: "";
        width: 100%;
        background-color: transparent;
        display: block;
        height: 1px;
        border-top: 1px solid #e7e7e7;
        position: absolute;
        top: 50%;
        margin-top: -1px;
        z-index: 1;
    }
    .register-divider {
        text-align: center;
        position: relative;
        top: 2px;
        padding-top: 1px;
        margin-bottom: 14px;
        line-height: 0;
    }

    .register-divider p.body-2 {
        line-height: 1;
        font-size: 12px;
        color: #767676;
        font-weight: 400;
        z-index: 2;
        position: relative;
        display: inline-block;
        background-color: #fff;
        padding: 0 8px 0 7px;
        margin-bottom: 0 !important;
    }
</style>
