import { API_URL } from "./config.js";
import pagination from "./components/pagination.js";
import header from "./components/header.js";
import { createElement, renderAlbumCard } from "./functions.js";

async function albumsData() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const pageParam = urlParams.get('page')
    const page = pageParam ? pageParam : 1
    const itemsPerPage = urlParams.get('items-per-page') ?? 10

    const albumsResponse = await fetch(`${API_URL}/albums?_expand=user&_embed=photos&_page=${page}&_limit=${itemsPerPage}`)
    const albums = await albumsResponse.json()
    
    const albumsDiv = document.querySelector('#albums');

    albums.forEach((album, i) => {
        albumsDiv.append(renderAlbumCard(album, i))
    });

    albumsDiv.after(pagination('albums', albumsResponse, page, itemsPerPage, albumsDiv))
   header()
}
albumsData()