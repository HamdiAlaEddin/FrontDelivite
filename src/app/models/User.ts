import { Image } from "./Image";
import { Role } from "./Role";
export class User {
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
    disponible!: boolean;
    accepted!: boolean;
    numPermisConduit!: string;
    registrationDate?: Date;
    deliveriesCount!:number;
    lastQuarterlyDiscountDate!: Date;
    location!:string;
    role!:Role;
    }
    export interface LoginRequest{
        username:string
        password:string
    }
    export interface LoginResponse {
        status: number;
        message: string;
        role:string;
        token?: string;
    }