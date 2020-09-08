import http from '../../api-config';

const API_URL = '/open/event/';

class MetaEventService {

    // according to the type of event, get list of event
    getValidEventList(type) {
        return http.get(`${API_URL}listOrderBy/${type}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }

    // get all relevant photos about a event
    getPhotos(id, type) {
        return http.post(
            `${API_URL}getPhotos`,
            {
                'id': id,
                'type': type
            }
        ).then(response => {
            console.log(response.data);
            return response.data;
        }).catch(error => {
            console.log(error);
        });
    }

    //check if event is registered by uId
    checkRegByEventIdAndUId(id, uId, type){
        return http.post(
            `${API_URL}checkReg`,
            {
                'eventId': id,
                'uid': uId,
                'type': type
            }
        ).then(response => {
            console.log(response.data);
            return response.data;
        }).catch(error => {
            console.log(error);
        });
    }

    // join event, return true if success, otherwise return false
    joinEventByEventIdAndUId(id, uId, type){
        return http.post(
            `${API_URL}joinEvent`,
            {
                'eventId': id,
                'uid': uId,
                'type': type
            }
        ).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
        });
    }
}

export default new MetaEventService();
