import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  

  constructor(private stompClient: Stomp.Client) {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection() {
    const socket = new SockJS('http://localhost:8080/notifications'); // Remplacez l'URL par celle de votre serveur
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/notifications', (message) => {
        console.log('Notification received:', message.body);
        // Ajoutez ici la logique pour traiter et afficher la notification
      });
    });
  }
}
