import { Chauffeur } from "./Chauffeur";
import { Client } from "./Client";
import { LogHistorique } from "./LogHistorique";
import { StatusLivraison } from "./statusLivraison";
import { TypeLivraison } from "./typeLivraison";
import { TypePayement } from "./typePayement";
import { Vehicule } from "./Vehicule";

export interface Livraison {
    livraisonID: number;
    status: StatusLivraison;
    type: TypeLivraison ;
    paiement: TypePayement;
    dateCommande: Date;
    dateLivraison: Date;
    adresseLivraison: string;
    Client: Client;
    position: string; // GPS
    prix: number;
    description: string;
    chauf: Chauffeur; // Relation avec Chauffeur
    Vehicule: Vehicule;
    loghs: LogHistorique[]; // Liste des logs
  }