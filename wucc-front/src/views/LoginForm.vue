<template>
    <v-app>
        <v-img
            :src="require('@/assets/bg.jpg')"
        >
            <div>
                <v-alert type="success" dismissible :value="successful">
                    Login is successful
                </v-alert>
            </div>
            <div>
                <v-alert type="error" dismissible :value="alert">
                    {{ alertMsg }}
                </v-alert>
            </div>
            <v-card width="400" class="mx-auto mt-10 pa-2">
                <v-card-title>
                    <h1 class="display-1
                    text-uppercase font-weight-bold">Login</h1>
                </v-card-title>
                <ValidationObserver ref="obs">
                    <v-card-text>
                        <v-form>
                            <ValidationProvider v-slot="{ errors, valid }" name="email" rules="required|email">
                                <v-text-field
                                    v-model="email"
                                    :error-messages="errors"
                                    :success="valid"
                                    label="Email"
                                    prepend-icon="mdi-account-circle"
                                    required
                                />
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors, valid }" name="password" rules="required">
                                <v-text-field
                                    label="Password"
                                    v-model="password"
                                    :error-messages="errors"
                                    :success="valid"
                                    required
                                    :type="showPassword ? 'text' : 'password'"
                                    prepend-icon="mdi-lock"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="showPassword = !showPassword"
                                />
                            </ValidationProvider>
                        </v-form>
                    </v-card-text>
                    <!--                <v-divider></v-divider>-->
                    <v-card-actions>
                        <v-btn color="error" @click="resetForm">Reset</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="info" @click="submit">Login</v-btn>
                    </v-card-actions>
                </ValidationObserver>
                <div class="align-center register-divider">
                    <p class="body-2">New to Our Club?</p>
                </div>
                <v-btn color="info mb-2" style="width: 100%" @click="toRegister">Create Your Own Account</v-btn>
            </v-card>
        </v-img>
    </v-app>
</template>

<script>
    import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    import User from "../models/user";
    import router from "../router";

    setInteractionMode('eager');

    export default {
        name: "LoginForm",
        components: {
            ValidationObserver,
            ValidationProvider
        },
        data() {
            return {
                showPassword: false,
                email: "",
                password: "",
                alert: false,
                successful: false,
                alertMsg: ""
            }
        },
        methods: {
            resetForm() {
                this.$refs.obs.reset()
            },
            submit() {
                this.$refs.obs.validate().then(
                    isValid => {
                        if (isValid) {
                            let user = new User("", "", "", this.email, "", "", this.password);
                            this.$store.dispatch('auth/login', user).then(
                                data => {
                                    this.alertMsg = data.message;
                                    this.successful = true;
                                    router.push("/");
                                },
                                error => {
                                    this.alertMsg =
                                        (error.response && error.response.data) ||
                                        error.message ||
                                        error.toString();
                                    this.successful = false;
                                    this.alert = true;
                                }
                            );
                        }
                    }
                )
            },
            toRegister(){
                router.push("/register");
            }
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
