import form from "../components/form.js"
import postFormItems from "../components/postFormItems.js"
import postInfoList from "../components/postInfoList.js"
import toast from "../components/toast.js"
import { API_URL } from "../config.js"
import { createElement, fetchData } from "../functions.js"

async function createPost() {
    const container = document.getElementById('create-post-page')
    const postUrl = `${API_URL}/posts`

    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const userId = urlParams.get('user-id')

    const users = await fetchData(`${API_URL}/users`)
    const pageTitle = createElement('h1', '', 'Write Post')

    async function handleSubmit(data) {
        const newData = {
            title: data.title,
            userId: data.user,
            body: data.paragraph,
        }

        const response = await fetch(postUrl, {
            method: 'POST',
            body: JSON.stringify(newData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        if (response.ok) {
            const newPost = await response.json()
            const user = await fetchData(`${API_URL}/users/${newPost.userId}`)

            newPost.user = user

            const newPostWrapper = createElement('div', 'my-5')
            const infoElement = createElement('p', '', 'Post would look like this')
            const editedTitle = createElement('h2', '', newPost.title)

            newPostWrapper.append(infoElement, editedTitle, postInfoList(newPost, true))

            container.append(newPostWrapper)

            toast({text: 'Post succesfuly uploaded.'})
        } else {
            toast({text: 'Something went wrong'})
        }
    }

    container.append(pageTitle, form(handleSubmit, postFormItems(users, userId)))
}

createPost()