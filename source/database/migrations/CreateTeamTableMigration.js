const createTeamTable = `CREATE TABLE IF NOT EXISTS "teams"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);`;

module.exports = createTeamTable