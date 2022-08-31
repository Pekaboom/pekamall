import { webcrypto } from "crypto";
import User from "./User";

class Block {

    private id: number|undefined = undefined;
    private hash: Promise<string>|undefined = undefined;
    private blockInfo: string|undefined = undefined;
    private timestamp:number|undefined = undefined;
    private author: User|undefined = undefined;

    constructor (id:number, author:User, blockInfo:string) {
        this.id = id;
        this.blockInfo = blockInfo;
        this.timestamp = (new Date()).getTime();
        this.hash = this.generateHash();
        this.author = author.getUserData();
    }

    /** Method to generate new block hash */
    async generateHash(): Promise<string> {
        let encoder = new TextEncoder();
        let encodedData = encoder.encode(JSON.stringify(this));
        let buffer = await webcrypto.subtle.digest('SHA-256', encodedData);
        
        let hash = Array.from(new Uint8Array(buffer)).map(array=>{
            return array.toString(16).padStart(2, '0');
        }).join('');
            
        return hash;
    }

    /** Get hash of block */
    async getHash(): Promise<string> {
        let hash:string = await this.hash!;
        return hash;
    }

    /** Get timestamp */
    getTimestamp(): number|undefined {
        return this.timestamp;
    }

    /** Get block info */
    getInfo(): string|undefined {
        return this.blockInfo;
    }

    /** Get author */
    getAuthor(): User {
        return this.author!;
    }
}

export default Block;