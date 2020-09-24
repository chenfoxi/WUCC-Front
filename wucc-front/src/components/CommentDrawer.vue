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
                <v-list-item-title>Responses ({{ getCommentNumber }})</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <div v-if="uId !== 0" class="pa-4 d-flex flex-column">
            <v-textarea
                label="What are your thoughts?"
                auto-grow
                outlined
                hide-details="true"
                rows="1" row-height="15"
                @focusin="changeState"
                @keypress="disabled = false"
                v-model="thought"
            >
            </v-textarea>
            <v-expand-transition>
                <div class="align-self-end mt-2" v-show="expand" >
                    <v-btn text  @click="cancelComment">
                        Cancel
                    </v-btn>
                    <v-btn tile color="primary" :disabled="disabled" @click="sendComment">
                        <v-icon left>mdi-pencil</v-icon>Response
                    </v-btn>
                </div>
            </v-expand-transition>
        </div>


        <v-list dense>
            <v-card
                class="ml-4 mr-4 mx-auto pa-2 bottom-line"
                flat
                tile
                v-for="item in getCommentList"
                :key="item.id"
            >
                <v-card-text class=" font-weight-bold">
                    {{ item.content }}
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
                            <v-list-item-title>{{ item.first_name + " " + item.last_name}}</v-list-item-title>
                        </v-list-item-content>
                        <v-row
                            align="center"
                            justify="end"
                        >
                            <v-icon v-if="getDeleteState(item)" class="mr-1" @click="deleteComment(item.id)">mdi-delete</v-icon>
                        </v-row>
                    </v-list-item>


                </v-card-actions>
            </v-card>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import Comment from "@/models/comment";
    import CommentService from "@/service/comment.service";

    export default {
        name: "CommentDrawer",
        props: {
            uId: {
                type: Number,
                default: 0
            },
            articleId: {
                type: Number,
                require: true,
            },
            // 0--REvent, 1--OEvent, 2--Post
            articleType: {
                type: Number,
                require: true
            },
            authorId: {
                type: Number,
                default: 0
            }

        },
        data() {
            return {
                expand: false,
                disabled: true,
                thought: ""
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
            getCommentList() {
                return this.$store.state.commentModule.commentList;
            },
            getCommentNumber() {
                return this.$store.state.commentModule.commentList.length;
            },
        },
        methods: {
            changeState() {
                this.expand = !this.expand;
                this.disabled = this.thought === "";
            },
            sendComment() {
                this.disabled = true;
                let content = this.thought;
                // send comment
                let comment = new Comment(this.articleId, this.articleType, this.uId, content);
                CommentService.addComment(comment).then(
                    data => {
                        if (data === true){
                            //change disable
                            this.reloadComments();
                            this.thought = "";
                            this.disabled = false;
                            this.expand = false;
                        }
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
            },
            cancelComment() {
                this.thought = "";
                this.expand = false;
            },
            reloadComments() {
                if (this.commentDrawer === true){
                    this.$store.dispatch('commentModule/getCommentList', {
                        'post_id': this.articleId,
                        'comment_type': this.articleType
                    });
                }
            },
            getDeleteState(item) {
                if (this.uId === 0) {
                    return false;
                }
                if (item.user_id === this.uId) {
                    return true;
                } else {
                    if (this.articleType === 0 || this.articleType === 1){
                        return false;
                    }
                    if (this.articleType === 2){
                        return this.authorId === this.uId;
                    }
                }
                return false;
            },
            deleteComment(id) {
                CommentService.deleteComment(id).then(
                    data => {
                        if (data === true){
                            this.reloadComments();
                        }
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
            }
        },
        watch: {
            'commentDrawer': 'reloadComments'
        }
    }
</script>

<style scoped>
    .bottom-line {
        border-bottom: 1px solid rgba(230, 230, 230, 1);
    }
</style>
