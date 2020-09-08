class PostDetailsView {
    postModel = new PostsModel();
    usersModel = new UsersModel();
    commentsModel = new CommentsModel();

    commentsElem = document.querySelector('[data-post="comments"]');

    constructor() {
        const id = this.getPostById();
        const post = this.postModel.getPostById(id);
        this.hidrateHtml(post);
        
        document.querySelector('[data-comment-submit]').addEventListener('click', this.handleCommentFormSubmit.bind(this));
    }

    getPostById() {
        const params = new URLSearchParams(location.search);
        return Number(params.get('id'));
    }

    hidrateHtml(data) {
        data.then(post => {
            this.currentPost = post;
            this.hidrateAuthor(post.userId);
            this.hidrateComments(post.id);

            const titleElem = document.querySelector('[data-post="title"]');
            const bodyElem = document.querySelector('[data-post="body"]');

            titleElem.innerText = post.title;
            bodyElem.innerText = post.body;
        });
    }

    hidrateAuthor(id) {
        this.usersModel.getUserById(id)
        .then(author => {
            const authorElem = document.querySelector('[data-post="author"]');
            authorElem.innerText = author.username;
        })

    }

    hidrateComments(id) {
        this.commentsModel.getCommentsForPost(id)
        .then(comments => {
            const fragment = document.createDocumentFragment();
            for (const comment of comments) {
                fragment.append(this.createComment(comment));
            }
            this.commentsElem.append(fragment);
        })
    }

    createComment(comment) {
        const container = document.createElement('div');
        const email = document.createElement('h4');
        email.innerText = `Email: ${comment.email}`;
        const name = document.createElement('h3');
        name.innerText = comment.name;
        const body = document.createElement('p');
        body.innerText = comment.body;

        container.append(email);
        container.append(name);
        container.append(body);

        return container
    }

    handleCommentFormSubmit(e) {
        const form = document.querySelector('[data-comment-form]');
        const textarea = document.querySelector('#comment');
        const email = document.querySelector('#email');
        const title = document.querySelector('#title');

        this.commentsModel.createComment(this.getPostById(), 1, textarea.value, email.value, title.value)
        .then(comment => {
            this.commentsElem.append(this.createComment(comment));
        });

        e.preventDefault();
        form.reset();
    }
}

new PostDetailsView();
