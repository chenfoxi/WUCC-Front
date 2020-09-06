import http from '../api-config'

const API_URL = '/auth/';

class AuthService {
    login(user) {
        return http
            .post(API_URL + 'signin', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                console.log(response.data);
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            })
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return http.post(API_URL + 'signup', {
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            gender: user.gender,
            description: user.description,
            password: user.password
        });
    }
}

export default new AuthService();
