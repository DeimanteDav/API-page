import form from "../components/form.js";
import header from "../components/header.js";
import toast from "../components/toast.js";
import { API_URL } from "../config.js";
import { createElement, fetchData } from "../functions.js";

async function editPost() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const postId = urlParams.get('postId')

    const postUrl = `${API_URL}/posts/${postId}`
    const post = await fetchData(postUrl)

    const container = document.getElementById('edit-post-page')


    async function handleSubmit(updatedData) {
        const data = {
            title: updatedData.title,
            body: updatedData.body,
        }

        const response = await fetch(postUrl, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        if (response.ok) {
            toast('Post succesfuly updated.')
        } else {
            toast('Something went wrong')
        }
    }

    const formData = [
        {value: post.title, label: 'Title', type: 'text', id: 'title'},
        {value: post.body, label: 'Paragraph', id: 'body', textarea: true}
    ]

    container.append(form('Post', handleSubmit, formData))
}
editPost()