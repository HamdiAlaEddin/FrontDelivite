import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publicite',
  templateUrl: './publicite.component.html',
  styleUrls: ['./publicite.component.css']
})
export class PubliciteComponent implements OnInit{
  totalClients: number = 0;
  newClientsThisMonth: number = 0;
  activeClients: number = 0;
  inactiveClients: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.loadClientStatistics();
  }

  loadClientStatistics(): void {
    // Simulation des données. Remplacez cela par un appel à un service HTTP si nécessaire.
    this.totalClients = 1200;
    this.newClientsThisMonth = 150;
    this.activeClients = 890;
    this.inactiveClients = 310;
  }
}
