# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Users
- ✅ singup : POST ('/user/signup')
- ✅ singin : POST ('/user/signin')
- ✅ Index [token required] [only admins] : GET ('/user-admin/admins')
- ✅ Show [token required] [only admins] : GET ('/user-admin/admins/:id')
- ✅ Create admin[token required] [only admin can create another admins from the dashboard] : POST ('/user-admin/admins')
#### categories
> all endpoints for admins only so all token required and admins only
- ✅ Index : GET ('/category')
- ✅ Show : GET ('/category/:id') 
- ✅ Create : POST ('/category')
- ✅ uppdateOne : PUT ('/category/:id')
- ✅ deleteOne : DELETE ('/category/:id')
#### Products
- ✅ Index : GET ('/product')
- ✅ Show : GET ('/product/:id') 
- ✅ Products by category (args: product category) : GET ('/product/category/:catId')
- ✅ Create [token required] [only admins]:  : POST ('/product-admin')
- ✅ uppdateOne [token required] [only admins]:  : PUT ('/product-admin/:id')
- ✅ deleteOne [token required] [only admins]:  : DELETE ('/product-admin/:id')
- ✅ Top 5 most popular products [token required] [only admins] : GET ('/product-admin/dashboard/popular-products') 

#### Orders
- ✅ Current Order by user [token required] : GET ('/order/activeorder')
- ✅ Completed Orders by user [token required] : GET ('/order/completedOrders')
- ✅ add product to user active order [token required] : POST ('/order/addtoorder/:orderId')
- ✅ create order [token required] : POST ('/order')
- ✅ update order [token required] : PUT ('/order/id')
- ✅ get user active order with its products [token required] : GET ('/order/orderproducts')

## Data Shapes
#### ✅Product
-  id
- name
- price
- category

#### ✅User
- id
- firstName
- lastName
- password
- email
- role

#### ✅Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## database schema
- CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(200) DEFAULT 'user' NOT NULL CHECK( role = 'user' OR role = 'admin'),
    createdAt TIMESTAMP DEFAULT NOW()
);
- CREATE TABLE categories 
(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT NOW(),
    createdBy UUID REFERENCES users(id)
);
- CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    price money NOT NULL,
    category UUID REFERENCES categories(id) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    createdBy UUID REFERENCES users(id)
);
- CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    createdAt TIMESTAMP DEFAULT NOW(),
    createdBy UUID REFERENCES users(id) NOT NULL
);
- CREAte TABLE order_product 
(
    id BIGSERIAL PRIMARY KEY,
    orderid UUID NOT NULL REFERENCES orders(id),
    productid UUID NOT NULL REFERENCES products(id),
    quantity BIGINT NOT NULL
);
![schmea](/assets//Schema.png)