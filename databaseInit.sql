-- create databases 
CREATE DATABASE storefront_dev;
CREATE DATABASE storefront_test;
-- install uuid extesnsion
\c storefront_dev
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c storefront_test
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";