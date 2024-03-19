import form from "../components/form.js"
import toast from "../components/toast.js"
import { API_URL } from "../config.js"
import { fetchData } from "../functions.js"

async function editUser() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const userId = urlParams.get('userId')

    const userUrl = `${API_URL}/users/${userId}`
    const user = await fetchData(userUrl)

    const container = document.getElementById('edit-user-page')
    const {name, username, email, phone, website, company, address} = user

    const {street, city, zipcode} = address

    const formData = [
        {value: name, label: 'Name', id: 'name', type: 'text'},
        {value: username, label: 'Nickname', id: 'username', type: 'text'},
        {value: email, label: 'Email', id: 'email', type: 'email'},
        {value: phone, label: 'Phone', id: 'phone', type: 'tel'},
        {value: company.name, label: 'Company', id: 'company', type: 'text'},
        {value: website, label: 'Website', id: 'website', type: 'text'},
        {value: street, label: 'Street', id: 'street', type: 'text'},
        {value: city, label: 'City', id: 'city', type: 'text'},
        {value: zipcode, label: 'Zipcode', id: 'zipcode', type: 'text'},
    ]

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
            toast('User succesfuly updated.')
        } else {
            toast('Something went wrong')
        }
    }

    container.append(form('User', handleSubmit, formData))
}
editUser()