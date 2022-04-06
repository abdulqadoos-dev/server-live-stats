const createUserTable = `CREATE TABLE IF NOT EXISTS "users"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email_verified_at TIMESTAMP,
    remember_token VARCHAR(255),
    is_agree VARCHAR(255),
    role_id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_role
        FOREIGN KEY(role_id) 
            REFERENCES roles(id)
            ON DELETE SET NULL
);`;

module.exports = createUserTable