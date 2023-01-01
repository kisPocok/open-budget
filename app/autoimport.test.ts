import { findConverter } from './autoimport'

interface Converter {
    name: string
    class: string
    filePatternRegex: RegExp
}

const haystack = "almafa"

test("Finding the right type", () => {
    const converter:Converter[] = [
        {name: "dummy", class: "", filePatternRegex: new RegExp(/almafa/)}
    ]
    
    const find = findConverter(haystack, converter)

    expect(find.name).toBe("dummy")
})

test("No match throws error", () => {
    const converter:Converter[] = [
        {name: "dummy", class: "", filePatternRegex: new RegExp(/no-match/)}
    ]
    
    function findConverterNoMatch() {
        const find = findConverter(haystack, converter)
    }

    expect(findConverterNoMatch).toThrowErrorMatchingSnapshot()
})

test("Multiple result returns the first match", () => {
    const converter:Converter[] = [
        {name: "dummy-first", class: "", filePatternRegex: new RegExp(/no-match/)},
        {name: "dummy-second", class: "", filePatternRegex: new RegExp(/almafa/)},
        {name: "dummy-third", class: "", filePatternRegex: new RegExp(/almafa/)}
    ]
    
    const find = findConverter(haystack, converter)

    expect(find.name).toBe("dummy-second")
})