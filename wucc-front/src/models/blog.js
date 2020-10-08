export default class Blog {
    constructor(title, excerpt, content, user_id, update_time, create_time,
                id=0, img_url='', post_type=0, audit_status=0, comment_status=0) {
        this.title = title;
        this.excerpt = excerpt;
        this.content = content;
        this.user_id = user_id;
        this.update_time = update_time;
        this.create_time = create_time;
        this.id = id;
        this.img_url = img_url;
        this.post_type = post_type;
        this.audit_status = audit_status;
        this.comment_status = comment_status;
    }
}
