const createScoreTable = `CREATE TABLE IF NOT EXISTS "scores"(
    id SERIAL PRIMARY KEY,
    match_id INT NOT NULL,
    score VARCHAR(190) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_match
        FOREIGN KEY(match_id)
            REFERENCES matches(id)
            ON DELETE CASCADE
);`;

module.exports = createScoreTable