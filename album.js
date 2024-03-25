import header from "./components/header.js"
import { API_URL } from "./config.js"
import { createElement, fetchData, renderAuthorItem } from "./functions.js"
import buttonGroup from "./components/buttonGroup.js";
import toast from "./components/toast.js";

async function album() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const albumId = urlParams.get('albumId')
    
    const album = await fetchData(`${API_URL}/albums/${albumId}?_embed=photos&_expand=user`)

    const container = document.getElementById('album-page')
    const title = createElement('h1', '', album.title);

    const authorWrapper = createElement('div', '', album.user.name)
    const authorText = createElement('span', 'fw-bold mx-2', 'Author')
    authorWrapper.prepend(authorText)

    const authorItem = renderAuthorItem(album.user.name, album.user.id,editAuthor, title, 'after')

    async function editAuthor(form, userId) {
      const response = await fetch(`${API_URL}/albums/${albumId}?_expand=user`, {
        method: 'PATCH',
        body: JSON.stringify({
            userId
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    if (response.ok) {
        const user = await fetchData(`${API_URL}/users/${userId}`)

        form.remove()
    
        title.after(renderAuthorItem(user.name, user.id, editAuthor, title, 'after'))

        toast({text: 'User changed successfully'})
    }
    }


    const albumDiv = createElement('div', 'my-4 pswp-gallery pswp-gallery--single-column');

    album.photos.forEach((photo) => {
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


    function deleteAlbum() {
        fetch(`${API_URL}/albums/${albumId}`, {
            method: 'DELETE',
        });

        history.back()
    }
    
    const buttons = buttonGroup({
        deleteInfo: {
            text: `Are you sure you want to delete this ${album.title} album?`,
            handler: deleteAlbum
        },
        editHref: `./album/edit-album.html?albumId=${albumId}`
    })


    container.append(title, authorItem, buttons, albumDiv)

    header()
}

album()



