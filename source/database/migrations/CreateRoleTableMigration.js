const createRoleTable = `CREATE TABLE IF NOT EXISTS "roles"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);`;

module.exports = createRoleTable