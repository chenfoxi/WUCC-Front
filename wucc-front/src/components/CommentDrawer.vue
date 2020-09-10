<template>
    <v-navigation-drawer
        v-model="commentDrawer"
        temporary
        right
        width="400px"
        app
    >
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>Responses ({{count}})</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <div class="pa-4">
            <v-textarea
                label="What are your thoughts?"
                auto-grow
                outlined
                rows="1"
                row-height="15"

            ></v-textarea>
        </div>


        <v-list dense>
            <v-card
                class="mx-auto"
                color="#26c6da"
                dark
                max-width="300"
            >
                <v-card-title>
                    <v-icon
                        large
                        left
                    >
                        mdi-twitter
                    </v-icon>
                    <span class="title font-weight-light">Twitter</span>
                </v-card-title>

                <v-card-text class="headline font-weight-bold">
                    "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                </v-card-text>

                <v-card-actions>
                    <v-list-item class="grow">
                        <v-list-item-avatar color="grey darken-3">
                            <v-img
                                class="elevation-6"
                                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                            ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>Evan You</v-list-item-title>
                        </v-list-item-content>

                        <v-row
                            align="center"
                            justify="end"
                        >
                            <v-icon class="mr-1">mdi-heart</v-icon>
                            <span class="subheading mr-2">256</span>
                            <span class="mr-1">·</span>
                            <v-icon class="mr-1">mdi-share-variant</v-icon>
                            <span class="subheading">45</span>
                        </v-row>
                    </v-list-item>
                </v-card-actions>
            </v-card>
            <v-card
                class="mx-auto"
                color="#26c6da"
                dark
                max-width="300"
            >
                <v-card-title>
                    <v-icon
                        large
                        left
                    >
                        mdi-twitter
                    </v-icon>
                    <span class="title font-weight-light">Twitter</span>
                </v-card-title>

                <v-card-text class="headline font-weight-bold">
                    "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                </v-card-text>

                <v-card-actions>
                    <v-list-item class="grow">
                        <v-list-item-avatar color="grey darken-3">
                            <v-img
                                class="elevation-6"
                                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                            ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>Evan You</v-list-item-title>
                        </v-list-item-content>

                        <v-row
                            align="center"
                            justify="end"
                        >
                            <v-icon class="mr-1">mdi-heart</v-icon>
                            <span class="subheading mr-2">256</span>
                            <span class="mr-1">·</span>
                            <v-icon class="mr-1">mdi-share-variant</v-icon>
                            <span class="subheading">45</span>
                        </v-row>
                    </v-list-item>
                </v-card-actions>
            </v-card>
            <v-card
                class="mx-auto"
                color="#26c6da"
                dark
                max-width="300"
            >
                <v-card-title>
                    <v-icon
                        large
                        left
                    >
                        mdi-twitter
                    </v-icon>
                    <span class="title font-weight-light">Twitter</span>
                </v-card-title>

                <v-card-text class="headline font-weight-bold">
                    "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                </v-card-text>

                <v-card-actions>
                    <v-list-item class="grow">
                        <v-list-item-avatar color="grey darken-3">
                            <v-img
                                class="elevation-6"
                                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                            ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>Evan You</v-list-item-title>
                        </v-list-item-content>

                        <v-row
                            align="center"
                            justify="end"
                        >
                            <v-icon class="mr-1">mdi-heart</v-icon>
                            <span class="subheading mr-2">256</span>
                            <span class="mr-1">·</span>
                            <v-icon class="mr-1">mdi-share-variant</v-icon>
                            <span class="subheading">45</span>
                        </v-row>
                    </v-list-item>
                </v-card-actions>
            </v-card>
            <v-card
                class="mx-auto"
                color="#26c6da"
                dark
                max-width="300"
            >
                <v-card-title>
                    <v-icon
                        large
                        left
                    >
                        mdi-twitter
                    </v-icon>
                    <span class="title font-weight-light">Twitter</span>
                </v-card-title>

                <v-card-text class="headline font-weight-bold">
                    "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                </v-card-text>

                <v-card-actions>
                    <v-list-item class="grow">
                        <v-list-item-avatar color="grey darken-3">
                            <v-img
                                class="elevation-6"
                                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                            ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>Evan You</v-list-item-title>
                        </v-list-item-content>

                        <v-row
                            align="center"
                            justify="end"
                        >
                            <v-icon class="mr-1">mdi-heart</v-icon>
                            <span class="subheading mr-2">256</span>
                            <span class="mr-1">·</span>
                            <v-icon class="mr-1">mdi-share-variant</v-icon>
                            <span class="subheading">45</span>
                        </v-row>
                    </v-list-item>
                </v-card-actions>
            </v-card>
            <v-card
                class="mx-auto"
                color="#26c6da"
                dark
                max-width="300"
            >
                <v-card-title>
                    <v-icon
                        large
                        left
                    >
                        mdi-twitter
                    </v-icon>
                    <span class="title font-weight-light">Twitter</span>
                </v-card-title>

                <v-card-text class="headline font-weight-bold">
                    "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                </v-card-text>

                <v-card-actions>
                    <v-list-item class="grow">
                        <v-list-item-avatar color="grey darken-3">
                            <v-img
                                class="elevation-6"
                                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                            ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>Evan You</v-list-item-title>
                        </v-list-item-content>

                        <v-row
                            align="center"
                            justify="end"
                        >
                            <v-icon class="mr-1">mdi-heart</v-icon>
                            <span class="subheading mr-2">256</span>
                            <span class="mr-1">·</span>
                            <v-icon class="mr-1">mdi-share-variant</v-icon>
                            <span class="subheading">45</span>
                        </v-row>
                    </v-list-item>
                </v-card-actions>
            </v-card>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "CommentDrawer",
        props: {
            uId: {
                type: Number,
                default: 0
            },
            articleId: {
                type: Number,
                require: true
            },
            // 0--REvent, 1--OEvent, 2--Post
            articleType: {
                type: Number,
                require: true
            }
        },
        data() {
            return {
                count: 0
            }
        },
        computed: {
            commentDrawer: {
                get() {
                    return this.$store.state.pathes.commentDrawer;
                },
                set(val) {
                    this.$store.dispatch('pathes/setDrawerStatus', val);
                },
            },
        }
    }
</script>

<style scoped>

</style>
