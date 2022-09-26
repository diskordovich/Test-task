import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExchangeRates } from 'src/app/interface/exchangeRates';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.css'],
})
export class InputfieldComponent implements OnInit, OnChanges {

  @Input() rateArray:Array<ExchangeRates> = []
  nameArray:Array<string> = [""]

  
  firstVal = new FormControl(0)
  secondVal = new FormControl(0)
  firstCurr = new FormControl("")
  secondCurr = new FormControl("")
  

  constructor() { 
    this.firstVal.valueChanges.subscribe(()=>{
      this.calculateFromFirst.bind(this)()
    })
    this.secondVal.valueChanges.subscribe(()=>{
      this.calculateFromSecond.bind(this)()
    })
    this.firstCurr.valueChanges.subscribe(()=>{
      this.calculateFromFirst.bind(this)()
    })
    this.secondCurr.valueChanges.subscribe(()=>{
      this.calculateFromFirst.bind(this)()
    })
  }

  

  ngOnChanges(changes: SimpleChanges): void {
    let tempArr:Array<string> = []
    this.rateArray.forEach(element => {
      tempArr.push(element.base)
    });
    this.nameArray = tempArr 
  }

  ngOnInit(): void {
    let tempArr:Array<string> = []
    this.rateArray.forEach(element => {
      tempArr.push(element.base)
    });
    this.nameArray = tempArr
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
    if(this.firstCurr.value!="" && this.secondCurr.value!=""){
      let conversionRate = this.calculateConversionRate(this.secondCurr.value?this.secondCurr.value:"", this.firstCurr.value?this.firstCurr.value:"")
      this.secondVal.patchValue(this.firstVal.value? this.firstVal.value / conversionRate : 0, {emitEvent:false});
    }
  }

  calculateFromSecond(){
    if(this.firstCurr.value!="" && this.secondCurr.value!=""){
      let conversionRate = this.calculateConversionRate(this.firstCurr.value?this.firstCurr.value:"",this.secondCurr.value?this.secondCurr.value:"")
      this.firstVal.setValue(this.secondVal.value? this.secondVal.value / conversionRate : 0, {emitEvent:false});
    }
  }
}
