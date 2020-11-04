export class User {
    email:string ="";
    password?:string ="";
    deviceId:string;
}

export class NewUser {
    name:string = "";
    email:string = "";
    phoneNumber:string = "";
    password:string;
    password1:string = "";
    password2:string = "";
    companyName:string = "";
    companyAddress:string = "";
    currency:string;
    pictureUrl:any;
    deviceId:string;
}

export interface response {
    status:string;
    message:string;
    apiToken?:string;
    data:any;
}

export class UpdateUser {
    name:string;
    email:string;
    phoneNumber:string;
    companyName:string;
    companyAddress:string;
    pictureUrl:any;
}

export class NewJob {
    companyName:string = "";
    contactName:string = "";
    contactNumber:string = "";
    comment:string = "";
}
