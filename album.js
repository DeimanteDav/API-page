import header from "./components/header.js"
import { API_URL } from "./config.js"
import { createElement } from "./functions.js"

async function album() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    
    const albumId = urlParams.get('albumId')
    
    const albumResponse = await fetch(`${API_URL}/albums/${albumId}?_embed=photos`)
    const album = await albumResponse.json()

    const albumTitle = document.getElementById('title');
    albumTitle.textContent = `Album title: ${album.title}`

    const albumDiv = document.getElementById('album');

    album.photos.forEach((photo, i) => {
      const imageLink = createElement('a')
      imageLink.href = photo.url
      imageLink.dataset.pswpWidth = 500
      imageLink.dataset.pswpHeight = 500
      imageLink.target = '_blank'
      
      const imageEl = createElement('img','m-2')
      imageEl.src = photo.thumbnailUrl

      imageLink.append(imageEl)
      albumDiv.append(imageLink)
    })

    header()
}

album()



