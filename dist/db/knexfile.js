"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    development: {
        client: "pg",
        connection: {
            host: "127.0.0.1",
            port: 5432,
            user: "postgres",
            password: "admin123!@#",
            database: "bookstore",
        },
        migrations: {
            directory: "./migrations",
            extension: "ts",
        },
        seeds: {
            directory: "./seeds",
            extension: "ts",
        },
    },
};
exports.default = config;
