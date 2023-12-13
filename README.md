# MERN STACK AMAZON E-COMMERCE WEBSITE

## Tech Used:

1. MongoDB (Database)
2. ExpressJS (Backend Framework)
3. ReactJS (Frontend Library/Framework)
4. NodeJS (Server Environment)
5. AWS S3 Bucket for Image Storage
6. Paypal Integration

## Features of the Project:

- User Authentication using JWT Tokens and Refresh Token with Password Reset Feature
- Admin Dashboard to Add, Update or Delete Products in Database
- Shopping Cart Functionality with Quantity Adjustments
- Product Searching by Name & Category
- Responsive Design on Mobile Devices

## Run Locally

### 1. Clone repo

```
$ git clone https://github.com/Shital769/amazon
$ cd amazon
```

### 2. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb://localhost/amazon
- Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb+srv://your-db-connection

### 3. Run Backend

```
$ npm install
$ npm start
```

### 4. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 6. Admin Login

- Run http://localhost:3000/signin
- Enter admin email and password and click signin

# Steps

1. Install required tools
2. Create React App
3. Create Git Repository
4. List Products
   1. create products array
   2. add product images
   3. render products
   4. style products
5. Add Page Routing

   1. npm install react-router-dom
   2. create route for the hoem screen
   3. create router for product screen

6. Create Node.JS Server

   1. run npm init -y in root folder called backend
   2. update package.json set type:" module"
   3. add .js to imports in backend
   4. npm install express
   5. create server.js
   6. add start command as node backend/server.js
   7. Connect Express with MongoDB
   8. move products.js from frontend to backend
   9. create route for /api/products
   10. return products
   11. run nodemon server.js

7. Fetch Products from Backend

   1. set proxy in package.json file in frontend
   2. npm install axios
   3. use state hook
   4. use effect hook
   5. use reducer hook

8. Manage State By Reducer Hook

   1. define reducer
   2. update fetch data
   3. get state from useReducer

9. Add bootstrap UI Framework

   1. npm install react-bootstrap bootstrap
   2. update app.js

10. Create Product and Rating Component

    1. create Rating component
    2. create Product component
    3. use Rating component in Product component

11. Create Product Details Screen

    1. fetch product from backend
    2. create 3 columns for image, info and action

12. Create Loading and Message Component

    1. create loading component
    2. use spinner component
    3. create message component
    4. create utils.js to define getError function
    5. display error messages

13. Implement Add To Cart

    1. Create React Context
    2. define reducer
    3. create store provider
    4. implement add to cart Button click handler

14. Complete Add To Cart

    1. check exist item in the cart
    2. check count in stock in backend

15. Create Cart Screen

    1. create 2 columns
    2. display items list
    3. create action column

16. Complete Cart Screen

    1. click handler for increment/decrement item
    2. click handler for remove item
    3. click handler for checkout

17. Create SignIn Screen

    1. create sign in form
    2. add email and password
    3. add signin button

18. Connect To MongoDB Database

    1. create atlas mongodb database
    2. install local mongodb database
    3. npm install mongoose
    4. connect with mongodb database

19. Seed Sample Data

    1. create Product Model
    2. create User Model
    3. create seed route
    4. use route in server.js
    5. seed sample product

20. Seed Sample Users

    1. create user model
    2. seed sample users
    3. create user routes

21. Create SignIn Backend API

    1. create signin api
    2. npm install jsonwebtoken
    3. define generateToken

22. Complete SignIn Screen

    1. handle submit action
    2. save token in store and local storage
    3. show user name in header

23. Create Shipping Address

    1. create from inputs
    2. handle save shipping address
    3. add checkout wizard bar

24. Create SignUp Screen

    1. create input forms
    2. handle submit
    3. create backend api

25. Implement Select Payment Method Screen

    1. create input forms
    2. handle submit

26. Crete Place Order Screen

    1. show cart items, payment and address
    2. handleplace order action
    3. create order create api

27. Implement Place Order Action

    1. handle place order action
    2. create order create api

28. Create Order Screen (history)

    1. create backend api for order/:id
    2. fetch order api in frontend
    3. show order information in two columns

29. Pay Order By PayPal

    1. generate paypal client id
    2. create api to return cleint id
    3. install react-paypal-js
    4. use PayPalScriptProvider in index.js
    5. use usePayPalScriptReducer in Order Screen
    6. implement loadPayPalScript function
    7. render paypal button
    8. implement onApprove payment function
    9. create pay order api in backend

30. Display Order History

    1. create order history screen
    2. create order history api
    3. use api in the frontend

31. Create User Profile Screen

    1. get user info from context
    2. show user info from context
    3. create user update api
    4. update user info

32. Publish To Heroku

    1. create and config node project
    2. serve build folder in frontend folder
    3. create heroku account
    4. connect it to github
    5. create mongoDB Atlas database
    6. set database connection in heroku env varibles
    7. commit and push

33. Add Sidebar and Search Box

    1. add sidebar component
    2. add search box component

34. Create Search Screen

    1. show filters
    2. create api for searching products
    3. display results

35. Create Admin Menu

    1. define protected route component
    2. define admin route component
    3. add menu for admin in header

36. Create Dashboard Screen

    1. create dashboard ui
    2. implement backend ui
    3. connect ui to backend

37. Manage Products

    1. create product list page
    2. implement backend api
    3. fetch data

38. Create Products button

    1. create products button
    2. implement backend api
    3. handle on click

39. Edit Product

    1. create edit product button
    2. create edit prodict ui
    3. display product info in the input boxes

40. Implement Update Product

    1. create edit product backend api
    2. handle update click

41. Upload product Image

    1. create cloudinary account
    2. use the api key in env file
    3. handle upload file
    4. implement backend api to upload

42. Delete Product

    1. create delete product button
    2. create confirmation dialog
    3. implement backend api to delete

43. List Orders

    1. create order list screen
    2. implement backend api
    3. fetch and display orders

44. Deliver Order

    1. add deliver button
    2. handle click action
    3. implement backend api for deliver

45. Delete Order

    1. add delete button
    2. handle click action
    3. implement backend api for delete

46. List Users

    1. create user list screen
    2. implement backend api
    3. fetch and display users

47. Edit User

    1. create edit button
    2. create edit product api
    3. display info in the input boxes
    4. implement backend api
    5. handle edit click

48. Delete User

    1. add delete button
    2. handle click action
    3. implement backend api for delete

49. Choose Address on Google Map

    1. create google map credentials
    2. update .env file withb Google Api Key
    3. create api to send google api to frontend
    4. create map screen
    5. fetch google api
    6. getUserLocation
    7. install @react-google-maps/api
    8. use it in shipping screen
    9. apply map to checkout screen

50. Email Order receipt by mailgun

    1. create mailgun account
    2. add and verify your domain to mailgun
    3. install mailgun-js
    4. set api key in ENV file
    5. change pay order in orderRouter
    6. send email order receipt

51. Review Products

    1. create submit review form
    2. handle submit
    3. implement backend api for review

52. Upload multiple images

    1. add images to product model
    2. get images in edit screen
    3. show images in product screen

53. Forget and Reset Password

54. Implement Carousel