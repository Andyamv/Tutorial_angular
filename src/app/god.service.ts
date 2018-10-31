import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of } from 'rxjs';  
import { catchError, map, tap } from 'rxjs/operators';

import { God } from './god';
//import { GODS } from './mock-gods';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class GodService {
  
  private godsUrl = 'api/gods';

  constructor( private http: HttpClient, private messageService: MessageService) { }
 
  // Obtener Dioses del servidor
  getGods(): Observable<God[]> {
    return this.http.get<God[]>(this.godsUrl)
    .pipe(
      tap(_ => this.log('fetched gods')),
      catchError(this.handleError('getGods', []))
    );}
  
  /** GET god by id. Return `undefined` when id not found */
  getGodNo404<Data>(id: number): Observable<God> {
    const url = `${this.godsUrl}/?id=${id}`;
    return this.http.get<God[]>(url)
      .pipe(
        map(gods => gods[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} god id=${id}`);
        }),
        catchError(this.handleError<God>(`getGod id=${id}`))
      );
  }

  getGod(id: number): Observable<God> {
    const url = `${this.godsUrl}/${id}`;
    return this.http.get<God>(url).pipe(
      tap(_ => this.log(`fetched god id=${id}`)),
      catchError(this.handleError<God>(`getGod id=${id}`))
    );
  }

    //////// Save methods //////////
 
/* GET gods whose name contains search term */
searchGods(term: string): Observable<God[]> {
  if (!term.trim()) {
    // if not search term, return empty god array.
    return of([]);
  }
  return this.http.get<God[]>(`${this.godsUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found gods matching "${term}"`)),
    catchError(this.handleError<God[]>('searchGods', []))
  );
}

  /** POST: add a new god to the server */
  addGod (god: God): Observable<God> {
    return this.http.post<God>(this.godsUrl, god, httpOptions).pipe(
      tap((god: God) => this.log(`added god w/ id=${god.id}`)),
      catchError(this.handleError<God>('addGod'))
    );
  }

  /** DELETE: delete the god from the server */
  deleteGod (god: God | number): Observable<God> {
    const id = typeof god === 'number' ? god : god.id;
    const url = `${this.godsUrl}/${id}`;
 
    return this.http.delete<God>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted god id=${id}`)),
      catchError(this.handleError<God>('deleteGod'))
    );
  }
 
  /** PUT: update the god on the server */
  updateGod (god: God): Observable<any> {
    return this.http.put(this.godsUrl, god, httpOptions).pipe(
      tap(_ => this.log(`updated god id=${god.id}`)),
      catchError(this.handleError<any>('updateGod'))
    );
  }
 
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a GodService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`GodService: ${message}`);
  }

}