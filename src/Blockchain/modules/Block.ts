import { webcrypto } from "crypto";

class Block {

    private id: number|null = null;
    private previousHash: string|null = null;
    private hash: Promise<string>|null = null;
    private blockInfo: string|null = null;
    private timestamp:number|null = null;

    constructor (id:number, previousHash:string, blockInfo:string) {
        this.id = id;
        this.previousHash = previousHash;
        this.blockInfo = blockInfo;
        this.timestamp = (new Date()).getTime();
        this.hash = this.generateHash(this.id, previousHash, blockInfo, this.timestamp);
    }

    /** Method to generate new block hash */
    async generateHash(id:number, previousHash:string, blockInfo:string, timestamp:number): Promise<string> {
        let encoder = new TextEncoder();
        let data = encoder.encode(id + previousHash + blockInfo + this.timestamp);
        let buffer = await webcrypto.subtle.digest('SHA-256', data);
        
        let hash = Array.from(new Uint8Array(buffer)).map(array=>{
            return array.toString(16).padStart(2, '0');
        }).join('');
            
        return hash;
    }

    /** Get hash of block */
    getHash(): Promise<string>|null {
        return this.hash;
    }

    /** Get timestamp */
    getTimestamp(): number|null {
        return this.timestamp;
    }

    /** Get block info */
    getInfo(): string|null {
        return this.blockInfo;
    }
}

export default Block;