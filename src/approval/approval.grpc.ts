import { ApprovalService } from "./approval.service";
import { getToken } from "../spike/spike.service";
import { config } from "../config";

export class ApprovalMethods {
    private approvalService: ApprovalService;

    constructor() {
        const token = getToken(config.spike.audiance, config.spike.grantType);
    }
}