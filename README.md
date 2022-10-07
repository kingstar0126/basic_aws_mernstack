![](./client/src/assets/Logo.png)

DailyRecipe (no longer deployed) is a full-stack web application that acts as an ingredient-and-recipe meal kit service.

# Features
- User authentication (JWT)
- Plan and recipe selection
- Current delivery information
- A menu explorer
- Individual recipes page/modal
- A user profile

Examples:

1. Users can choose to subscribe to DailyRecipe by following the signing up steps. This includes choosing a plan and providing billing information.

    ![](./client/public/github/signup.gif)

2. Subscribed users can select the recipes they want delivered in the current week.

    ![](./client/public/github/select.gif)


# Technologies (MERN stack)
- Frontend:
    - React: Function components, hooks, Context API, higher-order components, React Router
    - React Bootstrap: Bootstrap as components
    - Bootstrap: Styling components
    - CSS: Styling components
    - React Cookie: Handle browser cookies (get/set cookies)

- Backend:
    - Express: Serve application
    - Mongoose: Object Relational Mapping (ORM) for MongoDB
    - bcrypt: Encrypt user passwords
    - jsonwebtoken: User authentication
    - validator: Validate user input
    - stripe: Handle user payment 

- Database:
    - MongoDB: NoSQL database program

- Deployment:
    - Amazon Web Services: Amazon EC2 Linux instance (Ubuntu). [This](https://dev.to/rmiyazaki6499/deploying-a-production-ready-react-express-app-on-aws-62m) article was a great resource.
    - AWS SSM Send-Command Github Action: Continuous Deployment

- Linter:
    - eslint: airbnb and react-app configurations


# Models
![](./client/public/github/Models.png)

# Setup
To run project locally make sure you have NodeJs installed and:
1. Clone the repository: `git clone git@github.com:Svcg17/DailyRecipe.git`.
2. Run `npm install` to install the project's dependencies.
3. Create a file named `.env` in the root folder of the project.
    Copy and paste the following inside the file:
    ```
    TOKEN_SECRET="<INSERT TOKEN SECRET>"
    DB="mongodb+srv://dailyrecipepublic:dailyrecipepublicpwd@cluster0.iqkzb.mongodb.net/MyDailyRecipes?retryWrites=true&w=majority"
    PORT=5000
    ```
    - TOKEN_SECRET: long string used to encrypt/decrypt the data stored in the jwt token. You can generate a value for the TOKEN_SECRET by using Node's `crypto` library: `require('crypto').randomBytes(64).toString('hex')`.
    - DB: MongoDB connection string. note: this is a read only connection to the database so you won't be able to create any users or update plans. 
    - PORT: port to run express server on
4. To start the express server on port `5000` run `npm run start`.
5. Go to the client folder `cd client` and repeat step 2.
6. Create a file named `.env` and paste `REACT_APP_HOST=http://localhost:5000` inside. This is host used in the react server.
7. To build the React app run `npm run build`.
6. Open `http://localhost:5000/` and you should see the DailyRecipe website.

# Inspiration
Heavily inspired by meal kit services like [Blue Apron](https://www.blueapron.com/), [Hello Fresh](https://www.hellofresh.com/).

# About
Made by Sofía Cheung | [Linkedin](https://www.linkedin.com/in/sofiacheung/)
