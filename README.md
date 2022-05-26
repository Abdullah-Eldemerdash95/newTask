## first download as rar or zip extension or clone it 
## second it is designed to work on live server of visual studio code 
## reach folder destination click on file on the top left of your window screen then 
open windows powershell then write code . don't forget space then enter it will open 
Vs studio code and now u can run live server from the bottom tab.

## explaination for design or how this task work 

#first u can choose to sign in or register depending on the fake api suppourted for this task
https://reqres.in/ u can use single email for login and sign in u can try this email 
eve.holt@reqres.in it only gives error in api if u write wrong email

# second after trying to register with email  mentioned and password pistol it sends your
to sign in page by a pop up u click on button to go there

# third u try to login using mentioned email and any pass it will show a popup 
to let u choose your role if admin or employee we decided to go to that option cause 
fake api don't allow to edit on users list that given to u to add admin property to 
certain users

# four u choose your role from admin or employee depending on choice it will show 
certain users depending on role and u choose your user 

# five if u are and admin role and choosed an user that from admin roles u gurantee 
to select from performance list to choose the performance review 
plus u can add and view the feedbacks plus u can delete any user 
in fake api it don't supply this but we put request and did it in ui of frontend 

# six once u add feedback and sumbit it u can't add another one only view feedbacks

# seven u can logout and if u try to go back u will have to resign in and choose all things again

# eight if u an employee user u will have only feedback view and add features 

###################################################################################################

# now to go to code explaination 
#index page 
##html5 normal tags plus to calls for needed files 
div needed to contain buttons and header 
##js file suppourt 2 function to send u in register page or sign in page depending on 
window.location.href that's why it work only in live server 

## signIn page 
#it have modal that show as popup after sign in it showed by displaying block depending on click 
# this popup have 2 choices as buttons to show users of admins or employees through get request
#then we work on dynamic data got from api request to display it in front end with all data needed 
# then when u click it have to send some data with it to user profile page we did it that with local Storage

## register page 
## it has 2 modals as popup each one for certain conditions of validation if u successded in register 
and want to go to sign in and if u fail and want to try again 

## we used instruction to post request with body that conatin email and pass and do all checks to confirm 
it's right or wrong by showing popups in case of right or wrong with 2 different msgs

## we start to talk about admin users that choosed in sign in popup page 
## we create tags in html to hold name and avatar and logout button and tag to conatain all users
## we got data about user from localstorage that we use click target attributes to save data then 
recall it in this page and display it in header 

## then we want to display all users with options allowed for admin role 
we get all users by a get request from fake api 

then we loop on it to display it as dynamic content in ui but we will add more 
## we add select tag to performance review that generate paragraph into ui with selection
## we add feedback buttons view and add to know feedbacks and add new one 
## we add delete user button 

## fake api doesn't suppourt showing feedback data we put static data and no user delete but we did it in front end 

## some conditions we in each loop we need to put for each element a certain id including buttons and modals that being
showed in ui and that for each user in a single unit that is special and this is for when select performance review 
or add feedback by add and sumbit it goes to that single unit alone plus to be destinguished by user that authenicated 

## that's why the part of looping is containing all functions and dynamic html code for including users select and buttons 
then popups and the functionality to let these things work

## it leaves us now to employee page it's same to admin but with only feedbacks view and add features 

## in each profile user there's a logout button that gurantee that u can't go to this page without login through steps mentioned.
