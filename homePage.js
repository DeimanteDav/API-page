import header from "./components/header.js";
import { API_URL } from "./config.js";
import { createCardElementImg, createElement, fetchData, renderPostCard } from "./functions.js";


// post, put, patch, delete



// naujo komentaro savint negalima


/*
    write github readme. some info about the project:
    vanilla javascript project with api: https://jsonplaceholder.typicode.com.;
    bootstrap is used, photoswipe js,
    there is pagination, data per page,
    search page (you can search by categories: albums, posts, users, comments, photos);
    get project pages: users, user, albums, album, posts, post.;
    you can create edit delete as well (post, put, patch, delete)
    toast


    naudojamas api koks nuoroda
    bootstrapas naudojamas
    photoswipe

    get projekto pages: users, user, albums, album, posts, post
    search page. galimybe ieskot pagal kategorijas

    pagination yra
    data per page
*/


async function homePage() {
    const container = document.getElementById('home-page')
    const albums = await fetchData(`${API_URL}/albums?_expand=user&_embed=photos&_limit=2`)
    const posts = await fetchData(`${API_URL}/posts?_expand=user&_limit=2`)

    const albumsWrapper = createElement('div')
    const albumsText = createElement('h2', '', 'Most recent albums')
    const albumsLink = createElement('a', '', 'All albums')
    albumsLink.href = './albums.html'
    
    const postsWRapper = createElement('div', 'pt-5')
    const postsText = createElement('h2', '', 'Most recent posts')
    const postsLink = createElement('a', '', 'All posts')
    postsLink.href = './posts.html'

    albumsWrapper.append(albumsText, albumsLink)
    albums.forEach(album => {
        const albumData = {
            image: album.photos[0].thumbnailUrl,
            title: album.title,
            subtitle: `Author: ${album.user.name}`,
            text: `Amount of photos: ${album.photos.length}`,
            link: {
                text: `Go to album's page`,
                href: `./album.html?album-id=${album.id}`
            }
        }

        albumsWrapper.append(createCardElementImg(albumData))
    });

    postsWRapper.append(postsText, postsLink)
    posts.forEach(post => {
        postsWRapper.append(renderPostCard(post))
    })


    container.append(albumsWrapper, postsWRapper)
    header()
} 
homePage()

