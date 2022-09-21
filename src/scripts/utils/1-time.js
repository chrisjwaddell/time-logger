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

export {
    timeHMTo24Hr,
    hmToHHMM,
    timeHMToHHMM,
    startOfDay,
    timeDiff
}
