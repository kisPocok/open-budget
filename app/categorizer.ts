import { Config } from "./config";
import { Painter } from "./painter";
import Transaction from "./transaction";

/*
export class Categorizer {
    constructor(n: number) {

    }
  
    almafa(reason: string, err: any) {
      console.log(reason, err)
    }
}
*/

export function getTransactions(painter: Painter): Transaction[] {
    const db = painter.readRows(Config.transactionCoordinates) // whole page
    return db.map((r: (Date | string | number)[]) => new Transaction({
            dueDate: new Date(r[0]),
            account: r[1],
            category: r[2],
            summary: r[3],
            expense: r[4],
            income: r[5],
        })
    )
}
