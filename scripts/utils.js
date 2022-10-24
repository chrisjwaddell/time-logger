const isEmpty = s => !s || !s.trim();


/* ******************************************************************************
// ^OBJECT
 *******************************************************************************/

function isObjectEmpty(value) {
    return (
        Object.prototype.toString.call(value) === '[object Object]' &&
        JSON.stringify(value) === '{}'
    );
}


function by(propName, desc = false) {
    return (a, b) => {
        if (a[propName] > b[propName]) return (desc) ? -1 : 1;
        if (a[propName] < b[propName]) return (desc) ? 1 : -1;
        return 0;
    }
}


// Object :: Array
// Takes an object and converts all key: value pairs to an array with
// [ { properptyname1: key, properptyname2: value }, ..... ]
function keyValueToArray(obj, propertyname1, propertyname2) {
    if (!validPropertyName(propertyname1) || !validPropertyName(propertyname2)) {
        return "Property names invalid"
    }

    return Object.entries(obj).reduce((acc, [k, v]) => [...acc, {
        [propertyname1]: k,
        [propertyname2]: v
    }], [])

    function validPropertyName(str) {
        // check if str meets the requirements
        return /^[^0-9][a-zA-Z0-9$_]+$/.test(str)
    }
}




/* ******************************************************************************
// ^ARRAY
 *******************************************************************************/

// return from index to the end of the array
function theRest(arr, index) {
    let len = arr.length

    if (len === 0) return []
    if (index > len) return []

    return arr.slice(index, len)
}

let arr = [10, 4, 3, 2]
theRest(arr, 0) // [10, 4, 3, 2]
theRest(arr, 1) // [4, 3, 2]
theRest(arr, 3) // [2]
theRest(arr, 8) // []






/* ******************************************************************************
// ^NUMBER
 *******************************************************************************/

function isNumber(char) {
    return /^\d$/.test(char);
}

function isNumberSign(char) {
    return /^[+|-]*\d$/.test(char);
}


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



/* ******************************************************************************
// ^STRING
 *******************************************************************************/

// Count the number of occurrences of a string in another one
function countOccurrences(mainstring, searchstring) {
    let findExp = new RegExp(searchstring, "g");
    let count = (mainstring.match(findExp) || []).length;

    return count
}



// String :: Number
// Given a string, it returns only the consecutive numbers
// It will stop when numbers don't occur
function findConsecutiveNumbers(stringwithnumbers) {
    let idx = 0
    let found = [...stringwithnumbers].findIndex(cv => !isNumber(cv))

    if (found === -1) {
        return Number(stringwithnumbers)
    }

    return Number(stringwithnumbers.slice(idx, found))
}




/* ******************************************************************************
// ^DOM
 *******************************************************************************/

function appendChild(el, child) {
    return el.appendChild(child);
}

function createElementAtt(parent, element, cls, att, text) {
    var el = document.createElement(element)
    // debugger

    if (text) {
        el.textContent = text;
    }

    cls.forEach((item) => {
        el.classList.add(item)
    })

    att.forEach((i) => {
        el.setAttribute(i[0], i[1])
    })

    return (parent && appendChild(parent, el)) || el;
}


// Good for multi-select lists with an 'Unselect' button
// The class that is used to signify or highlight that an
// item is selected is 'selectclass'
function listUnselectAllItems(listelement, selectclass) {
    [].forEach.call(listelement.children, (cv) => {
        cv.classList.remove(selectclass)
    })
}


function listNothingSelected(parentUL, selectcase) {
    return [].every.call(parentUL.children, (cv) => cv.classList.contains(selectcase) === false)
}

// selectclass is the class that is used to show
// that the item is selected
function listFindSelected(parentUL, selectclass) {
    return [].findIndex.call(parentUL.children, (cv) => cv.classList.contains(selectclass))
}


function listIndexText(parentUL, index) {
    return parentUL.children[index] ? parentUL.children[index].textContent : ''
}





/* ******************************************************************************
// ^DATE
 *******************************************************************************/


// Detect if a string is in valid dd/mm/yy format
// Assumes year starts with "20"
function dateDDMMYYFormatTest(date) {
    let da = date.trim()

    let dateTime = /\d{1,2}\/\d{1,2}\/\d{2}/;
    if (!dateTime.test(da)) return false

    let [d, m, y] = da.split("/").map(cv => Number(cv))

    if ((m < 1) || (m > 12)) return false

    if ((m === 4) || (m === 6) || (m === 9) || (m === 11)) {
        if (d > 30) return false
    } else {
        if (d > 31) return false

        if ((m === 2) && (d > 29) && (isLeap("20" + y))) {
            return false
        } else {
            if ((m === 2) && (d > 28) && (!isLeap("20" + y))) return false
        }
    }

    if (d < 1) return false

    if (String(y).length !== 2) return false

    return true
}

const isLeap = (year) => {
    if (year % 400 === 0) return true
    else if (year % 100 === 0) return false
    else if (year % 4 === 0) return true
    else return false
}



function dateToDDMMYYYY(dt, seperator = "/") {
    let da = new Date(dt)

    let d = da.getDate() < 10 ? "0" + da.getDate() : da.getDate()
    let m = da.getMonth() < 9 ? "0" + Number(da.getMonth() + 1) : Number(da.getMonth() + 1)
    let y = da.getFullYear()
    return d + seperator + m + seperator + y
}

// Assumes all dates in 2000 to 2099
function dateToDMYY(dt, seperator = "/") {
    let da = new Date(dt)

    let d = da.getDate() < 10 ? da.getDate() : da.getDate()
    let m = da.getMonth() < 9 ? Number(da.getMonth() + 1) : Number(da.getMonth() + 1)
    let y = String(da.getFullYear()).replace("20", "")
    return d + seperator + m + seperator + y
}


function dmyyToDate(d, m, y, seperator = "/") {
    return new Date(2000 + Number(y), m - 1, d, 0, 0, 0)
}

// Assumes all dates in 2000 to 2099
// Takes numbers returns a dd/mm/yy string
function dmyyToDDMMYY(d, m, y, seperator = "/") {
    let dd = d < 10 ? "0" + d : d
    let mm = m < 10 ? "0" + m : m
    let yy = y < 10 ? "0" + y : y
    return dd + seperator + mm + seperator + yy
}


// Assumes all dates in 2000 to 2099
// Takes d/m/yy string and returns a dd/mm/yy string
function datedmyyToDDMMYY(dateDMYY, seperator = "/") {
    let [d, m, y] = dateDMYY.split(seperator).map(cv => Number(cv))
    return dmyyToDDMMYY(d, m, y, seperator)
}

// Turn dmyy format into a date so we can
// search on date criteria
// Assumes after "2000"

// turns d, m, y to d/m/yy format. To guarantee
// dd turns to d eg "05" to "5"
function dateFormatToDMYY(d, m, y, seperator = "/") {
    let da = Number(d)
    let mo = Number(m)
    let ye = y

    if (ye.length === 4)
        ye = ye.slice(2)
    ye = Number(ye)

    return da + seperator + mo + seperator + ye
}

function startOfWeek(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}


// Go forward or back x days
function dateChangeDays(dt, days) {
    var d = new Date(dt);
    return new Date(d.setDate(d.getDate() + days));
}


function timeHMTo24Hr(h, m, ap) {
    let hh = h
    if (ap === "PM" && Number(h) !== 12) hh = Number(h) + 12
    return `${hh}:${m}`
}


// Takes numbers returns a dd/mm/yy string
function hmToHHMM(h, m, seperator = ":") {
    let hh = h < 10 ? "0" + h : h
    let mm = m < 10 ? "0" + m : m
    return hh + seperator + mm
}


// Takes numbers returns a dd/mm/yy string
function timeHMToHHMM(hmTime, seperator = ":") {
    let [h, m] = hmTime.split(seperator).map(cv => Number(cv))
    return hmToHHMM(h, m, seperator)
}


function startOfDay(dt) {
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0);
}


// Returns a decimal of hours done
// Returns -1 if Start time is greater than end time
// It can't roll over into the next day, if end time is "0:00", that's midnight
// if end time Hrs is "0", check to see if start time is "0" ie early morning
// otherwise it means the start was at night
function timeDiff(start, end) {
    const [startHr, startMin] = start.split(":").map(cv => Number(cv))
    const [endHr, endMin] = end.split(":").map(cv => Number(cv))

    let diffHr
    if (endHr === 0) {
        if (startHr === 0) {
            diffHr = endHr - startHr
        } else {
            diffHr = 24 - startHr
        }
    } else {
        diffHr = endHr - startHr
    }

    let diffMin = (endMin - startMin) / 60

    if (diffHr < 0) {
        diffHr -= 1
        diffMin = 1 - diffMin
    }

    if (diffHr < 0) return -1
    return diffHr + diffMin
}


/* ******************************************************************************
// ^FORM
 *******************************************************************************/

function requiredMsg(msg, overallmsg) {
    return overallmsg = overallmsg === '' ? msg : overallmsg + "\n" + msg
}
