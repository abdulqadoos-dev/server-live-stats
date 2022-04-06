const createMediaTable = `CREATE TABLE IF NOT EXISTS "media"(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    file_type VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
);`;

module.exports = createMediaTable