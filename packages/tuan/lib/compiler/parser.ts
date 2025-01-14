export type TuanTextNode = {
    type: "text" | "interpolation"
    body: string // without {}
}

/**
 * input: `whatever {a} djdfhuj {b.method({ c: 12 })}` 
 * input: `whatever /{a} djdfhuj {b.method({ c: 12 })}` 
 */
export function parseInterpolation(code: string): TuanTextNode[] {
    const out: TuanTextNode[] = []
    let text = ""
    let count = 0
    let current = 0
    let ignore = false

    while (current < code.length) {
        if (code[current] === "\\") {
            ignore = true
        } else if (code[current] === "{" && !ignore) {
            count++
            if (count === 1) {
                current++
                out.push({
                    type: "text",
                    body: text
                })
                text = ""
            }
        } else if (code[current] === "}" && !ignore) {
            count--
            if (count === 0) {
                current++
                // TODO: verify that `text` is an expression using acorn
                out.push({
                    type: "interpolation",
                    body: text
                })
                text = ""
            }
        }
        if (current >= code.length) {
            break
        }
        text += code[current]
        ignore = false
        current += 1;
    }

    if (count !== 0) {
        // TODO: provide more useful information
        throw new Error("Mismatched parentheses");
    }

    if (text.length !== 0) {
        out.push({
            type: "text",
            body: text
        })
    }

    return out
}