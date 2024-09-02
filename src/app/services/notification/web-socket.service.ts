import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  

  constructor(private stompClient: Stomp.Client) {
    this.connect();
  }

  private connect() {
    const socket = new SockJS('http://localhost:9090/notifications');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);
    });
  }

  public subscribeToNotifications(): Observable<string> {
    return new Observable(observer => {
      this.stompClient.connect({}, frame => {
        this.stompClient.subscribe('/topic/notifications', message => {
          observer.next(message.body);
        });
      });
    });
  }
}
