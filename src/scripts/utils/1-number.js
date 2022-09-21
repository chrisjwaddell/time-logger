// Suggestion - trim before it
function isDecimal(num) {
    return /^\d+(\.\d+)?$/.test(num)
}

// isDecimal("3") // true
// isDecimal("3.") // false
// isDecimal("3.1") // true
// isDecimal("3.22") // true
// isDecimal("a3.22") // false
// isDecimal("3.2.2") // false

export {
    isDecimal
}
