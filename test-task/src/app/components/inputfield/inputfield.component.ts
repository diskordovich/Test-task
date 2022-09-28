import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ExchangeRates, Rates } from 'src/app/interface/exchangeRates';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.css'],
})

export class InputfieldComponent implements OnInit, OnChanges, OnDestroy {
  private subscriptions: Subscription[] = [];
  @Input() rateArray:Array<ExchangeRates> = []
  nameArray:Array<string> = [""]

  leftForm = new FormGroup({
    value: new FormControl(0),
    currency: new FormControl("")
  })

  rightForm = new FormGroup({
    value: new FormControl(0),
    currency: new FormControl("")
  })

  constructor() {}

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
    this.subscriptions.push(
      this.leftForm.valueChanges.subscribe(()=>{
        this.calculateCurrExchange.bind(this)(this.leftForm, this.rightForm)
      }),
      this.rightForm.get('value')!.valueChanges.subscribe(()=>{
        this.calculateCurrExchange.bind(this)(this.rightForm, this.leftForm)
      }),
      this.rightForm.get('currency')!.valueChanges.subscribe(()=>{
        this.calculateCurrExchange.bind(this)(this.leftForm, this.rightForm)
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }


  calculateConversionRate(fromCurr:string, toCurr:string):number{
    let conversionRateList = this.rateArray.find((val)=>{return val.base===fromCurr})?.rates
    return conversionRateList?conversionRateList[toCurr as keyof typeof conversionRateList]:0
  }

  calculateCurrExchange(firstForm:FormGroup, secondForm:FormGroup){
    if(firstForm.get('currency')?.value! !== "" && secondForm.get('currency')?.value !== ""){
      let conversionRate = this.calculateConversionRate(secondForm.get('currency')?.value!, firstForm.get('currency')?.value!)
      secondForm.get('value')?.setValue(firstForm.get('value')?.value!/conversionRate, {emitEvent:false})
    }
  }

  // Alternatively, in one function:
/*
  But it makes code less readable, so I didn't do it

  calculateCurrExchange(firstForm:FormGroup, secondForm:FormGroup){
    if(firstForm.get('currency')?.value! !== "" && secondForm.get('currency')?.value !== ""){
      let conversionRateList = this.rateArray.find((val)=>{return val.base===secondForm.get('currency')?.value!})?.rates
      let conversionRate = conversionRateList?conversionRateList[firstForm.get('currency')?.value! as keyof typeof conversionRateList]:0
      secondForm.get('value')?.setValue(firstForm.get('value')?.value!/conversionRate, {emitEvent:false})
    }
  }
*/


  
}
