export default class OEvent {
    constructor(id, title, description, content, street, suburb, city, photoUrl, start_time, end_time, status){
        this.id = id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.street = street;
        this.suburb = suburb;
        this.city = city;
        this.photoUrl = photoUrl;
        this.start_time = start_time;
        this.end_time = end_time;
        this.status = status;
    }
}
