class PostListView {
    postModel = new PostsModel();

    constructor() {
        this.postModel.getAllPosts()
            .then(posts => {            
                const html = this.buildHtml(posts);
                this.displayPostList(html);
            });
    }
    buildHtml(posts) {
        const fragment = document.createDocumentFragment();

        for (const post of posts) {
           const p = document.createElement('p');
           const a = document.createElement('a');
           a.innerText = post.title
           a.href = `post-details.html?id=${post.id}`;
           p.append(a);

           fragment.append(p);
        }

        return fragment;
    }

    displayPostList(html) {
        const container = document.querySelector('[data-post-container]');

        container.append(html)
    }
}

new PostListView();