import CommentService from "@/service/comment.service";
import Comment from "@/models/comment";
import _ from 'lodash';

export const commentModule = {
    namespaced: true,
    state: {
        commentList: [],
    },
    getters: {},
    actions: {
        getCommentList({ commit }, data){
            return CommentService.getComments(data.post_id, data.comment_type).then(
                data => {
                    commit('commentListSuccess', data);
                    return Promise.resolve(data);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        commentListSuccess(state, data) {
            if (state.commentList.length !== 0){
                _.remove(state.commentList);
            }
            for(let i = 0; i < data.length; i++){
                let temp = data[i];
                let comment = new Comment(temp.postId, temp.commentType, temp.userId, temp.content,
                    temp.avatarUrl, temp.firstName, temp.lastName, temp.id);
                state.commentList.push(comment);
            }
        },
    }

};
