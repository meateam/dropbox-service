import * as mongoose from 'mongoose';
import { IRequest } from "./request.interface";

const requestScheme: mongoose.Schema = new mongoose.Schema({
    reqID: {
        type: String,
        required: true,
    },
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
    }
});

export const uploadModel = mongoose.model<IRequest & mongoose.Document>('Requset', requestScheme);
