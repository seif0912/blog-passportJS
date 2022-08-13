# blog-passportJS

blog: anyone can create an account and publish an article.


### description:

#### Homepage:
Log in and register buttons,
hero section display "stay curious" and a button direct you to register page,
homepage display all articles sorted by latest.
Footer have a resiter form functionality.
If a user is logged in:
header links: write, profile, settings, and log out 
hero section display "stay creative" and a button direct you to write page to write an article,
footer has header links 


#### Log in page
Log in page functionality:
If a user is authenticated, he'll be redirected to home page.
Form fields are required.
Check if email exist. if yes, compare passwords with bcrypt
if bcrypt returns true, a new session is started for a day. if not, an error will be displayed and the user won't be authenticated.


#### Register page
Register page functionality:
If a user is authenticated, he'll be redirected to home page.
Form fields are required.
Check if email exist. If yes, an error will be displayed and the user won't be resitered.
If no, a new user will be added to users table.
Redirect to log in page.


#### Write page
If a user is not authenticated, a 401 error will be triggered and redirected to log in page.
Form fields are required.
When you hit publish, a new post will be added to posts table with a reference to its publisher's name and then you'll be redirected to home page.


#### Profile page
The hero section displays the profile's name, total posts, and total likes.
Underneath, all profile posts sorted by the newest.
Only 3 lines from the article will be displayed. "Read more" link will redirect you to read the whole post.
If you enter a none existing profile in url, a 404 error will be triggered and redirected to 404 page.

#### post page
If you enter a none existing post in url, a 404 error will be triggered and redirected to 404 page.
Underneath the article, the pulisher name, you can click to go the publisher profile page.
If a user is authenticated, he can like the article.
If a user is authenticated and the article is his, he can edit the post or delete it.

#### settings page
If a user isn't authenticated, he'll be redirected to not authorized page.
If a user is authenticated and the profile isn't his, he'll be redirected to not authorized page.
The user can change his profile's name and password. He can also delete his account.
When a user delete his account, all his posts and likes will be deleted.