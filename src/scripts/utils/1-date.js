/* ******************************************************************************
 * DATE
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


export {
    dateDDMMYYFormatTest,
    dateToDDMMYYYY,
    dateToDMYY,
    dmyyToDate,
    dmyyToDDMMYY,
    datedmyyToDDMMYY,
    dateFormatToDMYY,
    startOfWeek,
    dateChangeDays
}
