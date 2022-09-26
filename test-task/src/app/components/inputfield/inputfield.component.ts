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
    if(this.firstForm.get('currency')?.value! !== "" && this.secondForm.get('currency')?.value !== ""){
      let conversionRate = this.calculateConversionRate(this.firstForm.get('currency')?.value!, this.secondForm.get('currency')?.value!)
      this.secondForm.get('value')?.setValue(this.firstForm.get('value')?.value!/conversionRate, {emitEvent:false})
    }
  }

  calculateFromSecond(){
    if(this.firstForm.get('currency')?.value! !== "" && this.secondForm.get('currency')?.value !== ""){
      let conversionRate = this.calculateConversionRate(this.secondForm.get('currency')?.value!, this.firstForm.get('currency')?.value!)
      this.firstForm.get('value')?.setValue(this.secondForm.get('value')?.value!/conversionRate, {emitEvent:false})
    }
  }
}
