import Block from "./Block";

/** @module Transaction Class */
class Transaction {
    private id: number|undefined = undefined;
    private data: Block|undefined = undefined;
    private points: number = 0;
    private author: number|undefined = undefined;
    private recipient: number|undefined = undefined;
    private transactionInfo: string|undefined = undefined;
    private timestamp: number|undefined = undefined;

    /**
     * @param id It is the transaction ID
     * @param data It holds the (@module Block data) of each transaction
     * @param points It is the reward point awarded for each transaction, usually the balance debited from a sender (@param author) to a receiver (@param recipient)
     * @param author It is the creator or sender of a transaction
     * @param recipient It is the receiver of a transaction
     * @param transactionInfo It holds information about the transaction
     */
    constructor(id:number, data:Block, points:number, author:number, recipient:number, transactionInfo:string){
        this.id = id;
        this.data = data;
        this.points = points;
        this.author = author;
        this.recipient = recipient;
        this.transactionInfo = transactionInfo;
        this.updateTimestamp();
    }


    /** @method sets reward points */
    setPoints(points:number): void {
        this.points = points;
        this.updateTimestamp();
    }

    /** @method sets recipient's id */
    setRecipient(recipient: number): void {
        this.recipient = recipient;
        this.updateTimestamp();
    }

    /** @method updates transaction block data */
    updateBlockData(data:Block): void {
        this.data = data;
        this.updateTimestamp();
    }

    /** @method updates transaction information */
    updateTransactionInfo(transactionInfo:string): void {
        this.transactionInfo = transactionInfo;
        this.updateTimestamp();
    }

    /** @method updates timestamp */
    updateTimestamp(): void {
        this.timestamp = new Date().getTime();
    }
}

export default Transaction;