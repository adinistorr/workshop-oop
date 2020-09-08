class UsersModel {
    apiUrl = 'https://jsonplaceholder.typicode.com/users'

    //Read
    getUserById(id) {
        return this.getApiData(id);
    }

    getApiData(id, options) {
        return fetch(this.apiUrl + (id ? `/${id}` : ''), options).then(res => res.json());
    }
}
