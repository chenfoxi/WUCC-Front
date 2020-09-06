<template>
    <v-app>
        <v-img
            :src="require('@/assets/bg.jpg')"
        >
            <div>
                <v-alert type="success" dismissible :value="successful">
                    Registering is successful
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
                    text-uppercase font-weight-bold">Join Us</h1>
                </v-card-title>
                <ValidationObserver ref="obs">
                    <v-card-text>
                        <v-form ref="form">
                            <ValidationProvider v-slot="{ errors, valid }" name="username"
                                                rules="required|max:20|alpha_dash">
                                <v-text-field
                                    v-model="username"
                                    :error-messages="errors"
                                    :success="valid"
                                    label="Username"
                                    prepend-icon="mdi-account"
                                    required
                                />
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors, valid }" name="firstname"
                                                rules="required|max:20|alpha">
                                <v-text-field
                                    v-model="firstname"
                                    :error-messages="errors"
                                    :success="valid"
                                    label="First Name"
                                    prepend-icon="mdi-account"
                                    required
                                />
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors, valid }" name="lastname"
                                                rules="required|max:20|alpha">
                                <v-text-field
                                    v-model="lastname"
                                    :error-messages="errors"
                                    :success="valid"
                                    label="Family Name"
                                    prepend-icon="mdi-account"
                                    required
                                />
                            </ValidationProvider>
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
                            <ValidationProvider v-slot="{ errors, valid }" name="password"
                                                rules="required|max:16|min:8" vid="pwd">
                                <v-text-field
                                    v-model="password"
                                    :error-messages="errors"
                                    :success="valid"
                                    label="Password"
                                    :type="showPassword ? 'text' : 'password'"
                                    prepend-icon="mdi-lock"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="showPassword = !showPassword"
                                />
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors, valid }" name="confirm password"
                                                rules="required|confirmed:pwd">
                                <v-text-field
                                    v-if="password!==''"
                                    v-model="c_password"
                                    :error-messages="errors"
                                    :success="valid"
                                    label="Confirm Password"
                                    :type="showPassword ? 'text' : 'password'"
                                    prepend-icon="mdi-lock"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="showPassword = !showPassword"
                                    required
                                />
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors, valid }" name="gender"
                                                rules="required">
                                <v-select
                                    v-model="gender"
                                    :items="items"
                                    item-text="name"
                                    item-value="id"
                                    prepend-icon="mdi-gender-male-female"
                                    :error-messages="errors"
                                    :success="valid"
                                    label="Gender"
                                    data-vv-name="select"
                                    required
                                ></v-select>
                            </ValidationProvider>

                            <ValidationProvider v-slot="{ errors, valid }" name="phone_number"
                                                rules="numeric">
                                <v-text-field
                                    v-model="phone_number"
                                    :error-messages="errors"
                                    :success="valid"
                                    label="Phone Number"
                                    prepend-icon="mdi-cellphone"
                                />
                            </ValidationProvider>
                            <v-textarea

                                clearable
                                outlined
                                auto-grow
                                counter
                                clear-icon="mdi-cancel"
                                label="Description"
                                :value="description"
                                :rules="rules"
                            ></v-textarea>
                        </v-form>
                    </v-card-text>
                    <!--                <v-divider></v-divider>-->
                    <v-card-actions>
                        <v-btn color="error" @click="resetForm">Reset</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="info" @click="submit">Join</v-btn>
                    </v-card-actions>
                </ValidationObserver>

                <div class="align-center register-divider">
                    <p class="body-2">Already have account?</p>
                </div>


                <v-btn color="info mb-2" style="width: 100%" @click="toLgoIn">LogIn</v-btn>
            </v-card>
        </v-img>

    </v-app>
</template>

<script>
    import {ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
    import User from "../models/user";
    import router from "../router";

    setInteractionMode('eager');

    export default {
        name: "RegisterForm",
        components: {
            ValidationProvider,
            ValidationObserver
        },
        data() {
            return {
                showPassword: false,
                gender: null,
                items: [
                    { id: 0, name: 'Male'},
                    { id: 1, name: 'Female'}
                ],
                username: "",
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                c_password: "",
                phone_number: "",
                description: "Tell us something about you",
                rules: [v => v.length <= 100 || 'Max 100 characters'],
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
                this.alert = false;
                this.successful = false;
                this.$refs.obs.validate().then(
                    isValid => {
                    if (isValid) {
                        let user = new User(this.username, this.firstname, this.lastname,
                            this.email, this.gender, this.description, this.password);
                        this.$store.dispatch('auth/register', user).then(
                            data => {
                                this.alertMsg = data.message;
                                this.successful = true;
                                this.$store.dispatch('auth/login', user).then(
                                    () => {
                                        router.push('/');
                                    },
                                    error => {
                                        this.alertMsg =
                                            (error.response && error.response.data) ||
                                            error.message ||
                                            error.toString();
                                        this.successful = false;
                                        this.alert = true;
                                    }
                                )
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
                );
            },
            toLgoIn() {
                router.push("/login")
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
