import { API_URL } from "./config.js";
import { fetchData, renderPostCard } from "./functions.js";
import pagination from "./components/pagination.js";
import header from "./components/header.js";

async function posts() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const pageParam = urlParams.get('page')
    const page = pageParam ? pageParam : 1
    const itemsPerPage = urlParams.get('items-per-page') ?? 10
    const postsDiv = document.querySelector('#posts');
    
    const postResponse = await fetchData(`${API_URL}/posts?_expand=user&_page=${page}&_limit=${itemsPerPage}`)
    const posts = await postResponse.json()
    
    posts.forEach(post => {
        postsDiv.append(renderPostCard(post))
    })
    
    postsDiv.after(pagination('posts', postResponse, page, itemsPerPage, postsDiv))
    header()
} 
posts() 


