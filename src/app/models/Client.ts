import { Image } from "./Image";
import { Role } from "./Role";
export class Client {
    userID!: number;
    firstName!: string;
    lastName!: string;
    password!: string;
    email!:string;
    address!: string;
    phoneNumber!: string;
    image!: File;
    preferredLanguage!: string;
    dateOfBirth!: Date;
    deliveriesCount!:number;
    lastQuarterlyDiscountDate!: Date;
    registrationDate?: Date;
    location!:string;
    role!:Role.Client;
    
    }