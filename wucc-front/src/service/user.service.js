import authHeader from "./auth-header";
import http from '../api-config';

const API_URL = '/test/';

class UserService {
    getPublicContent() {
        return http.get(API_URL + 'all')
    }

    getUserBoard() {
        return http.get(API_URL + 'user', {headers: authHeader()})
    }
}

export default new UserService();
