import header from "./components/header.js";
import { API_URL } from "./config.js";
import { createElement, fetchData, renderUserCard } from "./functions.js";

async function usersData() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const pageParam = urlParams.get('page')
    const page = pageParam ? pageParam : 1
    const itemsPerPage = urlParams.get('items-per-page') ?? 10
     
    const users = await fetchData(`${API_URL}/users?_embed=posts&_page=${page}&_limit=${itemsPerPage}`)

    const container = document.getElementById('users-page')
    const titleEl = createElement('h1', 'mb-3', 'Users')
    const createUserLink = createElement('a', '', 'Create a new User')
    createUserLink.href = './user/create-user.html'

    const usersDiv = createElement('div')
    container.append(titleEl, createUserLink, usersDiv)

    users.forEach(user => {
        usersDiv.append(renderUserCard(user))
    })
    
    header()
}
usersData()
