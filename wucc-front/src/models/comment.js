export default class Comment {
    constructor(post_id, comment_type, user_id,
                content, avatar_url, first_name, last_name, id) {
        this.post_id = post_id;
        this.comment_type = comment_type;
        this.user_id = user_id;
        this.content = content;
        this.avatar_url = avatar_url;
        this.first_name = first_name;
        this.last_name = last_name;
        this.id = id;
    }
}
