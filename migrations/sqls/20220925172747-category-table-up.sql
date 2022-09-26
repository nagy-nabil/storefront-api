CREATE TABLE categories 
(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT NOW(),
    createdBy UUID REFERENCES users(id)
);