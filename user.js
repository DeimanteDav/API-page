import buttonGroup from "./components/buttonGroup.js";
import header from "./components/header.js";
import { API_URL } from "./config.js";
import { createElement, createListItem, fetchData } from "./functions.js";


async function userData() {
  const queryParams = document.location.search
  const urlParams = new URLSearchParams(queryParams)
  const userId = urlParams.get('userId')
  
  const user = await fetchData(`${API_URL}/users/${userId}?_embed=posts&_embed=albums`)

  const userPage = document.querySelector('#user-page');
  const userName = createElement('h1', '', user.name)

  
  userPage.append(userName, renderUserData(user), buttonGroup(`Are you sure you want to delete ${user.name}?`, `./user/editUser.html?userId=${userId}`), renderPosts(user.posts))
  header()
}
userData()


function renderUserData(user) {
  const userData = createElement('div')
  const userInfoList = createElement('ul', 'list-group list-group-flush mb-5');

  const userAddressListWrapper = createElement('div', 'mb-5')
  const userAddressList = createElement('ul', 'list-group')

  const {username, email, phone, website, company, address} = user

  const nicknameItem = createListItem('Nickname', username);
  const emailItem = createListItem('Email', email);
  const phoneItem = createListItem('Phone', phone)
  const websiteItem = createListItem('Website', website)
  const companyItem = createListItem('Company', company.name)

  userInfoList.append(nicknameItem, emailItem, phoneItem, websiteItem, companyItem)

  const {street, city, zipcode} = address

  const addressText = createElement('p', 'h4', 'Address')
  const streetItem = createListItem('Street', street)
  const cityItem = createListItem('City', city)
  const zipcodeItem = createListItem('Zipcode', zipcode)

  const coordinatesItem = createElement('li', 'list-group-item d-flex justify-content-between align-items-start')
  const coordinatesText = createElement('div', 'fw-bold', 'Coordinates')
  const coordinatesLink = createElement('a', 'ms-2 me-auto', 'Open')
  coordinatesLink.setAttribute('href', `https://www.google.com/maps/search/?api=1&query=${address.geo.lat},${address.geo.lng}` )
  coordinatesLink.setAttribute('target', '_blank')
  coordinatesItem.append(coordinatesText, coordinatesLink)

  userAddressList.append(streetItem, cityItem, zipcodeItem, coordinatesItem)
  userAddressListWrapper.append(addressText, userAddressList)

  userData.append(userInfoList, userAddressListWrapper)
    
  return userData
}


function renderPosts(posts) {
  const postsListWrapper = createElement('div', 'my-5')
  const postsItem = createElement('p', 'h4', 'Posts')
  const postsInfo = createElement('p')
  const postsInfoText = createElement('small', '', 'Click on the post to read more')
  postsInfo.append(postsInfoText)

  const postsList = createElement('div', 'list-group');

  posts.forEach(post => {
    const postItem = createListItem('', post.title, `./post.html?postId=${post.id}`)

    postsList.append(postItem)
  });


  postsListWrapper.append(postsItem, postsInfo, postsList)
  return postsListWrapper
}
