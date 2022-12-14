CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK( status = 'active' OR status = 'complete'),
    createdAt TIMESTAMP DEFAULT NOW(),
    createdBy UUID REFERENCES users(id) NOT NULL
);