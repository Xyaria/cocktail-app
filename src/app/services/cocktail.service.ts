import { Observable } from 'rxjs';
import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CocktailService{
    constructor(private _http: HttpClient){}

    getCocktail(): Observable<any> {
        return this._http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    }

    getOneCocktail(id: number): Observable<any> {
        return this._http.get<any>(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    }
}
