import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeRates} from '../interface/exchangeRates';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  readonly URL = "https://api.apilayer.com/exchangerates_data/latest"

  constructor(private http:HttpClient) { }

  
  

  getRates(base:string):Observable<ExchangeRates>{
    const headers = new HttpHeaders({"apikey":"XQ8cPpdRLSvmJeMcIonXfgUVatqAXVna"})
    const params = new HttpParams().set("base", base).set("symbols", "USD, EUR, UAH")
    return this.http.get<ExchangeRates>(this.URL, {
      headers:headers,
      params:params
    })
  }

}
