import { API_URL } from "./config.js";
import pagination from "./components/pagination.js";
import header from "./components/header.js";
import { createCardElementImg, createElement } from "./functions.js";

async function albumsData() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const pageParam = urlParams.get('page')
    
    const page = pageParam ? pageParam : 1
    const itemsPerPage = urlParams.get('items-per-page') ?? 10

    const albumsResponse = await fetch(`${API_URL}/albums?_expand=user&_embed=photos&_page=${page}&_limit=${itemsPerPage}`)
    const albums = await albumsResponse.json()
    
    const container = document.getElementById('albums-page')
    const titleEl = createElement('h1', 'mb-3', 'Albums')

    const createAlbumLink = createElement('a', '', 'Create Album')
    createAlbumLink.href = './album/create-album.html'

    const albumsDiv = createElement('div');
    container.append(titleEl, createAlbumLink, albumsDiv)

    albums.forEach(album => {
        const albumData = {
            image: album.photos[0].thumbnailUrl,
            title: album.title,
            subtitle: `Author: ${album.user.name}`,
            text: `Amount of photos: ${album.photos.length}`,
            link: {
                text: `Go to album's page`,
                href: `./album.html?album-id=${album.id}`
            }
        }

        albumsDiv.append(createCardElementImg(albumData))
    });

    const paginationEl = pagination('albums', albumsResponse, page, itemsPerPage, albumsDiv)

    albumsDiv.after(paginationEl)
    header()
}
albumsData()