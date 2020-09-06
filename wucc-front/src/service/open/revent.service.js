import http from '../../api-config';

const API_URL = '/open/revent/';

class REventService {

    // get regular event page model
    getREventsForPage(mId) {
        return http.post(
            `${API_URL}getREventsBymId`,
            {
                'id': mId
            }
        ).then(response => {
            console.log(response.data);
            return response.data;
        }).catch(error => {
            console.log(error);
        });
    }

    //get a number of history of regular event list(based on status)
    getPagedREventsByIdAndStatus(mId, status, start, end){
        return http.post(
            `${API_URL}rEventsList`,
            {
                'id': mId,
                'status': status,
                'start': start,
                'end': end
            }
        ).then(response => {
            console.log(response.data);
            return response.data;
        }).catch(error => {
            console.log(error);
        });
    }

    getValidRegularEventDetail(rId) {
        return http.get(
            `${API_URL}getREvent/${rId}`,
        ).then(response => {
            console.log(response.data);
            return response.data;
        }).catch(error => {
            console.log(error);
        });
    }
}

export default new REventService();
