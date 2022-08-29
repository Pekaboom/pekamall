"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = __importDefault(require("./modules/Block"));
const Transaction_1 = __importDefault(require("./modules/Transaction"));
let block = new Block_1.default(1, '1234', 'Sold a house for $2,000,000');
(async () => {
    let transaction = new Transaction_1.default(1, block, 100, 1, 2, block.getInfo());
    var hash;
    console.log(transaction, hash == (await block.getHash()));
})();
