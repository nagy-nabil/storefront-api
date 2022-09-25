CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);