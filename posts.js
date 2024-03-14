import { API_URL } from "./config.js";
import { createCardElement, renderSinglePost } from "./functions.js";
import pagination from "./components/pagination.js";
import header from "./components/header.js";

async function posts() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)

    const pageParam = urlParams.get('page')
    const page = pageParam ? pageParam : 1
    const itemsPerPage = urlParams.get('items-per-page') ?? 10
    const postsDiv = document.querySelector('#posts');
    
    const postResponse = await fetch(`${API_URL}/posts?_embed=comments&_expand=user&_page=${page}&_limit=${itemsPerPage}`)
    const posts = await postResponse.json()
    
    posts.forEach(async post => {
        // div.append(renderSinglePost({
        //     post,
        //     user: post.user,
        //     showBody: true,
        //     comments: post.comments,
        //     showReadMore: true,
        // }))
        const postData = {
            title: post.title,
            subtitle: `Author: ${post.user.name}`,
            text: post.body,
            link: {
                text: `Go to author's page`,
                href: `./user.html?userId=${post.user.id}`
            },
            anotherLink: {
                text: `Read more`,
                href: `./post.html?postId=${post.id}`
            }
        }
        const postCard = createCardElement(postData)
        postsDiv.append(postCard)

    })
    postsDiv.after(pagination('posts', postResponse, page, itemsPerPage, postsDiv))
    header()
} 
posts() 


