[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://github.com/mauriziomonti/baristacrats-backend-final-project.git)

# Backend for Chews 

This is the repo for our server and database, where we have built the API routes, postgresql queries and tests. Our API CRUD routes are connected to our database (Heroku) and the data is fed to our frond end via the GET routes.

## Description

  ## Problem
  “With the COVID pandemic and now the cost of living crisis, many people have been cooking at home more than ever. However, having to come up with         interesting recipes for the ingredients you have, sometimes multiple times per day, can lead to decision fatigue and sap the joy out of home cooking”.

  ## Solution
  “Chews” is a web app that helps you easily choose a meal recipe to make at home, taking the tiresome decision-making out of your hands.


## Features of MVP
- Login/Sign up for new users
- Meal type selection page
- Search by items page
- Result page to display recepet selection
- Display full recepet with the instructions
- Save favourite recepet and display page


[Link to Frontend](https://github.com/simonpartridge86/baristacrats-frontend-final-project)


## API Reference

#### PORT Used: 3000

#### User

| Method | Path                 | Additional Info | Result                                    | Response                                    |
| ------ | -------------------- | --------------- | ----------------------------------------- | ------------------------------------------- |
| GET    | ~/users/userid     |                 | Specific user details                     |{success: true, payload: user details object} |
| POST   | ~/users              | {name: string, dietary-preferences: [strings], ?image-link: string, ?nationality: string} | User profile created           |{success: true, payload: {userid: userid}}        |{success: true, payload: {userid: <userid>}}                                        |                                             |
| PUT    | ~/users/userid     | {name: string, dietary-preferences: [strings], ?image-link: string, ?nationality: string} |User details updated|{success: true, payload: “user profile updated”|
| DELETE | ~/users/userid    |   |User of specified id deleted|{success: true, payload: “user profile deleted”







#### Recipes

| Method | Path                 | Additional Info | Result                                    | Response                                    |
| ------ | -------------------- | --------------- | ----------------------------------------- | ------------------------------------------- |
| GET    | ~/users/recipes/userid             |{favourites: [{recipeid: number, title: string, imageURL: string}]}                 | Specific saved recipes                                | {success: true, payload: user collected recipes}    |
| POST   | ~/users/recipes      | {userid: number, favourites: [{recipeid: number, title: string, imageURL: string}]} | User profile created                          |{success: true, payload: “${name}’s profile created”}|
| PUT    | ~/users/recipes/userid |{userid: number, favourites: [{recipeid: number, title: string, imageURL: string}]} |User details updated                        |{success: true, payload: “${name}’s  profile updated”|
| DELETE | ~/users/recipes/userid  |                 | User of specified id deleted         | {success: true, payload: “${name}’s profile deleted”       |


## Tech Stack

**Database:** Heroku

**Server:** Node, Express, Nodemon, pg, dotenv (****cors**** to review)


## Running Tests. (**not defined yet**)

To run tests, run the following command

```bash
  npm run test
```



## Run Locally

Clone the project

```bash
  https://github.com/mauriziomonti/baristacrats-backend-final-project.git
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

#### Database Documentation

Create .env file. (To decide which configuration below to be used)

```
PGPORT=<Your database port>
PGHOST=<Your database host>
PGDATABASE=<Your database reference>
PGUSER=<Your database username>
PGPASSWORD=<Your database password>

PGCONNECTIONSTRING=<Connection string provided>
```

Run these scripts to create the tables on your database:

***User***
```
    npm run <db drop functionality>
    npm run  <db create functionality>
    npm run  <db populate functionality>
```
***Recipes***
```
    npm run <db drop functionality>
    npm run  <db create functionality>
    npm run  <db populate functionality>
```


## Authors

- [@Adam Phasey](https://github.com/AdamPhasey)

- [@mauriziomonti](https://github.com/mauriziomonti)

- [@MagicMino](https://github.com/MagicMino)

- [@simonpartridge86](https://github.com/simonpartridge86)

- [@kun-shukla](https://github.com/kun-shukla)








