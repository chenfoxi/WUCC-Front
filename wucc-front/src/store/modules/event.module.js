import OEventService from "@/service/open/oevent.service";
import MetaEventService from "@/service/open/meta.event.service";
import OEvent from "@/models/oEvent";
// import simpleResponse from "@/models/simpleResponse";


export const event = {
    namespaced: true,
    state: {
        eventList: [],
        regularEventList: []
    },
    getters: {},
    actions: {
        getOEventList({ commit }, count){
            return OEventService.getOEventList(count.start, count.end).then(
                data => {
                    if (data.code === 0 ){
                        commit('oEventListSuccess', data.data);
                    }

                    return Promise.resolve(data);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        getREventList({ commit }) {
            return MetaEventService.getValidEventList(0).then(
                data => {
                    commit('rEventListSuccess', data);

                    return Promise.resolve(data);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        oEventListSuccess(state, data) {
            for(let i = 0; i < data.length; i++){
                let temp = data[i];
                let oevent = new OEvent(temp.id, temp.title, temp.description, temp.content,
                    temp.street, temp.suburb, temp.city, temp.url, temp.startTime, temp.endTime, temp.status);
                state.eventList.push(oevent);
            }
        },
        rEventListSuccess(state, data) {
            for(let i = 0; i < data.length; i++){
                state.regularEventList.push(data[i]);
            }
        },
    }

};
