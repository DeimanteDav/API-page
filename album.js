import header from "./components/header.js"
import { API_URL } from "./config.js"
import { createElement } from "./functions.js"


async function album() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    
    const albumId = urlParams.get('albumId')
    
    const albumResponse = await fetch(`${API_URL}/albums/${albumId}?_embed=photos`)
    const album = await albumResponse.json()

    
    const albumTitle = document.createElement('h2');
    albumTitle.textContent = `Album title: ${album.title}`
    console.log(album);

    const albumDiv = document.querySelector('.album');
    console.log(albumDiv);
    albumDiv.classList.add('swiper')

    const sliderDiv = createElement('div');
    sliderDiv.classList.add('swiper-wrapper')

    const pagination = createElement('div');
    pagination.classList.add('swiper-pagination')
    album.photos.forEach(photo => {

        const prevButton = createElement('div');
        prevButton.classList.add('swiper-button-prev')
        const nextButton = createElement('div');
        nextButton.classList.add('swiper-button-next')
        const scrollbar = createElement('div');
        scrollbar.classList.add('swiper-scrollbar')

        const photosDiv = createElement('div');
        photosDiv.classList.add('swiper-slide')
        const image = createElement('img')
        image.src = photo.url

        photosDiv.append(image)
        sliderDiv.append(photosDiv)

        albumDiv.append(sliderDiv,pagination, prevButton, nextButton, scrollbar)
        
        // const imageLink = createElement('a')
        // imageLink.href = photo.url
        // imageLink.dataset.pswpWidth = 500
        // imageLink.dataset.pswpHeight = 500
        // imageLink.target = '_blank'

        // const imageElement = createElement('img')

        // imageLink.append(imageElement)
        // albumDiv.append()
        // const imagesLink = document.createElement('a');
        // imagesLink.href = photo.url

        // const images = document.createElement('img');
        // images.src = photo.thumbnailUrl

        // imagesLink.target = '_blank'

        // imagesLink.append(images)
        // imagesDiv.append(imagesLink)
        
        // imagesDiv.before(albumTitle)
    })
    header()
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        // direction: 'vertical',
        loop: true,
      
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          type: "progressbar",
          
        },
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
        // And if we need scrollbar
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
      })

}
album()



