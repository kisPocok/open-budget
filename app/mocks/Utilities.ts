import { GoogleUtilities } from '../csv'

export class MockUtilities implements GoogleUtilities {
    parseCsv(s: string): string[][] {
        return [
            ['a', 'aa'],
            ['b', 'bb']
        ]
    }
}
