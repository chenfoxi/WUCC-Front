export default class REvent {
    constructor(id, title, rId, dayOfWeek, start_date, end_date, description,
                photoUrl, street, suburb, city, start_time, end_time, status, content){
        this.id = id;
        this.title = title;
        this.rId = rId;
        this.dayOfWeek = dayOfWeek;
        this.start_date = start_date;
        this.end_date = end_date;
        this.description = description;
        this.photoUrl = photoUrl;
        this.street = street;
        this.suburb = suburb;
        this.city = city;
        this.start_time = start_time;
        this.end_time = end_time;
        this.status = status;
        this.content = content;
    }
}
