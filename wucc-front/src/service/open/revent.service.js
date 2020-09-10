import http from '../../api-config';
import REvent from '@/models/rEvent';
import REventPage from "@/models/rEventPage";

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
            let generalEvent = response.data.general;
            let last = response.data.lastFinishedEvent;
            let next = response.data.incomingEvent;

            return new REventPage(generalEvent, last, next);
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

            let temp = response.data.data;
            return new REvent(temp.id, temp.title, temp.rId, temp.dayOfWeek, temp.start_date, temp.end_date,
                temp.description, temp.photoUrl, temp.street, temp.suburb, temp.city,
                temp.start_time, temp.end_time, temp.status, temp.content);
        }).catch(error => {
            console.log(error);
        });
    }
}

export default new REventService();
