import BlogService from "@/service/blog.service";
import Blog from "@/models/blog";
import _ from 'lodash';

export const blogModule = {
    namespaced: true,
    state: {
        blogList: [],
        mostViewList: []
    },
    getters: {},
    actions: {
        getBlogList({ commit }, data){
            return BlogService.getBlogList(data.post_type, data.audit_status).then(
                data => {
                    commit('blogListSuccess', data);
                    return Promise.resolve(data);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        getMostView({ commit }){
            return BlogService.getMostViewTopTen().then(
                data => {
                    commit('mostViewListSuccess', data);
                    return Promise.resolve(data);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        blogListSuccess(state, data) {
            if (state.blogList.length !== 0){
                _.remove(state.blogList);
            }
            for(let i = 0; i < data.length; i++){
                let temp = data[i];
                let blog = new Blog(temp.title, temp.excerpt, temp.content, temp.userId,
                    temp.updateTime, temp.createTime, temp.id, temp.imageUrl, temp.postType,
                    temp.auditStatus, temp.commentStatus);
                state.blogList.push(blog);
            }
        },
        mostViewListSuccess(state, data) {
            if (state.mostViewList.length !== 0){
                _.remove(state.mostViewList);
            }
            for(let i = 0; i < data.length; i++){
                let temp = data[i];
                let blog =  {
                    "id": temp.id,
                    "title": temp.title
                };
                state.blogList.push(blog);
            }
        },
    }

};
