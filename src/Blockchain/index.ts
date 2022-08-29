import Block from "./modules/Block";
import Transaction from "./modules/Transaction";

let block = new Block(1, '1234', 'Sold a house for $2,000,000');

(async ()=>{
    let transaction = new Transaction(1, block, 100, 1, 2, block.getInfo()!);
    var hash;
    console.log(transaction, hash == (await block.getHash()));
})();