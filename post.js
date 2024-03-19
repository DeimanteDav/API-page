import { API_URL } from "./config.js";
import header from "./components/header.js";
import { createElement, createListItem, fetchData} from "./functions.js";
import buttonGroup from "./components/buttonGroup.js";

async function postData() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const postId = urlParams.get('postId')

    const post = await fetchData(`${API_URL}/posts/${postId}?_embed=comments&_expand=user`)

    const postDiv = document.querySelector('#post');
    const title = createElement('h1', '', post.title)

    const postInfoList = createElement('ul', 'list-group list-group-flush mb-5');
    const authorItem = createListItem('Author', post.user.name)

    const paragraphItem = createElement('li', 'py-3 list-group-item d-flex justify-content-between align-items-start')

    const paragraphText = createElement('div', 'fw-bold', 'Paragraph')
    const paragraphBody = createElement('div', 'me-auto', post.body)
    paragraphBody.prepend(paragraphText)
    paragraphItem.append(paragraphBody)

    postInfoList.append(authorItem, paragraphItem)

    const commentsWrapper = createElement('div', 'my-5')
    const commentsList = createElement('ul', 'list-group list-group-flush');
    const commentsText = createElement('p', 'h4', 'Comments')

    commentsWrapper.append(commentsText, commentsList)

    post.comments.forEach(comment => {
        const commentItem = createElement('li', 'py-3 list-group-item d-flex justify-content-between align-items-start')
        const commentTitle = createElement('div', 'fw-bold', comment.name)
        const commentContent = createElement('div', 'ms-2 me-auto', comment.body)
        const email = createElement('div', 'mb-4', `Email: ${comment.email}`)
        commentItem.id = `comment-${comment.id}`
        commentContent.prepend(commentTitle, email)
        commentItem.append(commentContent)
        commentsList.append(commentItem)
    })

    postDiv.append(title, postInfoList, buttonGroup('Are you sure you want to delete this Post?', './post/editPost.html?postId=1'), commentsWrapper)

    header()
}
postData()

