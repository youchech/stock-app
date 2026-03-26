CREATE TABLE products (
    id BIGINT PRIMARY KEY,
    ref VARCHAR(50),
    type VARCHAR(100),
    color VARCHAR(50),
    quantity INT,
    price DECIMAL(10,2),
    dateAjout DATE,
    dateVente DATE,
    image VARCHAR(255)
);