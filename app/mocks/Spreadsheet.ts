import { SimplifiedSheet } from '../importer'

export class MockSheet implements SimplifiedSheet {
    appendRow(s: Object[]): SimplifiedSheet {
        return this
    }
    getRange(s: string): SimplifiedSheet {
        return this
    }
}
