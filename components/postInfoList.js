import { API_URL } from "../config.js";
import { createElement, createListItem, fetchData, renderAuthorItem } from "../functions.js";
import toast from "./toast.js";

export default function postInfoList(post, noEdit) {
    const postInfoList = createElement('ul', 'list-group list-group-flush mb-5');

    let authorItem
    if (noEdit) {
        authorItem = createListItem('Author', post.user.name) 
    } else {
        authorItem = renderAuthorItem(post.user.name, Number(post.user.id), editAuthor, postInfoList, '', true)
    }

    const paragraphItem = createElement('li', 'py-3 list-group-item d-flex justify-content-between align-items-start')

    const paragraphText = createElement('div', 'fw-bold', 'Paragraph')
    const paragraphBody = createElement('div', 'me-auto', post.body)
    paragraphBody.prepend(paragraphText)
    paragraphItem.append(paragraphBody)

    postInfoList.append(authorItem, paragraphItem)

    async function editAuthor(form, userId) {
        const response = await fetch(`${API_URL}/posts/${post.id}?_expand=user`, {
            method: 'PATCH',
            body: JSON.stringify({
                userId
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        if (response.ok) {
            const user = await fetchData(`${API_URL}/users/${userId}`)

            form.remove()
        
            postInfoList.prepend(renderAuthorItem(user.name, Number(user.id), editAuthor, postInfoList, '', true))

            toast({text: 'User changed successfully'})
        }
    }

    return postInfoList
}

