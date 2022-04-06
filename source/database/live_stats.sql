-- Database: live_stats

-- DROP DATABASE IF EXISTS live_stats;

CREATE DATABASE IF NOT EXISTS live_stats;

CREATE TABLE IF NOT EXISTS users{
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email_verified_at TIMESTAMP,
    remember_token VARCHAR(255),
    is_agree VARCHAR(255),
    role_id VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
};

CREATE TABLE IF NOT EXISTS roles{
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
};