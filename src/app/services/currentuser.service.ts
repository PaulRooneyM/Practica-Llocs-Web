import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUser: string | null = null;

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}
