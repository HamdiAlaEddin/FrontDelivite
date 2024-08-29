import { LogHistorique } from "./LogHistorique";
import { TypeVehicule } from "./typeVehicule";

export interface Vehicule {
    vehiculeID: number;
    marque: string;
    modele: string;
    immatriculation: string;
    type: TypeVehicule;
    couleur: string;
    loghs: LogHistorique[]; // Liste des logs associés
  }