import { Image } from "./Image";
import { Role } from "./Role";
export class Restaurant {
   userID!: number;
    firstName!: string;
    adress!: string;
    phoneNumber!: string;
    image!: Image;
    location!:string;
    lastName!: string;
    email!:string;
    role!:Role.Resto;
    password!: string;
    address!: string;
    dateOfBirth!: Date;
    registrationDate?: Date;
    preferredLanguage!: string;
    
    }