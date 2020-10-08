import http from '../api-config';

const API_URL = '/blog/';

class BlogService {
    getBlogList(post_type, audit_status) {
        return http
            .post(API_URL + 'getbloglist', {
                postType: post_type,
                auditStatus: audit_status
            })
            .then(response => {
                return response.data.data;
            })
            .catch(error => {
                console.log(error);
            })
    }

    getBlogDetails(id) {
        return http
            .get(API_URL + 'getBlog' + `/${id}`
            )
            .then(response => {
                return response.data.data;
            })
            .catch(error => {
                console.log(error);
            })
    }

    getMostViewTopTen(){
        return http
            .get(API_URL + 'getMostView'
            )
            .then(response => {
                return response.data.data;
            })
            .catch(error => {
                console.log(error);
            })
    }

}

export default new BlogService();
