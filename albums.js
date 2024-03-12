import { API_URL } from "./config.js";
import pagination from "./components/pagination.js";
import header from "./components/header.js";
import { createElement } from "./functions.js";

async function albumsData() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const pageParam = urlParams.get('page')
    const page = pageParam ? pageParam : 1
    const itemsPerPage = urlParams.get('items-per-page') ?? 10

    const albumsResponse = await fetch(`${API_URL}/albums?_expand=user&_embed=photos&_page=${page}&_limit=${itemsPerPage}`)
    const albums = await albumsResponse.json()
    const albumsDiv = document.querySelector('#albums');

    albums.forEach(album => {
        const albumCard = createElement('div', 'card my-4')

        albumCard.innerHTML = `
            <div class="row p-4">
                <div class="col-auto">
                    <img src="${album.photos[0].thumbnailUrl}" class="img-fluid rounded" alt="...">
                </div>
                <div class="col">
                    <h5 class="card-title">${album.id}. ${album.title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Author: ${album.user.name}</h6>
                    <p class="card-text">Amount of photos: ${album.photos.length}</p>
                    <a href="./photos.html?albumId=${album.id}" class="card-link">Go to album's page</a>
                </div>
            </div>
        `
        albumsDiv.append(albumCard)
    });

    albumsDiv.after(pagination('albums', albumsResponse, page, itemsPerPage, albumsDiv))
   header()
}
albumsData()