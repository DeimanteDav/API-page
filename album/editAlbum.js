import form from "../components/form.js";
import formInputItem from "../components/formInputItem.js";
import toast from "../components/toast.js";
import { API_URL } from "../config.js";
import { createElement, fetchData } from "../functions.js";

async function editAlbum() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const albumId = urlParams.get('albumId')

    const albumUrl = `${API_URL}/albums/${albumId}?_embed=photos`
    const album = await fetchData(albumUrl)

    const container = document.getElementById('edit-album-page')

    const pageTitle = createElement('h1', '', 'Edit Album')
console.log(album);

    const uploadPhotoWrapper = createElement('div', 'col-12')
    const uploadPhotoLabel = createElement('label', 'form-label', 'Upload Photos')
    const uploadPhotoInput = createElement('input', 'form-control')
    uploadPhotoInput.type = 'text'
    uploadPhotoInput.id = 'upload'
    uploadPhotoLabel.for = 'upload'

    const uploadButton = createElement('button', 'my-2 btn btn-outline-secondary btn-sm', 'Upload')
    uploadButton.type = 'button'

    uploadPhotoWrapper.append(uploadPhotoLabel, uploadPhotoInput, uploadButton)

    uploadButton.addEventListener('click', (e) => {
        uploadPhoto(uploadPhotoInput.value, albumId, imagesWrapper)
        uploadPhotoInput.value = ''
    })


    const imagesWrapper = createElement('div', 'col-12 d-flex flex-wrap')
    album.photos.forEach(image => {
        imagesWrapper.append(createImageWrapper(image))
    })


    async function handleSubmit(updatedData) {
        const data = {
            title: updatedData.title,
        }
    
        const response = await fetch(albumUrl, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    
        if (response.ok) {
            toast({text: 'Album succesfuly updated.'})
        } else {
            toast({text: 'Something went wrong'})
        }
    }


    const titleWrapper = formInputItem('Title', 'title', 'text', album.title, true)

    container.append(pageTitle, form(handleSubmit, [titleWrapper, uploadPhotoWrapper, imagesWrapper]))
}
editAlbum()


function uploadPhoto(url, albumId, imagesWrapper) {
    if (url) {
        fetch(`${API_URL}/photos/`, {
            method: 'POST',
            body: JSON.stringify({
                albumId: Number(albumId),
                url
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => {
                if (res.ok) {
                    toast({text: 'Photo successfully posted'})
                } else {
                    toast({text: 'Failed to post the photo.'})
                }
                return res.json()
            })
            .then(newImg => {
                imagesWrapper.prepend(createImageWrapper(newImg))
            })
    } else {
        toast({text: 'Ender a valid link'})
    }

}


function deletePhoto(id) {
    fetch(`${API_URL}/photos/${id}`, {
        method: 'DELETE',
    })
        .then(res => {
            if (res.ok) {
                const deletePhoto = document.getElementById(id)
                deletePhoto.remove()
                toast({text: 'Photo successfully deleted.'})
            } else {
                toast({text: 'Failed to delete photo.'})
            }
        })
}


function createImageWrapper(image) {
    const imageWrapper = createElement('div', 'position-relative m-2')

    const img = createElement('img')
    img.src = image.thumbnailUrl ? image.thumbnailUrl : image.url
    imageWrapper.id = image.id
    img.style.width = '150px'

    const button = createElement('button', 'btn-close position-absolute top-0 start-0 m-1')
    button.type = 'button'

    button.addEventListener('click', (e) => {
        toast({text: 'Are you sure you want to delete this photo?', confirmation: {handler: deletePhoto, params: image.id}})
    })
    imageWrapper.append(img, button)

    return imageWrapper
}
