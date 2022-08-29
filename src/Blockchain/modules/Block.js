"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class Block {
    id = null;
    previousHash = null;
    hash = null;
    blockInfo = null;
    timestamp = null;
    constructor(id, previousHash, blockInfo) {
        this.id = id;
        this.previousHash = previousHash;
        this.blockInfo = blockInfo;
        this.timestamp = (new Date()).getTime();
        this.hash = this.generateHash(this.id, previousHash, blockInfo, this.timestamp);
    }
    /** Method to generate new block hash */
    async generateHash(id, previousHash, blockInfo, timestamp) {
        let encoder = new TextEncoder();
        let data = encoder.encode(id + previousHash + blockInfo + this.timestamp);
        let buffer = await crypto_1.webcrypto.subtle.digest('SHA-256', data);
        let hash = Array.from(new Uint8Array(buffer)).map(array => {
            return array.toString(16).padStart(2, '0');
        }).join('');
        return hash;
    }
    /** Get hash of block */
    getHash() {
        return this.hash;
    }
    /** Get timestamp */
    getTimestamp() {
        return this.timestamp;
    }
    /** Get block info */
    getInfo() {
        return this.blockInfo;
    }
}
exports.default = Block;
