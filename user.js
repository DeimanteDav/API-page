import header from "./components/header.js";
import { API_URL } from "./config.js";
import { createElement, createListItem, fetchData, renderSinglePost } from "./functions.js";


async function userData() {
  const queryParams = document.location.search
  const urlParams = new URLSearchParams(queryParams)
  const userId = urlParams.get('userId')
  
  const userResponse = await fetchData(`${API_URL}/users/${userId}?_embed=posts&_embed=albums`)
  const user = await userResponse.json()

  // const albumResponse = await fetch(`${API_URL}/albums?userId=${userId}&_embed=photos`)
  // const albumData = await albumResponse.json()

  const userPage = document.querySelector('#user-page');
  const userName = createElement('h1', '', user.name)

  header()

  userPage.prepend(userName)
  userPage.append(renderUserData(user), renderPosts(user.posts))

    // const swiper = new Swiper('.swiper1', {
    //     // Optional parameters
    //     // direction: 'vertical',
    //     loop: true,
      
    //     // If we need pagination
    //     pagination: {
    //       el: '.swiper-pagination',
    //       type: "progressbar",
          
    //     },
    //     // Navigation arrows
    //     navigation: {
    //       nextEl: '.swiper-button-next',
    //       prevEl: '.swiper-button-prev',
    //     },
      
    //     // And if we need scrollbar
    //     // scrollbar: {
    //     //   el: '.swiper-scrollbar',
    //     // },
    //   })

    //   const swiper2 = new Swiper(".swiper2", {
    //     slidesPerView: 3,
    //     spaceBetween: 30,
    //     freeMode: true,
    //     pagination: {
    //       el: ".swiper-pagination",
    //       clickable: true,
    //     },
    //   });

    //   const progressCircle = document.querySelector(".autoplay-progress svg");
    //   const progressContent = document.querySelector(".autoplay-progress span");
    //   var swiper3 = new Swiper(".swiper3", {
    //     spaceBetween: 30,
    //     centeredSlides: true,
    //     autoplay: {
    //       delay: 2500,
    //       disableOnInteraction: false
    //     },
    //     pagination: {
    //       el: ".swiper-pagination",
    //       clickable: true
    //     },
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev"
    //     },
    //     on: {
    //       autoplayTimeLeft(s, time, progress) {
    //         progressCircle.style.setProperty("--progress", 1 - progress);
    //         progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    //       }
    //     }
    //   });

}
userData()


function renderUserData(user) {
  const userData = createElement('div')
  const userInfoList = createElement('ul', 'list-group list-group-flush mb-5');

  const userAddressListWrapper = createElement('div', 'mb-5')
  const userAddressList = createElement('ul', 'list-group')

  const nicknameItem = createListItem('Nickname', user.username);
  const emailItem = createListItem('Email', user.email);
  const phoneItem = createListItem('Phone', user.phone)
  const websiteItem = createListItem('Website', user.website)
  const companyItem = createListItem('Company', user.company.name)

  userInfoList.append(nicknameItem, emailItem, phoneItem, websiteItem, companyItem)


  const addressText = createElement('p', 'h4', 'Address')
  const streetItem = createListItem('Street', user.address.street)
  const cityItem = createListItem('City', user.address.city)
  const zipcodeItem = createListItem('Zipcode', user.address.zipcode)

  const coordinatesItem = createElement('li', 'list-group-item d-flex justify-content-between align-items-start')
  const coordinatesText = createElement('div', 'fw-bold', 'Coordinates')
  const coordinatesLink = createElement('a', 'ms-2 me-auto', 'Open')
  coordinatesLink.setAttribute('href', `https://www.google.com/maps/search/?api=1&query=${user.address.geo.lat},${user.address.geo.lng}` )
  coordinatesLink.setAttribute('target', '_blank')
  coordinatesItem.append(coordinatesText, coordinatesLink)

  userAddressList.append(streetItem, cityItem, zipcodeItem, coordinatesItem)
  userAddressListWrapper.append(addressText, userAddressList)

  userData.append(userInfoList, userAddressListWrapper)
    
  return userData
}




function renderPosts(posts) {
  const postsListWrapper = createElement('div', 'mb-5')
  const postsItem = createElement('p', 'h4', 'Posts')
  const postsInfo = createElement('p')
  const postsInfoText = createElement('small', '', 'Click on the post to read more')
  postsInfo.append(postsInfoText)

  const postsList = createElement('div', 'list-group');

  posts.forEach(post => {
    const postItem = createListItem('', post.title, `./post.html?postId=${post.id}`)

    postsList.append(postItem)

    // postListWrapper.append(renderSinglePost({
    //     post: post,
    //     titleUrl: true
    // }))
  });


  postsListWrapper.append(postsItem, postsInfo, postsList)
  return postsListWrapper
}



// function renderAlbum1(albums) {
//     let userAlbums = createElement('div');
    
//     // albums.forEach(album => {
//           let albumDiv = createElement('div');
//           albumDiv.classList.add('swiper', 'swiper1')

//           let sliderDiv = createElement('div');
//           sliderDiv.classList.add('swiper-wrapper')
  
//           let pagination = createElement('div');
//           pagination.classList.add('swiper-pagination')

//           let prevButton = createElement('div');
//           prevButton.classList.add('swiper-button-prev')
//           let nextButton = createElement('div');
//           nextButton.classList.add('swiper-button-next')
//           let scrollbar = createElement('div');
//           scrollbar.classList.add('swiper-scrollbar')

//           albums[0].photos.forEach(photo => {
//               let photosDiv = createElement('div');
//               photosDiv.classList.add('swiper-slide')
//               let image = createElement('img')
//               image.src = photo.url
//               photosDiv.append(image)
//               sliderDiv.append(photosDiv)
//           });
//           userAlbums.append(albumDiv)
//           albumDiv.append(sliderDiv, pagination, prevButton, nextButton, scrollbar)
//       // });
//       return userAlbums
//   }
  
//   function renderAlbum2(albums) {
//         let userAlbums = createElement('div');
      
//         let albumDiv = createElement('div');
//         albumDiv.classList.add('swiper', 'swiper2')

//         let sliderDiv = createElement('div');
//         sliderDiv.classList.add('swiper-wrapper')

//         let pagination = createElement('div');
//         pagination.classList.add('swiper-pagination')
//         let prevButton = createElement('div');
//         prevButton.classList.add('swiper-button-prev')
//         let nextButton = createElement('div');
//         nextButton.classList.add('swiper-button-next')

//         albums[2].photos.forEach(photo => {
//             let photosDiv = createElement('div');
//             photosDiv.classList.add('swiper-slide')
//             let image = createElement('img')
//             image.src = photo.url
//             photosDiv.append(image)
//             sliderDiv.append(photosDiv)
//         });
//         userAlbums.append(albumDiv)
//         albumDiv.append(sliderDiv, pagination)

//         return userAlbums
//     }
    
//     function renderAlbum3(albums) {
//         let userAlbums = createElement('div');

//         let albumDiv = createElement('div');
//         albumDiv.classList.add('swiper', 'swiper3')

//         let sliderDiv = createElement('div');
//         sliderDiv.classList.add('swiper-wrapper')

//         let pagination = createElement('div');
//         pagination.classList.add('swiper-pagination')
//         let prevButton = createElement('div');
//         prevButton.classList.add('swiper-button-prev')
//         let nextButton = createElement('div');
//         nextButton.classList.add('swiper-button-next')
    
//         let autoplay = createElement('div');
//         autoplay.classList.add('autoplay-progress')
//         let svg = createElement('svg');
//         svg.setAttribute('vievBox', '0 0 48 48')

//         let circle = createElement('circle');
//         circle.setAttribute('cx', 24)
//         circle.setAttribute('cy', 24)
//         circle.setAttribute('r', 20)

//         let spanElement = createElement('span');

//         svg.append(circle)
//         autoplay.append(svg, spanElement)

//         albums[3].photos.forEach(photo => {
//             let photosDiv = createElement('div');
//             photosDiv.classList.add('swiper-slide')
//             let image = createElement('img')
//             image.src = photo.url
//             photosDiv.append(image)
//             sliderDiv.append(photosDiv)
//         });

//         userAlbums.append(albumDiv)
//         albumDiv.append(sliderDiv, pagination, prevButton, nextButton, autoplay)

//         return userAlbums
//       }