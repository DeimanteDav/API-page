import buttonGroup from "./components/buttonGroup.js";
import header from "./components/header.js";
import userInfoList from "./components/userInfoList.js";
import { API_URL } from "./config.js";
import { createElement, createListItem, fetchData } from "./functions.js";


async function userData() {
  const queryParams = document.location.search
  const urlParams = new URLSearchParams(queryParams)
  const userId = urlParams.get('user-id')
  
  const user = await fetchData(`${API_URL}/users/${userId}?_embed=posts&_embed=albums`)

  const container = document.getElementById('user-page');
  const userName = createElement('h1', '', user.name)


  function deleteUser() {
    fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
    });

    history.back()
  }

  const buttons = buttonGroup({
    deleteInfo: {
        text: `Are you sure you want to delete this ${user.name}?`,
        handler: deleteUser
    },
      editHref: `./user/edit-user.html?user-id=${userId}`
  })


  container.append(userName, userInfoList(user), buttons, renderPosts(user))
  header()
}
userData()

 


function renderPosts(user) {
  const postsListWrapper = createElement('div', 'my-5')
  const postsItem = createElement('p', 'h4', 'Posts')

  const createPostLink = createElement('a', '', 'Write Post')
  createPostLink.href = `./post/create-post.html?user-id=${user.id}`

  const postsInfo = createElement('p', 'my-3')
  const postsInfoText = createElement('small', '', 'Click on the post to read more')
  postsInfo.append(postsInfoText)

  const postsList = createElement('div', 'list-group');

  user.posts.forEach(post => {
    const postItem = createListItem('', post.title, `./post.html?post-id=${post.id}`)

    postsList.append(postItem)
  });


  postsListWrapper.append(postsItem, createPostLink, postsInfo, postsList)
  return postsListWrapper
}
