import * as mongoose from 'mongoose';
import { dests } from '../config';
import { Destination, ITransfer } from "./transfer.interface";

const transferScheme: mongoose.Schema = new mongoose.Schema({
    fileID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    destination: {
        type: Destination,
        default: dests.Z,
        required: false,
    },
    status: {
        type: String,
        required: false,
    }
});

export const transferModel = mongoose.model<ITransfer & mongoose.Document>('Transfer', transferScheme);
