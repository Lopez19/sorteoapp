import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SorteosService {
  // Variables
  private _url = 'https://sorteoapp-api-production.up.railway.app/api';

  // Constructor
  constructor(private http: HttpClient) {}

  // Método para obtener los sorteos
  getSorteos() {
    return this.http.get<any>(`${this._url}/sorteos`);
  }

  // Método para obtener un sorteo
  getSorteo(id: any) {
    return this.http.get<any>(`${this._url}/sorteos/${id}`);
  }

  // Método para unirse a un sorteo
  joinSorteo(id: string, data: any) {
    return this.http.put<any>(`${this._url}/sorteos/participantes/${id}`, data);
  }

  // Método para comenzar un sorteo
  startSorteo(id: string) {
    return this.http.put<any>(`${this._url}/sorteos/start/${id}`, {});
  }

  // Método para obtener el ganador
  getWinner(id: string) {
    return this.http.get<any>(`${this._url}/sorteos/winner/${id}`);
  }

  // Metodo para eliminar un sorteo
  deleteSorteo(id: string) {
    return this.http.delete<any>(`${this._url}/sorteos/${id}`);
  }
}
