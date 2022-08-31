"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class User {
    id = undefined;
    email = undefined;
    username = undefined;
    passwordHash = undefined;
    constructor(id, email, username, password) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.passwordHash = this.encryptPassword(password);
        this.getUserData();
    }
    async encryptPassword(password) {
        return password;
        let encoder = new TextEncoder();
        let encodedData = encoder.encode(JSON.stringify(this.username) + JSON.stringify(this.email) + JSON.stringify(password));
        let buffer = await crypto_1.webcrypto.subtle.digest('SHA-256', encodedData);
        let hash = Array.from(new Uint8Array(buffer)).map(array => {
            return array.toString(16).padStart(2, '0');
        }).join('');
        return hash;
    }
    getUserData() {
        let _this = JSON.stringify(this);
        let data = JSON.parse(_this);
        delete data.passwordHash;
        return data;
    }
    getPasswordHash() {
        return this.passwordHash;
    }
}
exports.default = User;
