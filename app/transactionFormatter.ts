import * as Converters from "./converter/";
import Transaction from "./transaction";
import { TransactionFormatter } from "./types/transaction";


export const CreateTransactionFormatterByClassName = (className: string): TransactionFormatter => {
    return new (<any>Converters)[className]();
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
