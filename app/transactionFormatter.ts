import Transaction from "./transaction";
import * as Converters from "./converter/";

export const CreateTransactionFormatterByClassName = (className: string): TransactionFormatter => {
    return new (<any>Converters)[className]();
  } 

export interface TransactionFormatter {
    format(rawTransaction: string): Transaction
    priceToInt(price: string): number
}

// export interface TranscationHandler {
//     handler(): Function;
// }

export class BaseTransactionFormatter implements TransactionFormatter {
    // handler(): Function {
    //     const self = this
    //     return function(): TransactionFormatter {
    //         return {
    //             format: self.format,
    //             priceToInt: self.priceToInt,
    //         }
    //     }
    // }
    format(rawData: string): Transaction { throw new Error("'format' must be implemented in inheritated class!") }
    priceToInt(price: string): number { return +price }
}
