const createProfileTable = `CREATE TABLE IF NOT EXISTS "profiles"(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    sport_id INT,
    location JSON NOT NULL,
    banners JSON,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_sport
        FOREIGN KEY(sport_id)
            REFERENCES sports(id)
            ON DELETE SET NULL
);`;

module.exports = createProfileTable