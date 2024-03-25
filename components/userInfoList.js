import { createElement, createListItem } from "../functions.js";

export default function userInfoList(user) {
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
  
    userAddressList.append(streetItem, cityItem, zipcodeItem)
  
    if (address.geo) {
      const coordinatesItem = createElement('li', 'list-group-item d-flex justify-content-between align-items-start')
      const coordinatesText = createElement('div', 'fw-bold', 'Coordinates')
      const coordinatesLink = createElement('a', 'ms-2 me-auto', 'Open')
      coordinatesLink.setAttribute('href', `https://www.google.com/maps/search/?api=1&query=${address.geo.lat},${address.geo.lng}` )
      coordinatesLink.setAttribute('target', '_blank')
      coordinatesItem.append(coordinatesText, coordinatesLink)
  
      userAddressList.append(coordinatesItem)
    }
  
    userAddressListWrapper.append(addressText, userAddressList)
  
    userData.append(userInfoList, userAddressListWrapper)
      
    return userData
}