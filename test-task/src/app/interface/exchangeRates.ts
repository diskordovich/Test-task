export interface ExchangeRates{
    base:string
    rates: Rates
    success:boolean
}

export interface Rates{
    EUR:number,
    USD:number,
    UAH:number
}