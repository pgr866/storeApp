import { Injectable, inject } from '@angular/core';
import { Auth, user, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  public user$ = user(this.auth);
  public currentUser = toSignal(this.user$);

  async login(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      let customMessage = 'Ha ocurrido un error inesperado';
      switch (error.code) {
        case 'auth/invalid-credential':
          customMessage = 'El usuario no existe o la contraseña es incorrecta.';
          break;
        case 'auth/too-many-requests':
          customMessage = 'Demasiados intentos fallidos. Inténtalo más tarde.';
          break;
        case 'auth/user-disabled':
          customMessage = 'Esta cuenta ha sido deshabilitada.';
          break;
        default:
          customMessage = 'Error al iniciar sesión: ' + error.message;
      }
      throw new Error(customMessage);
    }
  }

  async logout() {
    return signOut(this.auth);
  }

  getUID() {
    return this.auth.currentUser?.uid;
  }
}
