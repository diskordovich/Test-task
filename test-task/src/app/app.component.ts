
import { Component, OnInit } from '@angular/core';
import { ExchangeRates, Rates } from './interface/exchangeRates';
import { RequestService } from './service/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(private reqestServise:RequestService){
    type RateArray={
      rates:Array<ExchangeRates>
    }
  }

  rateArray=new Array<ExchangeRates>()
  

  USD:ExchangeRates = {
    base: "USD",
    rates:{ USD: 1, EUR: 1.008165, UAH: 37.094705 },
    success:true
  }
  EUR:ExchangeRates = {
    base: "USD",
    rates:{USD: 0.991901, EUR: 1, UAH: 36.79428},
    success:true
  }
  UAH:ExchangeRates = {
    base: "UAH",
    rates:{ USD: 0.026958, EUR: 0.027178, UAH: 1 },
    success:true
  }

  ngOnInit(): void {
    this.OnGetFakeRates()
    console.log(this.rateArray)
  }

  OnGetRates():void{
    this.reqestServise.getRates("USD").subscribe({
      next:(result)=>{
        this.rateArray.push(result)
        console.log(this.rateArray)
      },
      error:(e)=>{console.log(e)}
    })

    this.reqestServise.getRates("EUR").subscribe({
      next:(result)=>{
        this.rateArray.push(result)
        console.log(this.rateArray)
      },
      error:(e)=>{console.log(e)}
    })

    this.reqestServise.getRates("UAH").subscribe({
      next:(result)=>{
        this.rateArray.push(result)
        console.log(this.rateArray)
      },
      error:(e)=>{console.log(e)}
    })
  }

  OnGetFakeRates():void{
    this.rateArray.push(this.USD, this.EUR, this.UAH)
  }
  

}
