import form from "../components/form.js";
import toast from "../components/toast.js"
import userInfoList from "../components/userInfoList.js";
import userFormItems from "../components/userFormItems.js";
import { API_URL } from "../config.js"
import { createElement, fetchData } from "../functions.js"

async function editUser() {
    console.log('edit');
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const userId = urlParams.get('userId')

    const userUrl = `${API_URL}/users/${userId}`
    const user = await fetchData(userUrl)

    const container = document.getElementById('edit-user-page')
    const pageTitle = createElement('h1', '', 'Edit User')

    const {name, username, email, phone, website, company, address} = user
    const {city, street, zipcode} = address

    const formElements = userFormItems(name, username, email, phone, website, company.name, city, street, zipcode)


    async function handleSubmit(updatedData) {
        const data = {
            name: updatedData.name,
            username: updatedData.username,
            email: updatedData.email,
            phone: updatedData.phone,
            website: updatedData.website,
            company: {name: updatedData.company},
            address: {
                street: updatedData.street,
                city: updatedData.city,
                zipcode: updatedData.zipcode
            }
        }

        const response = await fetch(userUrl, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        if (response.ok) {
            const editedUser = await response.json()

            const editedUserWrapper = createElement('div', 'my-5')
            const infoElement = createElement('p', '', 'User would look like this')
            const editedName = createElement('h2', '', editedUser.name)

            editedUserWrapper.append(infoElement, editedName, userInfoList(editedUser))
            container.append(editedUserWrapper)

            toast({text: 'User succesfuly updated.'})
        } else {
            toast({text: 'Something went wrong'})
        }
    }

    container.append(pageTitle, form(handleSubmit, formElements))
}
editUser()