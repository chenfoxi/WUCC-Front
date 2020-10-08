<template>
    <div class="newBlog">
        <v-container>
            <div class="mb-5 d-flex flex-row-reverse">
                <v-btn
                    text
                    class="ml-2"
                    @click="resetData"
                >
                    <v-icon left>
                        mdi-restore
                    </v-icon>
                    Reset
                </v-btn>
                <v-dialog
                    v-model="saveDialog"
                    persistent
                    max-width="290"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            tile
                            class="ml-2"
                            color="primary"

                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon left>
                                mdi-content-save
                            </v-icon>
                            Save
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="headline">
                            Save all your modification?
                        </v-card-title>
                        <v-card-text>
                            All the modification should be saved as a draft
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                @click="saveDialog = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                color="primary"
                                tile
                                @click="saveAsDraft"
                            >
                                Yes
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog
                    v-model="publishDialog"
                    persistent
                    max-width="600px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            tile
                            color="success"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon left>
                                mdi-blogger
                            </v-icon>
                            Publish
                        </v-btn>
                    </template>
                    <v-card>
                        <v-toolbar
                            flat
                            color="secondary"
                            dark
                        >
                            <v-toolbar-title>Choose Blog Settings</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-item-group
                                            v-model="selectedTags"
                                            multiple>
                                            <v-subheader> Add tags for your article</v-subheader>
                                            <v-item
                                                v-for="item in items"
                                                :key="item.id"

                                                v-slot:default="{ active, toggle }"
                                            >
                                                <v-chip
                                                    active-class="purple--text"
                                                    :input-value="active"
                                                    @click="toggle"
                                                    class="mr-4"
                                                >
                                                    {{ item.value }}
                                                </v-chip>
                                            </v-item>
                                        </v-item-group>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-subheader> Permission Setting</v-subheader>
                                        <v-row>
                                            <v-col cols="6">
                                                <v-select
                                                    v-model="selectCommentStatus"
                                                    :items="commentStatusItems"
                                                    item-text="text"
                                                    item-value="value"
                                                    label="Comment:"
                                                ></v-select>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-select
                                                    v-model="selectPrivacyStatus"
                                                    :items="privacyStatusItems"
                                                    item-text="text"
                                                    item-value="value"
                                                    label="Privacy:"
                                                ></v-select>
                                            </v-col>
                                        </v-row>

                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                @click="publishDialog = false"
                            >
                                Close
                            </v-btn>
                            <v-btn
                                color="primary"
                                @click="publishBlog"
                            >
                                Submit
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </div>
            <v-text-field
                label="Title"
                :rules="rules"
                hide-details="auto"
                outlined
                class="mb-5"
                v-model="title"
            ></v-text-field>
            <ckeditor class="ck-editor__editable_inline" :editor="editor" v-model="editorData"
                      :config="editorConfig"></ckeditor>
        </v-container>
    </div>

</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import CKEditor from '@ckeditor/ckeditor5-vue';

    export default {
        name: 'EditBlogPage',
        components: {
            ckeditor: CKEditor.component
        },
        data() {
            return {
                selectCommentStatus: {},
                selectPrivacyStatus: {},
                selectedTags: [],
                saveDialog: false,
                publishDialog: false,
                title: '',
                editor: ClassicEditor,
                editorData: '<p>Type your story in there</p>',
                editorConfig: {
                    // The configuration of the editor.
                },
                rules: [
                    value => !!value || 'Required.',
                    value => (value && value.length >= 10) || 'Min 10 characters',
                ],
                items: [
                    {
                        id: 1,
                        value: 'testimony'
                    },
                    {
                        id: 2,
                        value: 'sharing'
                    }, {
                        id: 3,
                        value: 'notes'
                    }, {
                        id: 4,
                        value: 'digest'
                    }],
                commentStatusItems: [
                    {
                        text: 'Everyone',
                        value: 0
                    },
                    {
                        text: 'Only Follower',
                        value: 1
                    },
                    {
                        text: 'Disable',
                        value: 2
                    }],
                privacyStatusItems: [
                    {
                        text: 'Everyone',
                        value: 0
                    },
                    {
                        text: 'Only Follower',
                        value: 1
                    },
                    {
                        text: 'Disable',
                        value: 2
                    }],
            };
        },
        methods: {
            saveAsDraft() {
                this.saveDialog = false;
                // construct blog
                //send to back-end save as a draft
            },
            resetData() {
                this.title = '';
                this.editorData = '';
            },
            publishBlog() {
                this.publishDialog = false;
            }
        }
    }
</script>

<style>
    .ck-editor__editable_inline {
        min-height: 400px;
    }
</style>
