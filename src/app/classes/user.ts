export class User {
    email: string = "";
    password?: string = "";
    deviceId: string;
}

export class NewUser {
    name: string = "";
    email: string = "";
    phoneNumber: string = "";
    password: string;
    password1: string = "";
    password2: string = "";
    companyName: string = "";
    companyAddress: string = "";
    currency: string;
    pictureUrl: any;
    deviceId: string;
}

export interface response {
    status: string;
    message: string;
    apiToken?: string;
    data: any;
}

export class UpdateUser {
    name: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    companyAddress: string;
    pictureUrl: any;
}

export class UpdatePassword {
    oldPassword: string;
    newPassword: string;
    newPassword2: string;
}

export class NewJob {
    id?:number;
    jobName: string = "";
    companyName: string = "";
    companyAddress: string = "";
    contactName: string = "";
    contactNumber: string = "";
    comment: string = "";
}

export class Quotation {
    salesPerson: string;
    quotationValidity: number;
    paymentTerms: string;
    refNumber: number;
    deliveryDate: string;
    currency: string;
    subTotalJobCost: number;
    totalJobCost: number;
    profit: number;
    comment: string;
    jobId: number;
    items: Item[];
    payments: Payment[];

    constructor(jobId:number) {
        this.salesPerson = "";
        this.quotationValidity = 0;
        this.paymentTerms = "";
        this.profit = 0;
        this.jobId = jobId;
        this.items = [];
        this.payments = [];
    }
}

export class Item {
    SN?:number;
    itemName: string;
    UOM: string;
    unitPrice: number;
    quantity: number;
    totalPrice?: number;
}

export class Payment {
    SN?:number;
    paymentName: string;
    paymentType: string;
    amount: number;
}
