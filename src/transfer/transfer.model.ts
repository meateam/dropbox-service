import * as mongoose from 'mongoose';
import { Destination, ITransfer } from './transfer.interface';

const transferScheme: mongoose.Schema = new mongoose.Schema({
  fileID: {
    type: String,
    required: true,
  },
  fileOwnerID: {
    type: String,
    required: true,
  },
  classification: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  sharerID: {
    type: String,
    required: true,
  },
  reqID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  destination: {
    type: Destination,
    default: Destination.TOMCAL,
    required: false,
  },
});

export const transferModel = mongoose.model<ITransfer & mongoose.Document>('Transfer', transferScheme);
