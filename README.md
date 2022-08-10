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
