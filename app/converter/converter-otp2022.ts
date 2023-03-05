import Transaction from '../transaction'
import { TransactionFormatter } from '../types/transaction'

export default class OTP2022 /*extends BaseTransactionFormatter*/ implements TransactionFormatter {
    format(rawData: string): Transaction {
        const rawAmount = rawData[10]
        const amount = this.priceToInt(rawAmount)
        return new Transaction({
            dueDate: new Date(rawData[0]),
            account: rawData[8],
            category: rawData[6],
            summary: rawData[7],
            expense: amount < 0 ? Math.abs(amount) : 0,
            income: amount > 0 ? amount : 0,
        })
    }

    priceToInt(price: string): number {
        if (!price) {
            return 0
        }
        return +price.replace(/\s/g, '').trim()
    }
}
