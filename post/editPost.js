import form from "../components/form.js";
import postFormItems from "../components/postFormItems.js";
import postInfoList from "../components/postInfoList.js";
import toast from "../components/toast.js";
import { API_URL } from "../config.js";
import { createElement, fetchData } from "../functions.js";

async function editPost() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const postId = urlParams.get('postId')

    const postUrl = `${API_URL}/posts/${postId}?_expand=user`
    const container = document.getElementById('edit-post-page')
    
    const post = await fetchData(postUrl)
    const users = await fetchData(`${API_URL}/users`)
    
    const pageTitle = createElement('h1', '', 'Edit Post')

    async function handleSubmit(updatedData) {
        const data = {
            title: updatedData.title,
            userId: updatedData.user,
            body: updatedData.paragraph,
        }

        const response = await fetch(postUrl, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        if (response.ok) {
            const editedPost = await response.json()
            const user = await fetchData(`${API_URL}/users/${editedPost.userId}`)

            editedPost.user = user

            const editedPostWrapper = createElement('div', 'my-5')
            const infoElement = createElement('p', '', 'Post would look like this')
            const editedTitle = createElement('h2', '', editedPost.title)

            editedPostWrapper.append(infoElement, editedTitle, postInfoList(editedPost, true))
            container.append(editedPostWrapper)


            toast({text: 'Post succesfuly updated.'})
        } else {
            toast({text: 'Something went wrong'})
        }
    }


    container.append(pageTitle, form(handleSubmit, postFormItems(users, post.userId, post.title, post.body)))
}
editPost()