import header from "./components/header.js";
import { API_URL } from "./config.js";
import pagination from "./components/pagination.js";
import { createCardElement, createElement } from "./functions.js";

async function usersData() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
        
    const pageParam = urlParams.get('page')
    const page = pageParam ? pageParam : 1
    const itemsPerPage = urlParams.get('items-per-page') ?? 10
     
    const usersResponse = await fetch(`${API_URL}/users?_embed=posts&_page=${page}&_limit=${itemsPerPage}`)
    const users = await usersResponse.json()

    const usersDiv = document.querySelector('#users');

    users.forEach(user => {
        // let author = document.createElement('h2');
        // author.innerHTML = `<a href="./user.html?userId=${user.id}">Author: ${user.name}</a>`

        // let posts = document.createElement('p');
        // posts.textContent = `Amount of posts: ${user.posts.length}`

        // usersDiv.append(author, posts)

        const userData = {
            title: user.name,
            subtitle: `Amount of posts: ${user.posts.length}`,
            link: {
                text: `Go to user's page`,
                href: `./user.html?userId=${user.id}`
            }
        }

        usersDiv.append(createCardElement(userData))
    })
    
    header()
}
usersData()
