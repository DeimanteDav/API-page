import { API_URL, MENU_ITEMS } from "./config.js";

export const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
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
      element.value = text
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
            href: `./user.html?user-id=${user.id}`
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
            href: `./user.html?user-id=${post.user.id}`
        },
        anotherLink: {
            text: `Read more`,
            href: `./post.html?post-id=${post.id}`
        }
    }

    return createCardElement(postData)
}


export function renderAuthorItem(name, userId, editForm, container, position, list) {
    let authorItem

    if (list) {
        authorItem = createListItem('Author', name)
    } else {
        authorItem = createElement('div', 'p-2 d-flex justify-content-between align-items-start')

        const authorText = createElement('div', 'fw-bold mx-2', 'Author')
        const author = createElement('div', 'ms-2 me-auto', name)

        authorItem.append(authorText, author)
    }

    const editAuthorBtn = createElement('button', 'btn btn-secondary btn-sm', 'Edit')
    authorItem.append(editAuthorBtn)

    editAuthorBtn.addEventListener('click', async (e) => {
        e.preventDefault()
        const form = createElement('form', 'd-flex justify-content-between align-items-start input-group p-2')

        authorItem.remove()

        const users = await fetchData(`${API_URL}/users`)
        const select = createElement('select' ,'form-select')
        
        users.forEach(user => {
            const option = createElement('option', '', user.name)
            option.value = user.id

            if (user.id === userId) {
                option.selected = true
            }

            select.append(option)
        })
        
        const userBtn = createElement('button', 'btn btn-outline-secondary', 'Save')
        userBtn.type = 'submit'
        
        form.append(select, userBtn)

        if (position === 'after') {
            container.after(form)
        } else {
            container.prepend(form)
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            const selectedUserId = select.value
            editForm(form, selectedUserId)
        })
    })

    return authorItem
}
