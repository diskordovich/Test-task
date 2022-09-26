import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ExchangeRates } from 'src/app/interface/exchangeRates';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.css'],
})
export class InputfieldComponent implements OnInit, OnChanges {

  @Input() rateArray:Array<ExchangeRates> = []
  nameArray:Array<string> = [""]

  firstForm = new FormGroup({
    value: new FormControl(0),
    currency: new FormControl("")
  })

  secondForm = new FormGroup({
    value: new FormControl(0),
    currency: new FormControl("")
  })

  constructor() { 
    this.firstForm.valueChanges.subscribe(()=>{
      this.calculateFromFirst()
    })
    this.secondForm.get('value')?.valueChanges.subscribe(()=>{
      this.calculateFromSecond()
    })
    this.secondForm.get('currency')?.valueChanges.subscribe(()=>{
      this.calculateFromFirst()
    })
  }

  refillRateArray():void{
    let tempArr:Array<string> = []
    this.rateArray.forEach(element => {
      tempArr.push(element.base)
    });
    this.nameArray = tempArr 
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refillRateArray()
  }

  ngOnInit(): void {
    this.refillRateArray()
  }

  calculateConversionRate(fromCurr:string, toCurr:string):number{
    let conversionRateList = this.rateArray.find((val)=>{return val.base===fromCurr})
      switch(toCurr){
        case("EUR"):{
          return Number(conversionRateList?.rates.EUR)
        }
        case("USD"):{
          return Number(conversionRateList?.rates.USD)
        }
        case("UAH"):{
          return Number(conversionRateList?.rates.UAH)
        }
    }
    return 0
  }

  calculateFromFirst(){
    let firstCurrName = this.firstForm.get('currency')?.value
    let secondCurrName = this.secondForm.get('currency')?.value
    if(firstCurrName!="" && secondCurrName!=""){
      let conversionRate = this.calculateConversionRate(secondCurrName?secondCurrName:"", firstCurrName?firstCurrName:"")
      let firstFormVal = this.firstForm.get('value')?.value;
      this.secondForm.get('value')?.setValue(firstFormVal? firstFormVal / conversionRate : 0, {emitEvent:false});
    }
  }

  calculateFromSecond(){
    let firstCurrName = this.firstForm.get('currency')?.value
    let secondCurrName = this.secondForm.get('currency')?.value
    if(firstCurrName!="" && secondCurrName!=""){
      let conversionRate = this.calculateConversionRate(secondCurrName?secondCurrName:"", firstCurrName?firstCurrName:"")
      let secondFormVal = this.secondForm.get('value')?.value;
      this.firstForm.get('value')?.setValue(secondFormVal? secondFormVal / conversionRate : 0, {emitEvent:false});
    }
  }
}
