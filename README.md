# Boba Fetch!
Boba Fetch! is a Yelp clone, but for mainly Milk Tea shops.  It is a place for Milk Tea shops to advertise their business.  Users of the app will be able to sign up and then add a business to the app.  User's will also be able to post reviews for shops that they do not own.

# Index
- [Feature List](https://github.com/skyline502/boba-fetch/wiki/Boba-Fetch!-Feature-List)
- [Database Schema](https://github.com/skyline502/boba-fetch/wiki/Database-Schema)

# Technologies Used
![image](/frontend/public/images/technologies.png)

# Installation
1. First navigate to the backend folder by typing:
```js
cd backend
```
* npm install
* create a .env file with the following:
```js
PORT=5000
DB_USERNAME=boba_fetch_app
DB_PASSWORD=«auth_app user password»
DB_DATABASE=boba_fetch_db
DB_HOST=localhost
JWT_SECRET=«generate_strong_secret_here»
JWT_EXPIRES_IN=604800
```
* create a new user in postgres with a password and CREATEDB:
```js
create user boba_fetch_app with password 'password' createdb;
```
* generate a JWT secret by opening a node terminal and entering this code:
```js
require("crypto").randomBytes(32).toString("hex");
```
* copy the generated code and paste into your .env file after JWT_SECRET=
2. Run the following commands to create, migrate, and seed your database:
```js
npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```
3. Frontend Installation
- cd into your frontend directory
- npm install
4. Start up your backend server with:
```js
npm start
```
- if you have WSL, run these commands:
```js
sudo service postgresql restart
npm start
```
- You should see your terminal show the server running on localhost:5000
5. Start up your frontend server with:
```js
npm start
```
- Your browser should open up the app at localhost:3000
6. Using the site
- You can log in with demo user or create a new user
- You can browse the businesses by clicking on the businesses button
