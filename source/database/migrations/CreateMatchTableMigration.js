const createMatchTable = `CREATE TABLE IF NOT EXISTS "matches"(
    id SERIAL PRIMARY KEY,
    sport_id INT,
    team1_id INT,
    team2_id INT,
    date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    zip VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_sport
        FOREIGN KEY(sport_id)
            REFERENCES sports(id)
            ON DELETE SET NULL,
    CONSTRAINT fk_team1
        FOREIGN KEY(team1_id)
            REFERENCES teams(id)
            ON DELETE SET NULL,
    CONSTRAINT fk_team2
        FOREIGN KEY(team2_id)
            REFERENCES teams(id)
            ON DELETE SET NULL
);`;

module.exports = createMatchTable