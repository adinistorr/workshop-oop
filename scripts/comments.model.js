class CommentsModel {
    apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    //Read
    getCommentsForPost(id) {
        return this.getApiData(id);
    }

    createComment(id, userId, body, email, name) {
        return this.getApiData(id, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                userId,
                body,
                email,
                name,
            })
        }
    )}


    getApiData(id, options) {
        return fetch(this.apiUrl + (id ? `/${id}/comments` : ''), options).then(res => res.json());
    }
}