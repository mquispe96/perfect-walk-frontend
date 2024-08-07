# Perfect Walk

## Description

A website to find a good place to walk, according to the weather and the location. When creating an account, the user can post about their adventures and share with others. This website aims to create a community of people who enjoy walking and exploring new places.

[Perfect Walk Deploy](https://perfect-walk.netlify.app/)
[Perfect Walk Backend Deploy](https://perfect-walk-backend.onrender.com/)
[Perfect Walk Backend Repo](https://github.com/mquispe96/perfect-walk-backend)

## User Stories

1. An user can create an account, log in and log out.
2. An user can change / reset their password.
3. An user can delete their account.
4. An user can create a post, comment, response.
5. An user can edit and delete their posts, comments, responses.
6. An user can see their profile and their posts.
7. An user can everyones posts in home page, along with current weather and recommended place.
8. An user can see a more detailed weather forecast in the weather page.
9. An user can see places at a certain state in the places page.
10. An user can see a specific place in the place page, where it's more detailed.

## Example RESTful Routes

#|Action|URL|HTTP Verb|CRUD|Description
--|------|---|---------|----|-----------
1|Index|/|GET / POST|Read / Create|Display all posts, weather and recommended place
2|Show|/weather|GET|Read|Display the weather forecast
3|Show|/places|GET|Read|Display all places in a certain state
4|Show|/place/:parkCode|GET|Read|Display a specific place
5|Show|/profile|GET / POST|Read / Create|Display the user's profile and posts
6|Create|/signup|POST|Create|Create a new User
7|Create|/login|POST|Create|Create a new Session
8|Update|/forgot-password|PUT|Update|Update / Reset the user's password
9|Update|/change-password|PUT|Update|Update the user's password
10|Delete|/delete-account|DELETE|Delete|Delete the user's account
