"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module Transaction Class */
class Transaction {
    id = undefined;
    data = undefined;
    points = 0;
    author = undefined;
    recipient = undefined;
    transactionInfo = undefined;
    timestamp = undefined;
    /**
     * @param id It is the transaction ID
     * @param data It holds the (@module Block data) of each transaction
     * @param points It is the reward point awarded for each transaction, usually the balance debited from a sender (@param author) to a receiver (@param recipient)
     * @param author It is the creator or sender of a transaction
     * @param recipient It is the receiver of a transaction
     * @param transactionInfo It holds information about the transaction
     */
    constructor(id, data, points, author, recipient, transactionInfo) {
        this.id = id;
        this.data = data;
        this.points = points;
        this.author = author;
        this.recipient = recipient;
        this.transactionInfo = transactionInfo;
        this.updateTimestamp();
    }
    /** @method sets reward points */
    setPoints(points) {
        this.points = points;
        this.updateTimestamp();
    }
    /** @method sets recipient's id */
    setRecipient(recipient) {
        this.recipient = recipient;
        this.updateTimestamp();
    }
    /** @method updates transaction block data */
    updateBlockData(data) {
        this.data = data;
        this.updateTimestamp();
    }
    /** @method updates transaction information */
    updateTransactionInfo(transactionInfo) {
        this.transactionInfo = transactionInfo;
        this.updateTimestamp();
    }
    /** @method updates timestamp */
    updateTimestamp() {
        this.timestamp = new Date().getTime();
    }
}
exports.default = Transaction;
