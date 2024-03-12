import header from "./components/header.js"
import { API_URL } from "./config.js"


async function photos() {
    let queryParams = document.location.search
    let urlParams = new URLSearchParams(queryParams)
    
    let albumId = urlParams.get('albumId')
    
    let albumResponse = await fetch(`${API_URL}/albums/${albumId}?_embed=photos`)
    let album = await albumResponse.json()

    
    let albumTitle = document.createElement('h2');
    albumTitle.textContent = `Album title: ${album.title}`
    console.log(album);


    album.photos.forEach(photo => {
        let imagesDiv = document.querySelector('#images-div');
        let imagesLink = document.createElement('a');
        imagesLink.href = photo.url

        let images = document.createElement('img');
        images.src = photo.thumbnailUrl

        imagesLink.dataset.pswpWidth = 500
        imagesLink.dataset.pswpHeight = 500
        imagesLink.target = '_blank'

        imagesLink.append(images)
        imagesDiv.append(imagesLink)
        
        imagesDiv.before(albumTitle)
    })
    header()

}
photos()



