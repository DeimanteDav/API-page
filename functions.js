import { MENU_ITEMS } from "./config.js";

export const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function renderComments(comments) {
    const postComment = document.createElement('div');
    postComment.textContent = 'Comments:'

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.id = `comment-${comment.id}`
        const commentTitle = document.createElement('p');
        const commentBody = document.createElement('p');
        const commentMail = document.createElement('p');

        commentTitle.textContent = `Title: ${comment.name}`
        commentBody.textContent = `Content: ${comment.body}`
        commentMail.textContent = `Email: ${comment.email}`
        commentDiv.append(commentTitle, commentBody, commentMail)
        postComment.append(commentDiv)
    });

    return postComment
}

export function renderSinglePost(params) {
    const {post, user, showBody, comments, showReadMore, titleUrl} = params

    const postItem = document.createElement('div');
    postItem.classList.add('post-item')

    const postTitle = document.createElement('h2');
    postTitle.textContent = `Title: ${post.title}`
    
    postItem.append(postTitle)
    
    if (titleUrl) {
        postTitle.innerHTML = `<a href="./post.html?postId=${post.id}">${post.title}</a>`
    }

    if (user) {
        const author = document.createElement('span');
        author.innerHTML = `Author: <a href="./user.html?userId=${user.id}">${user.name}</a>`
        postItem.append(author)
    }

    if (showBody) {
        const postBody = document.createElement('p');
        postBody.textContent = `Paragraph: ${post.body}`
        
        postItem.append(postBody)
    }

    if (comments) {
        postItem.append(renderComments(comments))
    }

    if (showReadMore) {
        const readMoreLink = document.createElement('a');
        readMoreLink.href = `./post.html?postId=${post.id}`
        readMoreLink.textContent = 'Read more'
        postItem.append(readMoreLink)
    }
    return postItem
}


export function navigation() {
    const div = createElement('div', 'collapse navbar-collapse')
    const list = createElement('ul', 'navbar-nav me-auto mb-2 mb-lg-0')
    div.append(list)
    MENU_ITEMS.forEach(item => {
        const listItem = createElement('li', 'nav-item');
        const link = createElement('a', 'nav-link');
        link.setAttribute('href', item.url)
        link.textContent = item.title

        listItem.append(link)
        checkPage(link)

        list.append(listItem)
    });
    if (!window.location.pathname.includes('search.html')) {
        div.append(search())
    }
    return div.innerHTML
}

function checkPage(element) {
    const filename = window.location.pathname

    if (filename == element.pathname) {
        element.style.color = 'red'
    }
}

function search() {
    const form = createElement('form', 'd-flex')
    form.setAttribute('action', './search.html')
    form.setAttribute('role', 'search')

    const input = createElement('input', 'form-control me-2')
    input.classList.add('search-input')
    input.setAttribute('name', 'search')
    input.setAttribute('type', 'search')

    const button = createElement('button', 'btn btn-outline-success')
    button.setAttribute('type', 'submit')
    button.textContent = 'Search'

    input.addEventListener('input', function (e) {
        if (input.value) {
            button.removeAttribute('disabled')
        } else {
            button.setAttribute('disabled', true)
        }
    });

    form.append(input, button)

    return form
}


export function createElement(type = 'div', classNames, text) {
    const element = document.createElement(type)

    if (classNames) {
      element.className = classNames
    }
  
    if (text) {
      element.textContent = text
    }
  
    return element
}

export function createCardElement(params) {
    const {title, subtitle, text, link, anotherLink} = params
    // console.log(params);
    if (title) {
        const card = createElement('div', 'card my-4')
        const cardBody = createElement('div', 'card-body')
        card.append(cardBody)

        const cardTitle = createElement('h5', 'card-title', title)
        cardBody.append(cardTitle)

        if (subtitle) {
            const cardSubtitle = createElement('h6', 'card-subtitle mb-2 text-body-secondary', subtitle)
            cardBody.append(cardSubtitle)
        }

        if (text) {
            const cardText = createElement('p', 'card-text', text)
            cardBody.append(cardText)
        }
    
        
        if (link) {
            const {text, href} = link
            const cardLink = createElement('a', 'card-link', text)
            cardLink.setAttribute('href', href)
            cardBody.append(cardLink)
        }
        if (anotherLink) {
            const {text, href} = anotherLink
            const cardLink2 = createElement('a', 'card-link', text)
            cardLink2.setAttribute('href', href)
            cardBody.append(cardLink2)
        }

        return card
    }
}

export function createListItem(title, text, href) {
    if (title) {
        const listItemEl = createElement('li', 'list-group-item d-flex justify-content-between align-items-start')
        const titleEl = createElement('div', 'fw-bold', title)
        const textEl = createElement('div', 'ms-2 me-auto', text)
        
        listItemEl.append(titleEl, textEl)
    
        return listItemEl
    } else if (href) {
        const linkItem = createElement('a', 'list-group-item list-group-item-action', text)
        linkItem.setAttribute('href', href)
    
        return linkItem
    } else {
        return createElement('li', 'list-group-item', text)
    }
}

export function createCardElementImg(params) {
    const {image, title, subtitle, text, link} = params 

    if (image && title){
        const card = createElement('div', 'card my-4')
        const row = createElement('div', 'row p-4')
    
        const thumbnailDiv = createElement('div', 'col-auto')
        const thumbnailImg = createElement('img', 'img-fluid rounded')
        thumbnailImg.src = image
        thumbnailDiv.append(thumbnailImg)
    
        const dataDiv = createElement('div', 'col')
        const titleEl = createElement('h5', 'card-title', `${title}`)
        
        dataDiv.append(titleEl)

        if (subtitle) {
            const subtitleEl = createElement('h6', 'card-subtitle mb-2 text-body-secondary', subtitle)
            dataDiv.append(subtitleEl)
        }

        if (text) {
            const textEl = createElement('p', 'card-text', text)
            dataDiv.append(textEl)
        }

        if (link) {
            const {text, href} = link
            const linkEl = createElement('a', 'card-link', text)
            linkEl.href = href
            dataDiv.append(linkEl)
        }

        row.append(thumbnailDiv, dataDiv)
        card.append(row)

        return card
    }
}

export function renderAlbumCard(album, i){
    console.log(album);
   
}

export function renderUserCard(user) {
    const userData = {
        title: user.name,
        subtitle: `Amount of posts: ${user.posts.length}`,
        link: {
            text: `Go to user's page`,
            href: `./user.html?userId=${user.id}`
        }
    }

    return createCardElement(userData)
}

export function renderPostCard(post) {
    const postData = {
        title: post.title,
        subtitle: `Author: ${post.user.name}`,
        text: post.body,
        link: {
            text: `Go to author's page`,
            href: `./user.html?userId=${post.user.id}`
        },
        anotherLink: {
            text: `Read more`,
            href: `./post.html?postId=${post.id}`
        }
    }

    return createCardElement(postData)
}

