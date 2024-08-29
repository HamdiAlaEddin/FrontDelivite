import { Image } from "./Image";
import { Role } from "./Role";
export class Admin {
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
    registrationDate?: Date;
    location!:string;
    role!:Role.Admin;
    
    }