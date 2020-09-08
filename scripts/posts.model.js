class PostsModel {
    apiUrl = 'https://jsonplaceholder.typicode.com/posts'
    // CRUD - Create Read Update Delete

    // Read
    getAllPosts() {
        return this.getApiData();
    }

    getPostById(id) {
        return this.getApiData(id);

    }

    //Create
    createPost(title, body, userId) {
        const post = {
            title,
            body,
            userId,
        };

        return this.getApiData(null, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(post),
        });
    }

    //Update
    /*
    * PUT - idempotent - trebuie sa transmitem un obiect complet de tip Post pentru ca va fi inlocuit in baza de date
    * PATCH - nu este idempotent - putem transmite un obiect partial, care are doar proprietatile care ne intereseaza sa fie actualizate
    */
    updatePost(id, post) {
        return this.getApiData(id, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(post)
        });
    }

    //Delete
    deletePost(id) {
        return this.getApiData(id, {
            method: 'DELETE'
        })
    }

    getApiData(id, options) {
        return fetch(this.apiUrl + (id ? `/${id}` : ''), options).then(res => res.json());
    }
}