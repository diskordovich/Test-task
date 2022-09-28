
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ExchangeRates} from './interface/exchangeRates';
import { RequestService } from './service/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  rateArray=new Array<ExchangeRates>()
  USDtoUAH:string = ""
  EURtoUAH:string = ""

  //Used for testing without API access
  USD:ExchangeRates = {
    base: "USD",
    rates:{ USD: 1, EUR: 1.008165, UAH: 37.094705 },
    success:true
  }
  EUR:ExchangeRates = {
    base: "EUR",
    rates:{USD: 0.991901, EUR: 1, UAH: 36.79428},
    success:true
  }
  UAH:ExchangeRates = {
    base: "UAH",
    rates:{ USD: 0.026958, EUR: 0.027178, UAH: 1 },
    success:true
  }

  constructor(private reqestServise:RequestService){}

  ngOnInit(): void {
    this.onGetRates()
  }

  appendToRateArray(result:any){
    this.rateArray = [...this.rateArray,result]
    this.onGetHeaderRates()
  }

  onGetRates():void{
    this.reqestServise.getRates("USD").subscribe({
      next:this.appendToRateArray.bind(this),
      error:(e:any)=>{console.log(e)}
    })

    this.reqestServise.getRates("EUR").subscribe({
      next:this.appendToRateArray.bind(this),
      error:(e:any)=>{console.log(e)}
    })

    this.reqestServise.getRates("UAH").subscribe({
      next:this.appendToRateArray.bind(this),
      error:(e:any)=>{console.log(e)}
    })
  }

  onGetFakeRates():void{
    this.rateArray.push(this.USD, this.EUR, this.UAH)
    this.onGetHeaderRates()
  }

  onGetHeaderRates():void{
    this.USDtoUAH=String(this.rateArray.find((obj)=>obj.base=="USD")?.rates.UAH)
    this.EURtoUAH=String(this.rateArray.find((obj)=>obj.base=="EUR")?.rates.UAH)
  }
}
