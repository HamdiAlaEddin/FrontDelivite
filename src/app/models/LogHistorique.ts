import { Incident } from "./Incident";
import { Livraison } from "./Livraison";
import { Vehicule } from "./Vehicule";

export interface LogHistorique {
    logID: number;
    description: string;
    incident: Incident;
    livr: Livraison; // Relation avec Livraison
    vehic: Vehicule; // Relation avec Vehicule
  
  }