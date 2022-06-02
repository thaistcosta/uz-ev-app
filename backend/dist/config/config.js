"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 5000,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 27017
    },
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
});
//# sourceMappingURL=config.js.map