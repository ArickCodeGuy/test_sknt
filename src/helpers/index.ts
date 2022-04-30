// input 123123 : number
// output '123 123 ₽' : string
function numToPrice(number: number, currency: string = '₽') {
    return new Intl.NumberFormat('ru-RU').format(number) + ` ${currency}`
}

export {
    numToPrice
}