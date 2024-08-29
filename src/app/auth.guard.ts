import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userRole = sessionStorage.getItem('role');
   
    // Autoriser l'accès à /admin-dashboard uniquement pour les admins
    if (userRole === 'ADMIN' && state.url.startsWith('/admin')) {
      return true;
    }
    
    if (userRole === 'CLIENT' && state.url.startsWith('/user')) {
      return true;
    }
    if (userRole === 'CHAUFFEUR' && state.url.startsWith('/user')) {
      return true;
    }
    if (userRole === 'RESTO' && state.url.startsWith('/user')) {
      return true;
    }
    // Autoriser l'accès à la page d'accueil pour tous les utilisateurs
    if (state.url === '/login') {
      return true;
    }

    // Si l'utilisateur essaie d'accéder à une route non autorisée
    alert('Vous n\'êtes pas autorisé à accéder à cette page.');
    
    // Rediriger vers la page de connexion ou une autre page spécifique
    this.router.navigate(['/login']);
    return false;
  }
 
}





