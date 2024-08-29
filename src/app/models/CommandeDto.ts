export interface Commandedto {
    livraisonID: number;
    status: string;
    type: string;
    paiement: string;
    dateCommande: Date;
    dateLivraison: Date;
    adresseLivraison: string;
    clientFirstName: string;
    clientLastName: string;
    position: string;
    prix: number;
    description: string;
    chaufFirstName: string;
    chaufLastName: string;
    vehiculeMarques: string;
  }