# STOREFRONT-FWD

## INSTALLATION
1. ### you must get [postgreSQL](https://www.postgresql.org/download/) installed in your machine
    **create two databases one for ENV = dev and the other for ENV = test**
    > note save their names because you gonna add them in env variables so that ***node-postgres*** can connect to those databases

    example run this sql code in your psql or whatever the way you interact with postgreSQL to create ``storefront_dev`` and ``storefront_test``
    ```
    CREATE DATABASE storefront_dev;
    CREATE DATABASE storefront_test;
    ```
    **after creating the database install the uuid extension on both because we're using it as our id for all tables**
    ```
    \c storefront_dev
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    \c storefront_test
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    ```
2. ### install all npm packages
    ```
    npm install
    ```
3. ### setup the .env file from [environment-variables](#environment-variables) section
    >note without .env file you can not connect to the database neither running tests or run migrations
4. ### run database migrations
    > db-migrate automatically connect to the database by reading **.env** file to complete its configurations in **database.json**

    ```
    db-migrate up
    ```
    **note if db-migrate is not defined in your terminal install it as global from npm then try again**
    ```
    npm i -g db-migrate
    ```
5. ### build javascript files
    ```
    npm run build
    ```
6. ### run tests
    ```
    npm run test
    ```
7. ### start the server
    ```
    npm start
    ```
## privileges 
> note that database must be shipped with already exist admin [it's done when you start the server for the first time or start testing]
    [```
    username: admin;
    password: admin;
    ```]
- any user could sign in/up [ no token required ]
- any user could see the products [maybe the main page in the frontend] [ no token required ]
- any user could search the products by category [ no token required ]
- any signed user could create, read, update and delete order [ token required ]
- only ***admin*** could ALTER [ create/update/delete ] products [ token required, with user of role **admin** ]
- only ***admin*** could ALTER [ create/update/delete ] categories [ token required, with user of role **admin** ]
- only ***admin*** could create another admins [ no sign up page for admins/ the super admin only could create another ones from the dashboard ]  [ token required, with user of role **admin** ]

## Environment Variables
** create ``.env`` file in the main dir so the server could read and complete the configurations from it and then next table contain what ``.env`` file must include and why those fields then example of the file structure**
 
| VAR NAME      | REQUIRED                  | EXAMPLE    | DEFAULT | DESCRIPTION                                                          |
|---------------|---------------------------|------------|---------|----------------------------------------------------------------------|
| PORT          | 🔴                         | 8000       | 3000    | set which port the server will run on                                |
| PG_HOST       | ✅                         | 127.0.0.1  |         | set postgreSQL host name                                             |
| PG_DB         | ✅                         | store_dev  |         | used to connect with the database and used in the migrations config  |
| PG_TEST_DB    | ✅[only for running tests] | store_test |         | in "test" mode used to connect to the database and in the migrations |
| PG_PORT       | ✅                         | 5432       |         | which port database is using                                         |
| PG_USER       | ✅                         | user       |         | database username who can manage all tables in the database and create new ones        |
| PG_PASSWORD   | ✅                         | password   |         | database user password                                               |
| JWT_SECRET    | ✅                         | secret     |         | used as jwt secret                                                   |
| JWT_EXPIRES   | ✅                         | 10d        |         | set when jwt expires                                                 |
| BCRYPT_ROUNDS | ✅                         | 4          |         | set number of rounds bycrypt will use                                |
| BCRYPT_SALT   | ✅                         | secret     |         | set the salt added to the password before hashing                    |
| ENV           | 🔴                         | dev        | dev     | set env type[the database will automatically work in dev mode]       |

***example not field with data***
```
PORT = 3000
PG_HOST = 
PG_DB = storefront_dev
PG_TEST_DB = storefront_test
PG_PORT = 5432
PG_USER = 
PG_PASSWORD = 
JWT_SECRET = 
JWT_EXPIRES = 
BCRYPT_ROUNDS = 
BCRYPT_SALT = 
ENV = dev
```
## End Points
 **all end points could be found in [REQUIREMENTS.md](/REQUIREMENTS.md) file**
## Required Technologies
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing