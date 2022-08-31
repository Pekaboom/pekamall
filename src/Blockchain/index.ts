import Block from "./modules/Block";
import Transaction from "./modules/Transaction";
import User from "./modules/User";

var block = new Block(1, new User(1, 'test@123.com', 'Abel', '1234'), 'Sold a house for $2,000,000');

(async (block)=>{
    
    let transaction = new Transaction(1, block, 100, 1, 2, block.getInfo()!, await block.getHash());
    console.log('\r\n', transaction, '\r\n', transaction.getBlock(), '\r\n', transaction.getBlock().getAuthor());

})(block);