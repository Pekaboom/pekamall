import { webcrypto } from "crypto";

class User {

    private id: number|undefined = undefined;
    private email: string|undefined = undefined;
    private username: string|undefined = undefined;
    private passwordHash: Promise<string>|undefined = undefined;

    constructor (id:number, email:string, username:string, password:string){
        this.id = id;
        this.email = email;
        this.username = username;
        this.passwordHash = this.encryptPassword(password);
        this.getUserData();
    }

    private async encryptPassword(password:string): Promise<string> {
        return password;
        let encoder = new TextEncoder();
        let encodedData = encoder.encode(JSON.stringify(this.username) + JSON.stringify(this.email) + JSON.stringify(password));
        let buffer = await webcrypto.subtle.digest('SHA-256', encodedData);
        
        let hash = Array.from(new Uint8Array(buffer)).map(array=>{
            return array.toString(16).padStart(2, '0');
        }).join('');
            
        return hash;
    }

    getUserData(): User {
        let _this = JSON.stringify(this);
        let data: User = JSON.parse(_this);
        delete data.passwordHash;
        return data;
    }

    getPasswordHash(): Promise<string> {
        return this.passwordHash!;
    }
}

export default User;