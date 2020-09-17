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
            let generalEvent = response.data.data.general;
            let last = response.data.data.lastFinishedEvent;
            let next = response.data.data.incomingEvent;

            return new REventPage(generalEvent, last, next);
        }).catch(error => {
            console.log(error);
        });
    }

    //get a number of history of regular event list(based on status)
    getPagedREventsByIdAndStatus(mId, status, start, end, orderTerm){
        return http.post(
            `${API_URL}rEventsList`,
            {
                'id': mId,
                'status': status,
                'start': start,
                'end': end,
                'orderTerm': orderTerm
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

            let temp = response.data;
            return new REvent(temp.id, temp.title, temp.rid, temp.dayOfWeek, temp.startDate, temp.endDate,
                temp.description, temp.photoUrl, temp.street, temp.suburb, temp.city,
                temp.startTime, temp.endTime, temp.status, temp.content);
        }).catch(error => {
            console.log(error);
        });
    }

    getCountByStatusAndId(mId, status) {
        return http.post(
            `${API_URL}countREvent`,
            {
                'id': mId,
                'status': status,
            }
        ).then(response => {
            console.log(response.data.data);
            return response.data.data;
        }).catch(error => {
            console.log(error);
        });
    }
}

export default new REventService();
