import authHeader from "./auth-header";
import http from '../api-config';

const API_URL = '/comment/';

class CommentService {
    getComments(post_id, comment_type) {
        return http
            .post(API_URL + 'getComments', {
                postId: post_id,
                commentType: comment_type
            })
            .then(response => {
                return response.data.data;
            })
            .catch(error => {
                console.log(error);
            })
    }

    addComment(comment) {
        const data = {
                'userId': comment.user_id,
                'postId': comment.post_id,
                'commentType': comment.comment_type,
                'content': comment.content
            };
        return http
            .post(API_URL + 'add',
                data,
                {
                    headers: authHeader()
                },
            )
            .then(response => {
                return response.data.data;
            })
            .catch(error => {
                console.log(error);
            })
    }

    deleteComment(id) {
        const data = {
            'id': id
        };
        return http
            .post(API_URL + 'deleteComment',
                data,
                {
                    headers: authHeader()
                },
            )
            .then(response => {
                return response.data.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export default new CommentService();
