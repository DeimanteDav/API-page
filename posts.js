import { API_URL } from "./config.js";
import { createElement, renderPostCard } from "./functions.js";
import pagination from "./components/pagination.js";
import header from "./components/header.js";

async function posts() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const pageParam = urlParams.get('page')

    const page = pageParam ? pageParam : 1
    const itemsPerPage = urlParams.get('items-per-page') ?? 10

    const container = document.getElementById('posts-page')
    const titleEl = createElement('h1', 'mb-3', 'Posts')

    const createPostLink = createElement('a', '', 'Write Post')
    createPostLink.href = './post/create-post.html'

    const postsDiv = createElement('div');
    container.append(titleEl, createPostLink, postsDiv)
    
    const postResponse = await fetch(`${API_URL}/posts?_expand=user&_page=${page}&_limit=${itemsPerPage}`)
    const posts = await postResponse.json()

    const paginationEl = pagination('posts', postResponse, page, itemsPerPage, postsDiv)
    
    posts.forEach(post => {
        postsDiv.append(renderPostCard(post))
    })
    
    postsDiv.after(paginationEl)
    header()
} 
posts() 


