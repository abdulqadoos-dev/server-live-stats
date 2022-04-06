const createOtpTable = `CREATE TABLE IF NOT EXISTS "opts"(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    code INT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
);`;

module.exports = createOtpTable