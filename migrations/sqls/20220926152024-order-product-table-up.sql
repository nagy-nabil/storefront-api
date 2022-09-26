CREAte TABLE order_product 
(
    id BIGSERIAL PRIMARY KEY,
    orderid UUID NOT NULL REFERENCES orders(id),
    productid UUID NOT NULL REFERENCES products(id)
);