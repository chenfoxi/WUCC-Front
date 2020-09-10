import http from '../../api-config';
import OEvent from '@/models/oEvent';

const API_URL = '/open/oevent/';

class OEventService {

    // get list of once event
    getOEventList(start, end) {
        return http.post(
            `${API_URL}list/`,
            {
                'start': start,
                'end': end
            }
        ).then(response => {
            // console.log(response.data);
            return response.data;
        }).catch(error => {
                console.log(error);
        });
    }

    // get once event detail by oId
    getValidOnceEventDetail(oId) {
        return http.get(
            `${API_URL}getOEvent/${oId}`,
        ).then(response => {
            console.log(response.data);
            let temp = response.data.data;
            return new OEvent(temp.id, temp.title, temp.description, temp.content,
                temp.street, temp.suburb, temp.city, temp.url, temp.startTime, temp.endTime, temp.status);
        }).catch(error => {
            console.log(error);
        });
    }

    //get a number of history of regular event list(based on status)
    getPagedREventsByIdAndStatus(mId, status, start, end) {
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
}

export default new OEventService();
