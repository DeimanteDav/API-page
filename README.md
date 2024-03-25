# JSONPlaceholder API Web Application

This project is a Vanilla JavaScript application utilizing the [JSONPlaceholder API](https://jsonplaceholder.typicode.com) to demonstrate CRUD (Create, Read, Update, Delete) operations on various resources such as users, albums, posts, comments, and photos. It also incorporates Bootstrap for styling and PhotoSwipe JS for image gallery functionality. The application includes pagination, search functionality, and toast notifications.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Application Pages](#application-pages)

## Features

- CRUD operations (Create, Read, Update, Delete) on users, albums, posts, comments, and photos
- Pagination for efficient navigation through large datasets
- Search functionality allowing users to search by categories: albums, posts, users, comments, and photos
- Implementation of Bootstrap for responsive and attractive UI design
- Integration of PhotoSwipe JS for an interactive image gallery experience
- Toast notifications for feedback on user actions

## Technologies Used

- Vanilla JavaScript
- [Bootstrap](https://getbootstrap.com/) - Front-end framework for responsive and attractive UI design
- [PhotoSwipe JS](https://photoswipe.com/) - JavaScript library for image gallery functionality
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com) - Fake online REST API for testing and prototyping

## Usage

1. Upon opening the application, you will be presented with the main page showcasing various resources.
2. Navigate through different pages such as users, albums, posts, etc., using the navigation menu.
3. Perform CRUD operations by clicking on respective buttons (create, edit, delete).
4. Utilize the search bar to search for specific items within categories.
5. Enjoy the image gallery functionality with PhotoSwipe JS.

## Application Pages

1. **Home Page**
   - Overview of the application.
   - Navigation menu to access different sections of the application.

2. **Users Page**
   - List of users retrieved from the API.
   - Option to create new users.

3. **User Profile Page**
   - Details of a specific user, including their name, email, address, etc.
   - List of posts created by the user.
   - Option to edit or delete the user profile.

4. **Albums Page**
   - Gallery view of albums retrieved from the API.
   - Thumbnail images of each album cover.
   - Clickable links to view the contents of each album.
   - Option to create new albums.

5. **Album Details Page**
   - List of photos within a specific album.
   - Clickable images for each photo, allowing users to view them in full size.
   - Integration of PhotoSwipe for an interactive image gallery experience.
   - Option to edit or delete the album, as well as add new photos to it.

6. **Posts Page**
   - List of posts retrieved from the API.
   - Pagination controls for navigating through multiple pages of posts.
   - Option to create new posts.

7. **Post Details Page**
   - Full view of a specific post, including its title, body, author, etc.
   - Comments section displaying comments associated with the post.
   - Option to edit or delete the post, as well as add new comments to it.

8. **Search**
   - Search functionality accessible from multiple pages.
   - Allows users to search for specific items across different categories (albums, posts, users, comments, photos).