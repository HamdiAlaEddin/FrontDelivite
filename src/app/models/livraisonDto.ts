export interface LivraisonDto {
    livraisonID: number;
    status: string;
    type: string;
    paiement: string;
    dateCommande: Date;
    dateLivraison: Date;
    adresseLivraison: string;
    clientFirstName: string;
    clientPhone: string;
    position: string;
    prix: number;
    description: string;
    chaufFirstName: string;
    chaufPhone: string;
    vehiculeDetails: string;
}