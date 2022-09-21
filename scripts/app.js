let objData = {}

let previousField = ""

// for testing
let allDataSplit



const elToday = document.querySelector(".today")
const elYesterday = document.querySelector(".yesterday")
const elOtherDate = document.querySelector(".date .otherdate")

const elUL = document.querySelectorAll("ul")
const elCategory = document.querySelector(".category ul")
const elCategoryOpt1 = document.querySelector(".category--1")
const elCategoryOpt2 = document.querySelector(".category--2")
const elCategoryOpt3 = document.querySelector(".category--3")
const elCategoryOpt4 = document.querySelector(".category--4")

const elAddBtn = document.querySelector(".btns .add")


const startAMList = elUL[0]
const startPMList = elUL[1]
const startMinList = elUL[2]
const endAMList = elUL[3]
const endPMList = elUL[4]
const endMinList = elUL[5]



var rootElement = document.documentElement;
var elScrollToTopBtn = document.querySelector(".scroll-arrow.top")
var elScrollToBottomBtn = document.querySelector(".scroll-arrow.bottom")

elScrollToTopBtn.addEventListener("click", scrollToTop)
elScrollToBottomBtn.addEventListener("click", scrollToBottom)

function scrollToTop() {
    doScrolling("", 0, 500)
}

function scrollToBottom() {
    // console.log(rootElement.scrollHeight - window.innerHeight)
    doScrolling("", rootElement.scrollHeight - window.innerHeight, 500)
}


function scrollBtns() {
    // console.log("scroll")
    if (window.scrollY > rootElement.scrollHeight / 4 || window.pageYoffset > rootElement.scrollHeight / 4) {
        elScrollToTopBtn.classList.add("displayed")
    } else {
        elScrollToTopBtn.classList.remove("displayed")
    }

    if (window.scrollY > rootElement.scrollHeight / 5 || window.pageYoffset > rootElement.scrollHeight / 2) {
        elScrollToBottomBtn.classList.add("displayed")
    } else {
        elScrollToBottomBtn.classList.remove("displayed")
    }
}

window.addEventListener("scroll", scrollBtns)

window.addEventListener("load", function () {
    scrollBtns()
})


// Scroll button functionality from https://stackoverflow.com/a/39494245/2065702
function getElementY(query) {
    return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
}

function doScrolling(element, targetScrollPos, duration) {
    var startingY = window.pageYOffset
    var elementY = element ? getElementY(element) - 50 : targetScrollPos + 50
    // If element is close to page's bottom then window will scroll only to some position above the element.
    var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
    var diff = targetY - startingY
    // Easing function: easeInOutCubic
    // From: https://gist.github.com/gre/1650294
    var easing = function (t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }

    function easeInOutQuad(t, b, c, d) {
        // currentIteration (timeElapsed), startValue (startPosition), changeInValue (distance), totalIterations (duration)
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };


    var start

    if (!diff) return

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp
        // Elapsed miliseconds since start of scrolling.
        var time = timestamp - start
        // Get percent of completion in range [0, 1].
        var percent = Math.min(time / duration, 1)
        // Apply the easing.
        // It can cause bad-looking slow frames in browser performance tool, so be careful.
        percent = easing(percent)

        var iterationPos = easeInOutQuad(time, startingY, diff, duration)
        window.scrollTo(0, iterationPos)

        // Proceed with animation as long as we wanted it to.
        if (time < duration) {
            window.requestAnimationFrame(step)
        }
    });
}



const listSelectedIndex = (list) => listFindSelected(list, "selected")
const listSelectedText = (list) => listIndexText(list, listSelectedIndex(list))


categories.forEach(function (category, index) {
    createElementAtt(elCategory, "li", [], [
        ["data-value", index]
    ], category)
    createElementAtt(elCategoryOpt1, "option", [], [
        ["data-value", index]
    ], category)
    createElementAtt(elCategoryOpt2, "option", [], [
        ["data-value", index]
    ], category)
    createElementAtt(elCategoryOpt3, "option", [], [
        ["data-value", index]
    ], category)
    createElementAtt(elCategoryOpt4, "option", [], [
        ["data-value", index]
    ], category)
})


const elCategoryItems = document.querySelectorAll(".category li")


elToday.addEventListener("click", function () {
    elYesterday.checked = 0
    elOtherDate.value = ""
    previousField = "today"
})

elYesterday.addEventListener("click", function () {
    elToday.checked = 0
    elOtherDate.value = ""
    previousField = "yesterday"
})

elOtherDate.addEventListener("input", function () {
    elToday.checked = 0
    elYesterday.checked = 0
    previousField = "otherdate"
})


function onListClick(e) {
    const selectedPreviously = listFindSelected(e.target.parentNode, "selected")
    const selectedPreviouslyText = (selectedPreviously === -1) ? '' : e.target.parentNode.children[selectedPreviously].textContent
    const selectedNowText = e.target.textContent

    const sameField = previousField === e.target.parentNode

    // console.log("onListClick", previousField)
    // console.log(e.target.parentNode)
    // const sameField = previousField === e.target.parentNode
    // console.log("sameField", sameField)

    if (selectedPreviously !== -1) {
        if (selectedPreviouslyText === selectedNowText) {
            if (sameField) e.target.classList.remove("selected")
        } else {
            e.target.parentNode.children[selectedPreviously].classList.remove("selected")
            e.target.classList.add("selected")
        }
    } else {
        e.target.classList.add("selected")
    }
}


function onListPress(e) {
    let selected = listFindSelected(e.target, "selected")
    let key

    if (e.code.slice(0, 3) === "Key") {
        key = e.code.slice(3, 4)
    } else if (e.code.slice(0, 5) === "Digit") {
        key = e.code.slice(5, 6)
    }

    if (e.key === "ArrowUp" || e.key === "Up") {
        e.preventDefault()
        if (selected !== -1) {
            e.target.children[selected].classList.remove("selected")
            selected === 0 ? selected = e.target.children.length - 1 : selected -= 1
            e.target.children[selected].classList.add("selected")
        }
    } else if (e.key === "ArrowDown" || e.key === "Down") {
        e.preventDefault()
        if (selected !== -1) {
            e.target.children[selected].classList.remove("selected")
            selected === e.target.children.length - 1 ? selected = 0 : selected += 1
            e.target.children[selected].classList.add("selected")
        }
    } else if (e.code.slice(0, 3) === "Key" || e.code.slice(0, 3) === "Dig") {
        let newSelected

        if (selected === -1) {
            newSelected = listSearchItem(e.target, 0, key)
        } else {
            if (selected === e.target.children.length - 1) {
                newSelected = listSearchItem(e.target, 0, key)
            } else {
                newSelected = listSearchItem(e.target, selected + 1, key)
            }
        }

        if (selected !== -1 && newSelected !== -1) e.target.children[selected].classList.remove("selected")

        if (newSelected !== -1) {
            e.target.children[newSelected].classList.add("selected")
            selected = newSelected
        }
    } else if (e.code === "Space") {
        if (selected !== -1) {
            e.target.children[selected].classList.remove("selected")
            selected = -1
        }
    }
}


function listSearchItem(parentUL, selected, letter) {
    // console.log("listSearchItem")
    // console.log(parentUL, selected, letter)
    let len = parentUL.children.length
    let result = -1
    for (let i = selected; i < len; i++) {
        if (parentUL.children[i].textContent[0] === letter.toUpperCase()) {
            result = i
            break
        }
    }
    return result
}



function onListFocus(e) {
    let selected = listFindSelected(e.target, "selected")

    e.preventDefault()

    if (selected === -1) {
        // e.target.children[0].focus()
        e.target.children[0].classList.add("selected")
        // } else {
        // e.target.children[selected].focus()
    }
}

elUL.forEach((list, i) => {
    list.addEventListener("click", onListClick)
    list.addEventListener("keydown", onListPress, false)
    list.addEventListener("focus", onListFocus, false)

    switch (i) {
        case 0:
            list.addEventListener("click", function () {
                listUnselectAllItems(startPMList, "selected")
            })
            break;
        case 1:
            list.addEventListener("click", function () {
                listUnselectAllItems(startAMList, "selected")
            })

            break;
        case 3:
            list.addEventListener("click", function () {
                listUnselectAllItems(endPMList, "selected")
            })

            break;
        case 4:
            list.addEventListener("click", function () {
                listUnselectAllItems(endAMList, "selected")
            })
            break;
    }
    listUnselectAllItems
})


document.addEventListener("click", function (e) {
    previousField = document.activeElement
})


function DOMLoad() {
    initialize()

}


document.addEventListener('DOMContentLoaded', () => {
    DOMLoad()
})



function categoryHrsValidCheck(catNo, active) {
    const val = document.querySelector(".category--" + catNo + " + input").value.trim()

    if (active) {
        if (!isEmpty(val)) {
            return isDecimal(val)
        } else {
            return false
        }
    } else {
        return isEmpty(val)
    }
}

function categoryCheck(num) {
    // drop down Category is filled in
    return categoryHrsValidCheck(num, true) ? '' : `Category ${num} Hours is empty or invalid`
}


// Category fields need to be checked
// If main category is filled in, the 4 category fields below it can't be
function categoryCheckAll() {
    let result = ""

    if (!listNothingSelected(elUL[6], "selected")) {
        // Category is filled in so cat 1-4 fields must not be filled in
        // including the hours fields

        if (isEmpty(elCategoryOpt1.value) && isEmpty(elCategoryOpt2.value) && isEmpty(elCategoryOpt3.value) && isEmpty(elCategoryOpt4.value) &&
            categoryHrsValidCheck(1, false) && categoryHrsValidCheck(2, false) && categoryHrsValidCheck(3, false) && categoryHrsValidCheck(4, false)) {
            return ""
        } else {
            return "Category filled in but Category 1-4 fields filled in"
        }
    } else {
        // Category not filled in, so Cat 1 must be filled in at least
        if (!isEmpty(elCategoryOpt1.value)) {
            result = requiredMsg(categoryCheck(1), result)

            if (!isEmpty(elCategoryOpt2.value)) {
                result = requiredMsg(categoryCheck(2), result)

                if (!isEmpty(elCategoryOpt3.value)) {
                    result = requiredMsg(categoryCheck(3), result)

                    if (!isEmpty(elCategoryOpt4.value)) {
                        result = requiredMsg(categoryCheck(4), result)

                    } else {
                        if ((categoryIsEmpty(4))) {
                            return result
                        } else {
                            return "Category 4 empty but category fields below it are filled in"
                        }
                    }

                } else {
                    if ((categoryIsEmpty(3)) && (categoryIsEmpty(4))) {
                        return result
                    } else {
                        return "Category 3 empty but category fields below it are filled in"
                    }
                }

            } else {
                if ((categoryIsEmpty(2)) && (categoryIsEmpty(3)) && (categoryIsEmpty(4))) {
                    return result
                } else {
                    return "Category 2 empty but category fields below it are filled in"
                }
            }

            return result
        } else {
            if ((categoryIsEmpty(1)) && (categoryIsEmpty(2)) && (categoryIsEmpty(3)) && (categoryIsEmpty(4))) {
                return "No Category selected"
            } else {
                return "Category 1 empty but category fields below it are filled in"
            }
        }
    }

}

function categoryIsEmpty(num) {
    return isEmpty(document.querySelector(".category--" + num).value) && categoryHrsValidCheck(num, false)
}


function fieldsRequired() {
    let strRequired = ""

    if (elToday.checked || elYesterday.checked || dateDDMMYYFormatTest(elOtherDate.value)) {

    } else {
        if (!elOtherDate.value) {
            strRequired = "Click 'Today' or 'Yesterday'"
        } else {
            if (!dateDDMMYYFormatTest(elOtherDate.value)) strRequired = "Other date isn't in dd/mm/yy format."
        }
    }

    // Start hours
    if (listNothingSelected(startAMList, "selected") && listNothingSelected(startPMList, "selected")) {
        strRequired = requiredMsg("Start hour not selected", strRequired)
    }

    // Start minutes
    if (listNothingSelected(startMinList, "selected")) {
        strRequired = requiredMsg("Start minutes not selected", strRequired)
    }

    // End hours
    if (listNothingSelected(endAMList, "selected") && listNothingSelected(endPMList, "selected")) {
        strRequired = requiredMsg("End hour not selected", strRequired)
    }

    // End minutes
    if (listNothingSelected(endMinList, "selected")) {
        strRequired = requiredMsg("End minutes not selected", strRequired)
    }

    // Category
    strRequired = requiredMsg(categoryCheckAll(), strRequired)

    return strRequired
}


// This is a second part done only if it passes the first part
// It checks if end time is greater than start time
function fieldsRequiredTwo(startTime, endTime) {
    console.log(startTime, endTime)
    let strRequired = ""

    if (timeDiff(startTime, endTime) === -1 || timeDiff(startTime, endTime) === 0) {
        strRequired = requiredMsg("Start time less than End time", strRequired)
    }

    if (!listNothingSelected(endPMList, "selected") && !listNothingSelected(endMinList, "selected")) {
        if (listFindSelected(endPMList, "selected") === 12 && listFindSelected(endMinList, "selected") !== 0) {
            strRequired = requiredMsg("End hour 0 means midnight. It must be 0:00.", strRequired)
        }
    } else if (!listNothingSelected(startPMList, "selected")) {
        strRequired = requiredMsg("End hour not selected", strRequired)
    }

    return strRequired
}


function dateBuild() {
    const ONE_DAY_MS = 86400000

    if (elToday.checked) {
        return dateToDMYY(Date.now(), "/")
    } else {
        if (elYesterday.checked) {
            return dateToDMYY(Date.now() - ONE_DAY_MS, "/")
        } else {
            let [d, m, y] = elOtherDate.value.split("/")
            return dateFormatToDMYY(d, m, y, "/")
        }
    }
}



function onAdd() {
    let startTime
    let endTime
    let strRequired = fieldsRequired()

    if (strRequired) {
        alert(strRequired)

    } else {

        let dt = dateBuild()

        if (!listNothingSelected(startAMList, "selected")) {
            startTime = timeHMTo24Hr(listSelectedText(startAMList), listSelectedText(startMinList), "AM")
        } else {
            if (!listNothingSelected(startPMList, "selected")) {
                startTime = timeHMTo24Hr(listSelectedText(startPMList), listSelectedText(startMinList), "PM")
            } else {
                //error
            }
        }


        if (!listNothingSelected(endAMList, "selected")) {
            endTime = timeHMTo24Hr(listSelectedText(endAMList), listSelectedText(endMinList), "AM")
        } else {
            if (!listNothingSelected(endPMList, "selected")) {
                if (listSelectedText(endPMList) === "0") {
                    endTime = timeHMTo24Hr(listSelectedText(endPMList), listSelectedText(endMinList), "AM")
                } else {
                    endTime = timeHMTo24Hr(listSelectedText(endPMList), listSelectedText(endMinList), "PM")
                }
            } else {
                //error
            }
        }

        let category = []
        let hours = []


        if (!listNothingSelected(elUL[6], "selected")) {
            elUL[6].children[listFindSelected(elUL[6], "selected")].textContent
            category.push = elUL[6].children[listFindSelected(elUL[6], "selected")].textContent
        }


        let secondcheck = fieldsRequiredTwo(startTime, endTime)
        if (secondcheck) {
            alert(secondcheck)
        } else {
            timesheetItemCreate(dt, startTime, endTime)

            objData.timesheetItems.push(timesheetItemCreate(dt, startTime, endTime))

            databaseUpdate(objData)

            clearFields()

            endAMList.focus()

            main()

        }
    }

    previousField = "add"

}


elAddBtn.addEventListener('click', onAdd)


function clearFields() {
    let startAM
    let startPM
    let startMin

    if (!listNothingSelected(endAMList, "selected")) {
        startAM = listFindSelected(endAMList, "selected")
    } else {
        if (!listNothingSelected(endPMList, "selected")) {
            startPM = listFindSelected(endPMList, "selected")
        }
    }

    if (!listNothingSelected(endMinList, "selected")) {
        startMin = listFindSelected(endMinList, "selected")
    }

    console.log(startAM, startPM, startMin)

    listUnselectAllItems(elUL[0], "selected")
    listUnselectAllItems(elUL[1], "selected")
    listUnselectAllItems(elUL[2], "selected")
    listUnselectAllItems(elUL[3], "selected")
    listUnselectAllItems(elUL[4], "selected")
    listUnselectAllItems(elUL[5], "selected")
    listUnselectAllItems(elUL[6], "selected")
    elCategoryOpt1.value = ""
    elCategoryOpt2.value = ""
    elCategoryOpt3.value = ""
    elCategoryOpt4.value = ""
    document.querySelector(".category--1 + input").value = ""
    document.querySelector(".category--2 + input").value = ""
    document.querySelector(".category--3 + input").value = ""
    document.querySelector(".category--4 + input").value = ""

    document.querySelector(".description-input").value = ""


    if (startAM !== null && startAM !== undefined) {
        startAMList.children[startAM].classList.add("selected")
    } else {
        if (startPM !== null && startPM !== undefined) {
            startPMList.children[startPM].classList.add("selected")
        }
    }
    if (startMin !== null && startMin !== undefined) {
        startMinList.children[startMin].classList.add("selected")
    }
}


function timesheetItemCreate(date, starttime, endtime) {
    const tdate = date
    const tsd = starttime
    const ted = endtime

    const category = []
    const hours = []

    const description = (document.querySelector(".description-input").value.trim()) ? document.querySelector(".description-input").value.trim() : ''


    if (listSelectedText(elUL[6])) {
        category.push(listSelectedText(elUL[6]))
        hours.push(timeDiff(starttime, endtime))
    } else {
        if (!isEmpty(elCategoryOpt1.value)) {
            categoryAdd(1)
        }
        if (!isEmpty(elCategoryOpt2.value)) {
            categoryAdd(2)
        }
        if (!isEmpty(elCategoryOpt3.value)) {
            categoryAdd(3)
        }
        if (!isEmpty(elCategoryOpt4.value)) {
            categoryAdd(4)
        }
    }


    let objTimesheetItem = {
        "tdate": date,
        "starttime": starttime,
        "endtime": endtime,
        "category": category,
        "hours": hours,
        "description": description
    }

    console.log(objTimesheetItem)
    return objTimesheetItem


    function categoryAdd(num) {
        category.push(document.querySelector(".category--" + num).value)
        hours.push(Number(document.querySelector(".category--" + num + " + input").value))
    }
}


function timesheetSearch(startDate, endDate) {
    // return objData.timesheetItems.filter(cv => datedmyyToDDMMYY(cv.tdate, "/") >= startDate && datedmyyToDDMMYY(cv.tdate, "/") <= endDate)
    return objData.timesheetItems.filter(cv => dmyyToDate(...cv.tdate.split("/")) >= startDate && dmyyToDate(...cv.tdate.split("/")) <= endDate)
}


let chartThisWeek
let chartThisMonth
let chartLast90Days


function main() {

    // Today
    let today = new Date();

    // today = dateChangeDays(today, -1)
    // alert("debugging")
    // each timesheet item is searched on the date only so make hours and mins zero
    let todaySearch = startOfDay(today);


    const elTodayTable = document.querySelector(".today tbody")
    // const ctxToday = document.getElementById('todayChart').getContext('2d');

    let timesheetCategory = timesheetCategorySplitGenerate(todaySearch, todaySearch)


    timesheetCategory.map(cv => insertIntoTable(elTodayTable, cv, false))


    // This week
    let thisWeek = startOfDay(startOfWeek(today))

    const elThisWeekTable = document.querySelector(".thisweek tbody")
    const ctxThisWeek = document.getElementById('thisWeekChart').getContext('2d');

    let timesheetCategoryThisWeek = timesheetCategorySplitGenerate(thisWeek, todaySearch)
    // console.log(timesheetCategoryThisWeek)

    // timesheetCategoryThisWeek.map(cv => cv[0].day = dmyyToDate(...cv[0].tdate.split("/"), "/").toString().slice(0, 3))
    timesheetCategoryThisWeek.map(cv => cv.day = dmyyToDate(...cv.tdate.split("/"), "/").toString().slice(0, 3))
    timesheetCategoryThisWeek.map(cv => insertIntoTable(elThisWeekTable, cv, true))

    let catSum = categorySum(timesheetCategoryThisWeek)
    // console.log(catSum)
    let catSort = categorySort(catSum, "hours")

    let arrCatThisWeek = [],
        arrHoursThisWeek = []

    catSort.forEach(cv => {
        arrCatThisWeek.push(cv[0]);
        arrHoursThisWeek.push(cv[1])
    })

    if (chartThisWeek) {
        chartThisWeek.destroy();
    }
    chartThisWeek = drawChart(ctxThisWeek, arrCatThisWeek, arrHoursThisWeek)



    // This month
    let thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const ctxThisMonth = document.getElementById('thisMonthChart').getContext('2d');

    let timesheetCategoryThisMonth = timesheetCategorySplitGenerate(thisMonth, todaySearch)
    // console.log(timesheetCategoryThisMonth)

    catSum = categorySum(timesheetCategoryThisMonth)
    // console.log(catSum)
    catSort = categorySort(catSum, "hours")

    let arrCatThisMonth = [],
        arrHoursThisMonth = []

    catSort.forEach(cv => {
        arrCatThisMonth.push(cv[0]);
        arrHoursThisMonth.push(cv[1])
    })


    if (chartThisMonth) {
        chartThisMonth.destroy();
    }
    chartThisMonth = drawChart(ctxThisMonth, arrCatThisMonth, arrHoursThisMonth)



    // Last 90 days
    let last90Days = startOfDay(dateChangeDays(today, -90));

    const ctxLast90Days = document.getElementById('last90DaysChart').getContext('2d');

    let timesheetCategoryLast90Days = timesheetCategorySplitGenerate(last90Days, todaySearch)
    console.log(timesheetCategoryLast90Days)

    catSum = categorySum(timesheetCategoryLast90Days)
    console.log(catSum)
    catSort = categorySort(catSum, "hours")

    let arrCatLast90Days = [],
        arrHoursLast90Days = []

    catSort.forEach(cv => {
        arrCatLast90Days.push(cv[0]);
        arrHoursLast90Days.push(cv[1])
    })

    if (chartLast90Days) {
        chartLast90Days.destroy();
    }
    chartLast90Days = drawChart(ctxLast90Days, arrCatLast90Days, arrHoursLast90Days)

}


function categorySum(arr) {
    return arr.reduce((acc, curr) => (acc[curr.category] = acc[curr.category] + curr.hours || curr.hours, acc), {})
}

function categorySort(obj, sortfield) {
    let result = [];
    for (var sortfield in obj) {
        result.push([sortfield, obj[sortfield]]);
    }
    result.sort(function (a, b) {
        return b[1] - a[1];
    });
    return result
}


function timesheetCategorySplitGenerate(startDate, endDate) {
    // let today = new Date();
    // let todaySearch = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

    let arrTimesheetsMatched = timesheetSearch(startDate, endDate);

    timesheetCategory = []
    arrTimesheetsMatched.forEach(timesheet => {
        timesheetCategory.push(timesheetItemsSplitCategory(timesheet))
    })

    let timesheetCategoryFlat = timesheetCategory.flat()
    timesheetCategoryFlat.sort((a, b) => a.datesort > b.datesort)

    return timesheetCategoryFlat
}


function timesheetItemsSplitCategory(timesheetItem) {
    let result = []
    timesheetItem.category.forEach((cv, i) => {
        result.push({
            tdate: timesheetItem.tdate,
            starttime: timesheetItem.starttime,
            endtime: timesheetItem.endtime,
            category: cv,
            hours: timesheetItem.hours[i],
            description: timesheetItem.description,
            datesort: datedmyyToDDMMYY(timesheetItem.tdate, "/") + " " + timeHMToHHMM(timesheetItem.starttime, ":")
        })
    })

    return result
}


function insertIntoTable(table, timesheetCategoryItem, includeDate) {
    let elTr = createElementAtt(table, "tr", [], [])

    if (includeDate) {
        createElementAtt(elTr, "td", [
            ["dates"]
        ], [], timesheetCategoryItem.tdate)

        createElementAtt(elTr, "td", [
            ["day"]
        ], [], timesheetCategoryItem.day)

    }

    createElementAtt(elTr, "td", [
        ["times"]
    ], [], timesheetCategoryItem.starttime + " - " + timesheetCategoryItem.endtime)

    createElementAtt(elTr, "td", [
        ["category"]
    ], [], timesheetCategoryItem.category)

    createElementAtt(elTr, "td", [
        ["description"]
    ], [], timesheetCategoryItem.description)

}


function drawChart(chart, categories, hours) {
    // chart.clear()

    const myChart = new Chart(chart, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                // label: '# of Votes',
                data: hours,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 4
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: true,
        }
    });

    return myChart

}
