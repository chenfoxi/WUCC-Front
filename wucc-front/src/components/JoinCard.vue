<template>
    <v-card width="400" class="pa-2">
        <v-card-title>
            <!--            <h1 class="display-1-->
            <!--                    text-uppercase font-weight-bold">Join Us</h1>-->
            <slot name="title"></slot>
        </v-card-title>
        <ValidationObserver ref="obs">
            <v-card-text>
                <v-form ref="form" @submit.prevent>
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
            <v-card-actions>
                <slot name="cancelBtn"></slot>
                <v-btn color="error" @click="resetForm">Reset</v-btn>
                <slot name="spacer"></slot>
                <v-btn color="info" @click="submit">Join</v-btn>
            </v-card-actions>
        </ValidationObserver>
        <slot name="jumpLogin"></slot>
        <v-snackbar
            :timeout="5000"
            :value="true"
            top
            :color="successColor === true ? 'success' : 'info'"
            elevation="24"
            v-model="successNotify"
        >
            {{ joinMsg }}

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="successNotify = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-card>
</template>

<script>
    import {ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
    import User from "../models/user";
    import router from "../router";
    // import MetaEventService from '@/service/open/meta.event.service';

    setInteractionMode('eager');

    export default {
        name: "JoinCard",
        components: {
            ValidationProvider,
            ValidationObserver
        },
        props: {
            isRegAndJoin: {
                type: Boolean,
                default: false
            },
            dialogC: {
                type: Boolean,
                default: false
            },
            eventType: {
                type: Number,
                default: 0
            },
            eventId: {
                type: Number,
                default: 0
            },
            // value from parent components, and emit the value back
            checkJoinC: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                showPassword: false,
                gender: null,
                items: [
                    {id: 0, name: 'Male'},
                    {id: 1, name: 'Female'}
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
                successNotify: false,
                joinMsg: "",
                successColor: true
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
                            let user = new User(this.username, this.firstname, this.lastname,
                                this.email, this.gender, this.description, this.password);

                            this.$store.dispatch('auth/register', user).then(
                                data => {
                                    this.joinMsg = data.message;
                                    this.successNotify = true;
                                    this.$store.dispatch('auth/login', user).then(
                                        data => {
                                            console.log(data);
                                            if (!this.isRegAndJoin) {
                                                router.push('/');
                                            } else {
                                               this.$emit('update:dialogC', false);
                                            }
                                        },
                                        error => {
                                            console.log(error);
                                            this.joinMsg = "Something is wrong; Please try in the next time.";
                                            this.successColor = false;
                                            this.successNotify = true;
                                        }
                                    )
                                },
                                error => {
                                    console.log(error);
                                    this.joinMsg = "Something is wrong; Please try in the next time.";
                                    this.successColor = false;
                                    this.successNotify = true;
                                }
                            );
                        }
                    }
                );
            }
        }
    }
</script>

<style scoped>

</style>
