import header from "./components/header.js";
import { API_URL } from "./config.js";
import pagination from "./components/pagination.js";
import { renderUserCard } from "./functions.js";

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
        usersDiv.append(renderUserCard(user))
    })
    
    header()
}
usersData()
