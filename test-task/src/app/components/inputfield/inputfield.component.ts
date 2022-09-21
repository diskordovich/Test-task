import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ExchangeRates } from 'src/app/interface/exchangeRates';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.css']
})
export class InputfieldComponent implements OnInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    let tempArr:Array<string> = []
    this.rateArray.forEach(element => {
      tempArr.push(element.base)
    });
    this.nameArray = tempArr 
  }

  constructor() { }

  @Input() rateArray:Array<ExchangeRates> = []
  nameArray:Array<string> = []
  firstVal:number = 0
  secondVal:number = 0
  firstCurr:string = ""
  secondCurr:string = ""

  OnFirstValChange(value:string){
    if(Number(value)){
      this.firstVal=Number(value)
      this.calculateFromFirst()
    }
  }

  OnSecondValChange(value:string){
    if(Number(value)){
      this.secondVal = Number(value)
      this.calculateFromSecond()
    }
  }

  OnFirstCurrTypeChange(value:MatSelectChange){
    console.log(value.value)
    this.firstCurr=value.value
    this.calculateFromFirst()
  }

  OnSecondCurrTypeChange(value:MatSelectChange){
    console.log(value.value)
    this.secondCurr=value.value
    this.calculateFromFirst()
  }

  calculateFromFirst(){
    if(this.firstCurr!="" && this.secondCurr!=""){
      let conversionRateList = this.rateArray.find((val)=>{return val.base==this.firstCurr})
      let conversionRate:number = 0;
      switch(this.secondCurr){
        case("EUR"):{
          conversionRate = Number(conversionRateList?.rates.EUR)
          break
        }
        case("USD"):{
          conversionRate = Number(conversionRateList?.rates.USD)
          break
        }
        case("UAH"):{
          conversionRate = Number(conversionRateList?.rates.UAH)
          break
        }
      }
      this.secondVal = this.firstVal * conversionRate;
      console.log(this.rateArray)
    }
  }

  calculateFromSecond(){
    if(this.firstCurr!="" && this.secondCurr!=""){
      let conversionRateList = this.rateArray.find((val)=>{return val.base===this.firstCurr})
      let conversionRate:number = 0;
      switch(this.secondCurr){
        case("EUR"):{
          conversionRate = Number(conversionRateList?.rates.EUR)
          break
        }
        case("USD"):{
          conversionRate = Number(conversionRateList?.rates.USD)
          break
        }
        case("UAH"):{
          conversionRate = Number(conversionRateList?.rates.UAH)
          break
        }
      }
      this.firstVal = this.secondVal / conversionRate;
    }
  }



  ngOnInit(): void {
    let tempArr:Array<string> = []
    this.rateArray.forEach(element => {
      tempArr.push(element.base)
    });
    this.nameArray = tempArr
  }

}
