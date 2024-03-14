import { fetchData, renderSinglePost } from "./functions.js";
import { API_URL } from "./config.js";
import header from "./components/header.js";

function search() {
    header()
    const queryParams = document.location.search
    const urlParams = new URLSearchParams(queryParams)
    
    const search = urlParams.get('search')
    
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
    const category = document.querySelector('#category');
    const input = document.querySelector('#search-input');
    const form = document.querySelector('#search-form');

    const searchResults = document.querySelector('#search-results')

    form.addEventListener('submit', async function (e) {
        e.preventDefault()

        searchResults.innerHTML = ''

        if (input.value != '') {
            if (category.value == 'albums') {
                searchAlbums(input.value, searchResults)
            }
            if (category.value == 'users') {
                searchUsers(input.value, searchResults)
            }
            if (category.value == 'posts') {
                searchPosts(input.value, searchResults)
            }
            if (category.value == 'comments') {
                searchComments(input.value, searchResults)
            }
            if (category.value == 'photos') {
                searchPhotos(input.value, searchResults)
            }
        }
    });
}
searchByCategory()


async function searchAlbums(search, searchResults) {
    const albums = await fetchData(`${API_URL}/albums?_embed=photos&q=${search}`)
    
    const searchTitle = document.createElement('h2');
    
    if (albums.length == 0) {
        searchTitle.textContent = `No albums found`
    } else if (albums.length == 1) {
        searchTitle.textContent = `Found ${albums.length} album`
    } else {
        searchTitle.textContent = `Found ${albums.length} albums`
    }
    searchResults.append(searchTitle)

    albums.forEach(album => {
        const title = document.createElement('h2');
        title.innerHTML = `<a href="./album.html?albumId=${album.id}">Title: ${album.title}</a>`
        
        // const author = document.createElement('p');
        // author.textContent = `Name: ${album.user.name}`
        
        const photos = document.createElement('p');
        photos.textContent = `Amount of photos: ${album.photos.length}`

        const singlePhoto = document.createElement('img');
        singlePhoto.src = album.photos[0].thumbnailUrl
        
        searchResults.append(title, photos, singlePhoto)
    });
}


async function searchUsers(search, searchResults) {
    const users = await fetchData(`${API_URL}/users?&q=${search}`)

    const searchTitle = document.createElement('h2');
    if (users.length == 0) {
        searchTitle.textContent = `No users found`
    } else if (users.length == 1) {
        searchTitle.textContent = `Found ${users.length} user`
    } else {
        searchTitle.textContent = `Found ${users.length} users`
    }
    
    searchResults.append(searchTitle)
    users.forEach(user => {
        console.log(user);
        const author = document.createElement('h2');
        author.innerHTML = `<a href="./user.html?userId=${user.id}">Author: ${user.name}</a>`

        // const posts = document.createElement('p');
        // posts.textContent = `Amount of posts: ${user.posts.length}`
        searchResults.append(author)
    })
}

async function searchPosts(search, searchResults) { 
    const posts = await fetchData(`${API_URL}/posts?q=${search}`)
    
    const searchTitle = document.createElement('h2');
    
    if (posts.length == 0) {
        searchTitle.textContent = `No posts found`
    } else if (posts.length == 1) {
        searchTitle.textContent = `Found ${posts.length} post`
    } else {
        searchTitle.textContent = `Found ${posts.length} posts`
    }

    posts.forEach(post => {
        searchResults.append(renderSinglePost({
            post, 
            showBody: true,
            showReadMore: true,
        }))
    })
}


async function searchComments(search, searchResults) {
    const comments = await fetchData(`${API_URL}/comments?q=${search}`)
    
    const searchTitle = document.createElement('h2');
    
    if (comments.length == 0) {
        searchTitle.textContent = `No comments found`
    } else if (comments.length == 1) {
        searchTitle.textContent = `Found ${comments.length} comment`
    } else {
        searchTitle.textContent = `Found ${comments.length} comments`
    }

    searchResults.append(searchTitle)

    comments.forEach(comment => {
        const title = document.createElement('h2');
        title.innerHTML = `<a href='./post.html#comment-${comment.id}?postId=${comment.postId}'>Title: ${comment.name}</a>`

        const content = document.createElement('p');
        content.textContent = `Content: ${comment.body}`

        const email = document.createElement('p');
        email.textContent = `Email: ${comment.email}`
        searchResults.append(title, content, email)
    });
}


async function searchPhotos(search, searchResults) {
    const photos = await fetchData(`${API_URL}/photos?&q=${search}&_limit=50`)
    const searchTitle = document.createElement('h2');
    
    if (photos.length == 0) {
        searchTitle.textContent = `No photos found`
    } else if (photos.length == 1) {
        searchTitle.textContent = `Found ${photos.length} photo`
    } else {
        searchTitle.textContent = `Found ${photos.length} photos`
    }

    searchResults.append(searchTitle)

    photos.forEach(photo => {
        const title = document.createElement('h2');
        title.textContent = `Title: ${photo.title}`

        const img = document.createElement('img');
        img.src = photo.thumbnailUrl

        searchResults.append(title, img)
    });
}


