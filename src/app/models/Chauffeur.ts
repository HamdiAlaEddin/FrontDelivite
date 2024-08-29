import { Image } from "./Image";
import { Role } from "./Role";
export class Chauffeur {
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
    location!:string;
    role!:Role.Chauffeur;
    
    }