import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Incident } from 'src/app/models/Incident';
import { LogHistorique } from 'src/app/models/LogHistorique';
import { StatusLivraison } from 'src/app/models/statusLivraison';
import { TypeLivraison } from 'src/app/models/typeLivraison';
import { TypePayement } from 'src/app/models/typePayement';
import { TypeVehicule } from 'src/app/models/typeVehicule';
import { LivraisonserviceService } from 'src/app/services/livraisonservice/livraisonservice.service';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';

@Component({
  selector: 'app-historilog',
  templateUrl: './historilog.component.html',
  styleUrls: ['./historilog.component.css']
})
export class HistorilogComponent {
  logs: LogHistorique[] = [];

  constructor(private logService: LivraisonserviceService,
    private router: Router,
    private clientservice:UserserviceService
  ) {}

  ngOnInit(): void {
    this.logService.getAllLogs().subscribe(data => {
      this.logs = data;
    });
  }

  deleteLog(id: number): void {
    this.logService.deleteLog(id).subscribe(() => {
      this.logs = this.logs.filter(log => log.logID !== id);
    });
  }
  logOut(){
    this.clientservice.logout();
    this.router.navigate(['/login']);
  }
}
