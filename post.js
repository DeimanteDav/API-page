import { API_URL } from "./config.js";
import header from "./components/header.js";
import { createElement, fetchData} from "./functions.js";
import buttonGroup from "./components/buttonGroup.js";
import toast from "./components/toast.js";
import postInfoList from "./components/postInfoList.js";

async function postData() {
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    const postId = urlParams.get('post-id')

    const post = await fetchData(`${API_URL}/posts/${postId}?_embed=comments&_expand=user`)

    const container = document.getElementById('post-page')
    const postDiv = createElement('div');
    const title = createElement('h1', '', post.title)

    const postInfoWrapper = postInfoList(post)
    
    const commentsWrapper = createElement('div', 'my-5')
    const commentsText = createElement('p', 'h4', 'Comments')

    const postCommentBtn = createElement('button', 'btn btn-sm btn-primary m-2', 'Post')
    postCommentBtn.type = 'submit'

    const commentForm = renderCommentForm(postComment, postCommentBtn)

    async function postComment(name, email, body) {
        const response = await fetch(`${API_URL}/comments/`, {
            method: 'POST',
            body: JSON.stringify({
                postId: Number(postId),
                name,
                email,
                body
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        const newComment = await response.json()

        if (response.ok) {
            commentsList.prepend(renderCommentItem(newComment, editComment))   
            post.comments.unshift(newComment)
            toast({text: 'Comment posted successfully'})
        }
    }

 
    const commentsList = createElement('ul', 'list-group list-group-flush');

    async function editComment(name, email, body, id, commentItem) {
        const buttonsWrapper = createElement('div', 'col-12 mt-5')
        const submitBtn = createElement('button', 'btn btn-primary mx-2 btn-sm', 'Save') 
        submitBtn.type = 'submit'    
        const cancelBtn = createElement('button', 'btn btn-secondary mx-2 btn-sm', 'Cancel')
        cancelBtn.type = 'button'
        buttonsWrapper.append(cancelBtn, submitBtn)
        

        const editForm = renderCommentForm(postComment, buttonsWrapper)

        commentItem.after(editForm); 
        commentItem.remove()

        const nameElement = editForm.name
        nameElement.value = name
        const emailElement = editForm.email
        emailElement.value = email
        const bodyElement = editForm.body
        bodyElement.value = body
        
        cancelBtn.addEventListener('click', (e) => {
            const sameCommentItem = renderCommentItem({name, email, body}, editComment)

            editForm.after(sameCommentItem)
            editForm.remove()
        })

        submitBtn.addEventListener('click', async (e) => {
            e.preventDefault()
            const editedComment = {
                postId: Number(postId),
                name: nameElement.value,
                email: emailElement.value,
                body: bodyElement.value
            }

            const response = await fetch(`${API_URL}/comments/${id}`, {
                method: 'PUT',
                body: JSON.stringify(editedComment),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                
            if (response.ok) {
                const editedComment = await response.json()

                const updatedCommentItem = renderCommentItem(editedComment, editComment)

                editForm.after(updatedCommentItem)
                editForm.remove()

                toast({text: 'Comment updated successfully'})
            } else if (response.status === 500) {
                const updatedCommentItem = renderCommentItem(editedComment, editComment)

                editForm.after(updatedCommentItem)
                editForm.remove()

                toast({text: 'Comment updated successfully'})
            }

        })
    }

    post.comments.forEach(comment => {
        commentsList.append(renderCommentItem(comment, editComment))
    })


    function deletePost() {
        fetch(`${API_URL}/posts/${postId}`, {
            method: 'DELETE',
        });

        history.back()
    }

    const buttons = buttonGroup({
        deleteInfo: {
            text: 'Are you sure you want to delete this Post?',
            handler: deletePost
        },
        editHref: `./post/edit-post.html?post-id=${postId}`
    })
    
    commentsWrapper.append(commentsText, commentForm, commentsList)

    container.append(title, postDiv)
    postDiv.append(title, postInfoWrapper, buttons, commentsWrapper)

    header()
}
postData()


function renderCommentForm(handleSubmit, buttons) {
    const commentForm = createElement('form', 'p-4')

    const nameInput = createElement('input', 'form-control')
    nameInput.placeholder = 'Name'
    nameInput.name = 'name'
    const emailInput = createElement('input', 'form-control my-2')
    emailInput.placeholder = 'Email'
    emailInput.type = 'email'
    emailInput.name = 'email'
    const bodyInput = createElement('textarea', 'form-control my-2')
    bodyInput.placeholder = 'Content'
    bodyInput.name = 'body'
    
    commentForm.append(nameInput, emailInput, bodyInput, buttons)

    console.log(commentForm);
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault()

        handleSubmit(nameInput.value, emailInput.value, bodyInput.value)

        nameInput.value = ''
        emailInput.value = ''
        bodyInput.value = ''
    })

    return commentForm
}


function renderCommentItem(comment, handleSubmit) {
    console.log(comment);
    const commentItem = createElement('li', 'py-3 list-group-item d-flex flex-column justify-content-between align-items-start')
    commentItem.id = `comment-${comment.id}`

    const nameElement = createElement('div', 'fw-bold', comment.name)
    const emailElement = createElement('div', 'mb-3', `Email: ${comment.email}`)
    const commentBody = createElement('div', 'ms-2 me-auto', comment.body)
    commentItem.id = `comment-${comment.id}`
    commentBody.prepend(nameElement, emailElement)


    const buttons = buttonGroup({
        deleteInfo:{
            text: `Are you sure you want to delte ${comment.name} comment?`,
            handler: deleteComment
        },
        editInfo: {
            handler: handleSubmit,
            params: [comment.name, comment.email, comment.body, comment.id, commentItem]
        }
    })



    async function deleteComment() {
        const response = await fetch(`${API_URL}/comments/${comment.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.getElementById(`comment-${comment.id}`).remove()
        }
    }
        
    commentItem.append(commentBody, buttons)

    return commentItem
}
