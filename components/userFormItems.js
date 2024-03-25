import formInputItem from "./formInputItem.js"

export default function userFormItems(name, username, email, phone, website, company, city, street, zipcode) {
    const nameElement = formInputItem('Name', 'name', 'text', name, true)
    const nicknameElement = formInputItem('Nickname', 'username', 'text', username, true)
    const emailElement = formInputItem('Email', 'email', 'email', email, true)
    const phoneElement = formInputItem('Phone', 'phone', 'tel', phone , true)
    const companyElement = formInputItem('Company', 'company', 'text', company)
    const websiteElement = formInputItem('Website', 'website', 'text', website)


    const cityElement = formInputItem('City', 'city', 'text', city)
    const streetElement = formInputItem('Street', 'street', 'text', street)
    const zipcodeElement = formInputItem('Zipcode', 'zipcode', 'text', zipcode)


    return [nameElement, nicknameElement, emailElement, phoneElement, companyElement, websiteElement, cityElement, streetElement, zipcodeElement]
}