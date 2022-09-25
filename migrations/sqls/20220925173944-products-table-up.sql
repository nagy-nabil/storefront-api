CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    price money NOT NULL,
    category UUID REFERENCES category(id) NOT NULL
);