import { webcrypto } from "crypto";
import Block from "./Block";

/** @module Transaction Class */
class Transaction {
    private id: number|undefined = undefined;
    private blockData: Block|undefined = undefined;
    private points: number = 0;
    private author: number|undefined = undefined;
    private recipient: number|undefined = undefined;
    private transactionInfo: string|undefined = undefined;
    private hash: Promise<string>|undefined = undefined;
    private previousHash: number|string|'0' = '0';
    private timestamp: number|undefined = undefined;

    /**
     * @param id It is the transaction ID
     * @param blockData It holds the (@module Block data) of each transaction
     * @param points It is the reward point awarded for each transaction, usually the balance debited from a sender (@param author) to a receiver (@param recipient)
     * @param author It is the creator or sender of a transaction
     * @param recipient It is the receiver of a transaction
     * @param transactionInfo It holds information about the transaction
     * @param previousHash This is the hash of the most recent transaction, previously created
     */
    constructor(id:number, blockData:Block, points:number, author:number, recipient:number, transactionInfo:string, previousHash:number|string){
        this.id = id;
        this.blockData = blockData;
        this.points = points;
        this.author = author;
        this.recipient = recipient;
        this.transactionInfo = transactionInfo;

        // generete transaction hash
        this.hash = this.generateHash(previousHash);

        // update timestamp
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
        this.blockData = data;
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
    
    /** Get block hash */
    getBlockHash(): Promise<string> {
        return this.blockData!.getHash()!;
    }

    /** Get transaction hash */
    getHash(): Promise<string> {
        return this.hash!;
    }

    /** Get block */
    getBlock(): Block {
        return this.blockData!;
    }

    /** Method to generate new block hash */
    async generateHash(previousHash:number|string): Promise<string> {
        let encoder = new TextEncoder();
        let blockhash = await this.getBlockHash();
        let encodedData = encoder.encode(previousHash.toString() + blockhash.toString() + JSON.stringify(this));
        let buffer = await webcrypto.subtle.digest('SHA-256', encodedData);
        
        let hash = Array.from(new Uint8Array(buffer)).map(array=>{
            return array.toString(16).padStart(2, '0');
        }).join('');

        return hash;
    }

}

export default Transaction;