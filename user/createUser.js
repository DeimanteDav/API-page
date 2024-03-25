import form from "../components/form.js";
import toast from "../components/toast.js"
import userInfoList from "../components/userInfoList.js";
import userFormItems from "../components/userFormItems.js";
import { API_URL } from "../config.js"
import { createElement } from "../functions.js";

async function editUser() {
    const userUrl = `${API_URL}/users`

    const container = document.getElementById('create-user-page')

    const pageTitle = createElement('h1', '', 'Create User')


    async function handleSubmit(data) {
        const newData = {
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            website: data.website,
            company: {name: data.company},
            address: {
                street: data.street,
                city: data.city,
                zipcode: data.zipcode
            }
        }

        const response = await fetch(userUrl, {
            method: 'POST',
            body: JSON.stringify(newData),
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

            toast({text: 'User succesfuly uploaded.'})
        } else {
            toast({text: 'Something went wrong'})
        }
    }

    container.append(pageTitle, form(handleSubmit, userFormItems()))
}
editUser()