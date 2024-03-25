import form from "../components/form.js";
import formInputItem from "../components/formInputItem.js";
import toast from "../components/toast.js";
import { API_URL } from "../config.js";
import { createElement } from "../functions.js";

async function createAlbum() {
    const albumUrl = `${API_URL}/albums`

    const container = document.getElementById('create-album-page')

    const pageTitle = createElement('h1', '', 'Create Album')


    const uploadPhotoWrapper = createElement('div', 'col-12')
    const uploadPhotoLabel = createElement('label', 'form-label', 'Upload Photos')
    const uploadPhotoInput = createElement('input', 'form-control')
    uploadPhotoInput.type = 'text'
    uploadPhotoInput.id = 'upload'
    uploadPhotoLabel.for = 'upload'

    const uploadButton = createElement('button', 'my-2 btn btn-outline-secondary btn-sm', 'Upload')
    uploadButton.type = 'button'

    uploadPhotoWrapper.append(uploadPhotoLabel, uploadPhotoInput, uploadButton)

        
    const imagesWrapper = createElement('div', 'col-12 d-flex flex-wrap')
    const images = []

    uploadButton.addEventListener('click', (e) => {
        // uploadPhoto(uploadPhotoInput.value, albumId, imagesWrapper)
        images.push(uploadPhotoInput.value)

        imagesWrapper.prepend(createImageWrapper(uploadPhotoInput.value))
        uploadPhotoInput.value = ''
    })



    async function handleSubmit(updatedData) {
        const data = {
            title: updatedData.title,
            photos: [],
            body: updatedData.body,
        }
    
        const response = await fetch(albumUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const newAlbum = await response.json()
    
        if (response.ok) {
            images.forEach(async image => {
                const response = await fetch(`${API_URL}/photos/`, {
                    method: 'POST',
                    body: JSON.stringify({
                        albumId: Number(newAlbum.id),
                        url: image
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })

                if (response.ok) {
                    newAlbum.photos.push(await response.json())
                    console.log(newAlbum);
                    toast({text: 'Album succesfuly updated.'})
                }
            })
        } else {
            toast({text: 'Something went wrong'})
        }
    }

    const titleWrapper = formInputItem('Title', 'title', 'text', '', true)

    container.append(pageTitle, form(handleSubmit, [titleWrapper, uploadPhotoWrapper, imagesWrapper]))
}
createAlbum()



function deletePhoto(imageWrapper) {
    imageWrapper.remove()
}

function createImageWrapper(url) {
    const imageWrapper = createElement('div', 'position-relative m-2')

    const img = createElement('img')
    img.src = url
    img.style.width = '150px'

    const button = createElement('button', 'btn-close position-absolute top-0 start-0 m-1')
    button.type = 'button'

    button.addEventListener('click', (e) => {
        toast({text: 'Are you sure you want to delete this photo?', confirmation: {handler: deletePhoto, params: imageWrapper}})
    })

    imageWrapper.append(img, button)

    return imageWrapper
}
