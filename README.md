p# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.
## PRE
```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
```
INSERT INTO order_product (orderid, productid,quantity) values ('78356623-4a72-4393-b3d5-478f20835eb0','1752ad99-e7eb-44c4-b851-6a854a52f3e8',20)
ON CONFLICT (orderid,productid) DO UPDATE SET quantity = order_product.quantity + EXCLUDED.quantity;
```
## privileges 
> note that database must be shipped with already exist admin
- any user could sign in/up [ no token required ]
- any user could see the products [maybe the main page in the frontend] [ no token required ]
- any signed user could create, read, update and delete order [ token required ]
- only ***admin*** could ALTER [ create/update/delete ] products [ token required, with user of role **admin** ]
- only ***admin*** could ALTER [ create/update/delete ] categories [ token required, with user of role **admin** ]
- only ***admin*** could create another admins [ no sign up page for admins/ the super admin only could create another ones from the dashboard ]  [ token required, with user of role **admin** ]
## todo
- [ ] check all auth
## env vars
| VAR NAME      | REQUIRED                  | EXAMPLE    | DEFAULT | DESCRIPTION                                                          |
|---------------|---------------------------|------------|---------|----------------------------------------------------------------------|
| PORT          | 🔴                         | 8000       | 3000    | set which port the server will run on                                |
| PG_HOST       | ✅                         | 127.0.0.1  |         | set postgreSQL host name                                             |
| PG_DB         | ✅                         | store_dev  |         | used to connect with the database and used in the migrations config  |
| PG_TEST_DB    | ✅[only for running tests] | store_test |         | in "test" mode used to connect to the database and in the migrations |
| PG_PORT       | ✅                         | 5432       |         | which port database is using                                         |
| PG_USER       | ✅                         | user       |         | database username who can manage all tables in the database          |
| PG_PASSWORD   | ✅                         | password   |         | database user password                                               |
| JWT_SECRET    | ✅                         | secret     |         | used as jwt secret                                                   |
| JWT_EXPIRES   | ✅                         | 10d        |         | set when jwt expires                                                 |
| BCRYPT_ROUNDS | ✅                         | 4          |         | set number of rounds bycrypt will use                                |
| BCRYPT_SALT   | ✅                         | secret     |         | set the salt added to the password before hashing                    |
| ENV           | 🔴                         | dev        | dev     | set env type[the database will automatically work in dev mode]       |

## End Points
## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
