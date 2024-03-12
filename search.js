import { fetchData, renderSinglePost } from "./functions.js";
import { API_URL } from "./config.js";
import header from "./components/header.js";

function search() {
    header()
    let queryParams = document.location.search
    let urlParams = new URLSearchParams(queryParams)
    
    let search = urlParams.get('search')
    
    if (!search) {
        return
    }
    searchPosts(search)
    searchAlbums(search)
    searchUsers(search)
    searchComments(search)
    searchPhotos(search)

}  
search()


async function searchByCategory() {
    let category = document.querySelector('#category');
    let input = document.querySelector('#search-input');
    let form = document.querySelector('#search-form');
console.log(input.value);

    form.addEventListener('submit', async function (e) {
        e.preventDefault()

        if (document.querySelectorAll('.div')) {
            Array.from(document.querySelectorAll('.div')).map(element => {
                element.remove()
            })
        }

        if (input.value != '') {
            if (category.value == 'albums') {
                searchAlbums(input.value)
            }
            if (category.value == 'users') {
                searchUsers(input.value)
            }
            if (category.value == 'posts') {
                searchPosts(input.value)
            }
            if (category.value == 'comments') {
                searchComments(input.value)
            }
            if (category.value == 'photos') {
                searchPhotos(input.value)
            }
        }
    });
}
searchByCategory()


async function searchAlbums(search) {
    let albums = await fetchData(`${API_URL}/albums?_embed=photos&q=${search}`)

    
    let div = document.createElement('div');
    div.classList.add('div')
    let h2 = document.createElement('h2');
    
    if (albums.length == 0) {
        h2.textContent = `No albums found`
    } else if (albums.length == 1) {
        h2.textContent = `Found ${albums.length} album`
    } else {
        h2.textContent = `Found ${albums.length} albums`
    }
    div.append(h2)
    document.body.append(div)

    albums.forEach(album => {
        let title = document.createElement('h2');
        title.innerHTML = `<a href="./photos.html?albumId=${album.id}">Title: ${album.title}</a>`
        
        // let author = document.createElement('p');
        // author.textContent = `Name: ${album.user.name}`
        
        let photos = document.createElement('p');
        photos.textContent = `Amount of photos: ${album.photos.length}`

        let singlePhoto = document.createElement('img');
        singlePhoto.src = album.photos[0].url
        
        div.append(title, photos, singlePhoto)
    });
    return div
}


async function searchUsers(search) {
    let users = await fetchData(`${API_URL}/users?&q=${search}`)

    let h2 = document.createElement('h2');
    if (users.length == 0) {
        h2.textContent = `No users found`
    } else if (users.length == 1) {
        h2.textContent = `Found ${users.length} user`
    } else {
        h2.textContent = `Found ${users.length} users`
    }
    
    let div = document.createElement('div');
    div.classList.add('div')
    div.append(h2)
    document.body.append(div)


    users.forEach(user => {
        console.log(user);
        let author = document.createElement('h2');
        author.innerHTML = `<a href="./user.html?userId=${user.id}">Author: ${user.name}</a>`

        // let posts = document.createElement('p');
        // posts.textContent = `Amount of posts: ${user.posts.length}`
        div.append(author)
    })
    return div
}

async function searchPosts(search) { 
    let posts = await fetchData(`${API_URL}/posts?q=${search}`)
    
    let h2 = document.createElement('h2');
    
    if (posts.length == 0) {
        h2.textContent = `No posts found`
    } else if (posts.length == 1) {
        h2.textContent = `Found ${posts.length} post`
    } else {
        h2.textContent = `Found ${posts.length} posts`
    }

    let div = document.createElement('div');
    div.classList.add('div')
    div.append(h2)
    document.body.append(div)

    posts.forEach(post => {
        div.append(renderSinglePost({
            post, 
            showBody: true,
            showReadMore: true,
        }))
    })
    return div
}


async function searchComments(search) {
    let comments = await fetchData(`${API_URL}/comments?q=${search}`)
    
    let h2 = document.createElement('h2');
    
    if (comments.length == 0) {
        h2.textContent = `No comments found`
    } else if (comments.length == 1) {
        h2.textContent = `Found ${comments.length} comment`
    } else {
        h2.textContent = `Found ${comments.length} comments`
    }
console.log(comments);
    let div = document.createElement('div');
    div.classList.add('div')
    div.append(h2)
    document.body.append(div)

    comments.forEach(comment => {
        let title = document.createElement('h2');
        title.innerHTML = `<a href='./post.html#comment-${comment.id}?postId=${comment.postId}'>Title: ${comment.name}</a>`

        let content = document.createElement('p');
        content.textContent = `Content: ${comment.body}`

        let email = document.createElement('p');
        email.textContent = `Email: ${comment.email}`
        div.append(title, content, email)
    });
  
    return div
}


async function searchPhotos(search) {
    let photos = await fetchData(`${API_URL}/photos?&q=${search}&_limit=50`)
    let h2 = document.createElement('h2');
    
    if (photos.length == 0) {
        h2.textContent = `No photos found`
    } else if (photos.length == 1) {
        h2.textContent = `Found ${photos.length} photo`
    } else {
        h2.textContent = `Found ${photos.length} photos`
    }

    let div = document.createElement('div');
    div.classList.add('div')
    div.append(h2)
    document.body.append(div)

    photos.forEach(photo => {
        let title = document.createElement('h2');
        title.textContent = `Title: ${photo.title}`

        let img = document.createElement('img');
        img.src = photo.thumbnailUrl

        div.append(title, img)
    });
    return div
}


