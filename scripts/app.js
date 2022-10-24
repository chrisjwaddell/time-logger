// ^ELEMENTS
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

const startHourList = elUL[0]
const startMinList = elUL[1]
const endHourList = elUL[2]
const endMinList = elUL[3]



let rootElement = document.documentElement;
let elMain = document.querySelector("main")
let elScrollToTopBtn = document.querySelector(".scroll-arrow.top")
let elScrollToBottomBtn = document.querySelector(".scroll-arrow.bottom")


// ^GLOBALS
let objData = {}

let previousField = ""

// selected class (SC) name for items selected in ul list
const SC = "selected"

// for testing
let allDataSplit

let SCROLL_HEIGHT


// ^SCROLL

window.addEventListener("resize", function (e) {
    SCROLL_HEIGHT = rootElement.scrollHeight;
})

window.addEventListener("scroll", scrollBtns)

elScrollToTopBtn.addEventListener("click", scrollToTop)
elScrollToBottomBtn.addEventListener("click", scrollToBottom)


function scrollToTop() {
    doScrolling("", 0, 500)
}

function scrollToBottom() {
    doScrolling("", SCROLL_HEIGHT - window.innerHeight, 500)
}

const scrollShowTop = () => (window.scrollY > (window.screen.height * 0.5))
const scrollShowBottom = () => (window.scrollY + window.screen.height * 1.5) < SCROLL_HEIGHT;


function scrollBtns() {
    scrollShowTop() ? elScrollToTopBtn.classList.add("displayed") : elScrollToTopBtn.classList.remove("displayed")

    scrollShowBottom() ? elScrollToBottomBtn.classList.add("displayed") : elScrollToBottomBtn.classList.remove("displayed")

}


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


// ^LIST SELECTION
const listSelectedIndex = (list) => listFindSelected(list, SC)
const listSelectedText = (list) => listIndexText(list, listSelectedIndex(list))
const listSelectedAMPM = (list) => listIndexAMPM(list, listSelectedIndex(list))

function listIndexAMPM(parentUL, index) {
    return parentUL.children[index] ? parentUL.children[index].dataset.ampm : ''
}


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



// ^DATE SELECTION
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


// Toggle on and off when an item in a list is selected
function onListClick(e) {
    const selectedPreviously = listFindSelected(e.target.parentNode, SC)
    const selectedPreviouslyText = (selectedPreviously === -1) ? '' : e.target.parentNode.children[selectedPreviously].textContent
    const selectedNowText = e.target.textContent

    const sameField = previousField === e.target.parentNode

    // console.log("onListClick", previousField)
    // console.log(e.target.parentNode)
    // const sameField = previousField === e.target.parentNode
    // console.log("sameField", sameField)

    if (selectedPreviously !== -1) {
        if (selectedPreviouslyText === selectedNowText) {
            if (sameField) e.target.classList.remove(SC)
        } else {
            e.target.parentNode.children[selectedPreviously].classList.remove(SC)
            e.target.classList.add(SC)
        }
    } else {
        e.target.classList.add(SC)
    }
}


function onListPress(e) {
    let selected = listFindSelected(e.target, SC)
    let key

    if (e.code.slice(0, 3) === "Key") {
        key = e.code.slice(3, 4)
    } else if (e.code.slice(0, 5) === "Digit") {
        key = e.code.slice(5, 6)
    }

    if (e.key === "ArrowUp" || e.key === "Up") {
        e.preventDefault()
        if (selected !== -1) {
            e.target.children[selected].classList.remove(SC)
            selected === 0 ? selected = e.target.children.length - 1 : selected -= 1
            e.target.children[selected].classList.add(SC)
        }
    } else if (e.key === "ArrowDown" || e.key === "Down") {
        e.preventDefault()
        if (selected !== -1) {
            e.target.children[selected].classList.remove(SC)
            selected === e.target.children.length - 1 ? selected = 0 : selected += 1
            e.target.children[selected].classList.add(SC)
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

        if (selected !== -1 && newSelected !== -1) e.target.children[selected].classList.remove(SC)

        if (newSelected !== -1) {
            e.target.children[newSelected].classList.add(SC)
            selected = newSelected
        }
    } else if (e.code === "Space") {
        if (selected !== -1) {
            e.target.children[selected].classList.remove(SC)
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
    let selected = listFindSelected(e.target, SC)

    e.preventDefault()

    if (selected === -1) {
        // e.target.children[0].focus()
        e.target.children[0].classList.add(SC)
        // } else {
        // e.target.children[selected].focus()
    }
}

// The 4 time lists
elUL.forEach((list, i) => {
    list.addEventListener("click", onListClick)
    list.addEventListener("keydown", onListPress, false)
    list.addEventListener("focus", onListFocus, false)

    // switch (i) {
    //     case 0:
    //         list.addEventListener("click", function () {
    //             listUnselectAllItems(startHourList, SC)
    //         })
    //         break;
    //     case 2:
    //         list.addEventListener("click", function () {
    //             listUnselectAllItems(endHourList, SC)
    //         })

    //         break;
    // }
    listUnselectAllItems
})


// ^DOCUMENT EVENTS
document.addEventListener("click", function (e) {
    previousField = document.activeElement
})


function DOMLoad() {
    SCROLL_HEIGHT = rootElement.scrollHeight
    initialize()
}


document.addEventListener('DOMContentLoaded', () => {
    DOMLoad()
})


// ^FORM CHECK
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

    if (!listNothingSelected(elUL[4], SC)) {
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
    if (listNothingSelected(startHourList, SC)) {
        strRequired = requiredMsg("Start hour not selected", strRequired)
    }

    // Start minutes
    if (listNothingSelected(startMinList, SC)) {
        strRequired = requiredMsg("Start minutes not selected", strRequired)
    }

    // End hours
    if (listNothingSelected(endHourList, SC)) {
        strRequired = requiredMsg("End hour not selected", strRequired)
    }

    // End minutes
    if (listNothingSelected(endMinList, SC)) {
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

    if (!listNothingSelected(endHourList, SC) && !listNothingSelected(endMinList, SC)) {
        if (listFindSelected(endHourList, SC) === 0 && listFindSelected(endMinList, SC) !== 0) {
            strRequired = requiredMsg("End hour 0 means midnight. It must be 0:00.", strRequired)
        }
    } else if (!listNothingSelected(startHourList, SC)) {
        strRequired = requiredMsg("End hour not selected", strRequired)
    }

    return strRequired
}



// ^FORM PROCESS

// Returns a date in D/M/YY format depending
// on what date checkbox was clicked
function getDateFromForm() {
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


// It checks the form, if that's ok, it adds the data
// saves to database by running 'databaseUpdate',
// clears the fields and re-renders.
function onAdd() {
    let startTime
    let endTime
    let strRequired = fieldsRequired()

    // console.log(rootElement.scrollHeight)

    if (strRequired) {
        alert(strRequired)

    } else {

        let dt = getDateFromForm()

        if (!listNothingSelected(startHourList, SC)) {
            startTime = timeHMTo24Hr(listSelectedText(startHourList), listSelectedText(startMinList), listSelectedAMPM(startHourList))
        } else {
            //error
        }

        // debugger

        if (!listNothingSelected(endHourList, SC)) {
            if (listSelectedText(endHourList) === "0") {
                endTime = timeHMTo24Hr(listSelectedText(endHourList), listSelectedText(endMinList), listSelectedAMPM(endHourList))
            } else {
                endTime = timeHMTo24Hr(listSelectedText(endHourList), listSelectedText(endMinList), listSelectedAMPM(endHourList))
            }
        } else {
            //error
        }

        let category = []
        let hours = []


        if (!listNothingSelected(elUL[4], SC)) {
            elUL[4].children[listFindSelected(elUL[4], SC)].textContent
            category.push = elUL[4].children[listFindSelected(elUL[4], SC)].textContent
        }


        let secondcheck = fieldsRequiredTwo(startTime, endTime)
        if (secondcheck) {
            alert(secondcheck)
        } else {

            if (timeDiff(startTime, endTime) > 12) {
                if (!window.confirm("This is over 12 hours. Are you sure?")) return
            }

            createTimesheetItem(dt, startTime, endTime)


            objData.timesheetItems.push(createTimesheetItem(dt, startTime, endTime))

            databaseUpdate(objData)

            clearFields()

            endHourList.focus()

            let s = document.querySelectorAll("main section")
            s.forEach(cv => elMain.removeChild(cv))
            render()

        }
    }

    previousField = "add"

}


elAddBtn.addEventListener('click', onAdd)


function clearFields() {
    let startAM
    let startPM
    let startMin

    if (!listNothingSelected(endHourList, SC)) {
        startPM = listFindSelected(endHourList, SC)
    }

    if (!listNothingSelected(endMinList, SC)) {
        startMin = listFindSelected(endMinList, SC)
    }

    console.log(startAM, startPM, startMin)

    listUnselectAllItems(elUL[0], SC)
    listUnselectAllItems(elUL[1], SC)
    listUnselectAllItems(elUL[2], SC)
    listUnselectAllItems(elUL[3], SC)
    listUnselectAllItems(elUL[4], SC)
    elCategoryOpt1.value = ""
    elCategoryOpt2.value = ""
    elCategoryOpt3.value = ""
    elCategoryOpt4.value = ""
    document.querySelector(".category--1 + input").value = ""
    document.querySelector(".category--2 + input").value = ""
    document.querySelector(".category--3 + input").value = ""
    document.querySelector(".category--4 + input").value = ""

    document.querySelector(".description-input").value = ""


    if (startPM !== null && startPM !== undefined) {
        startHourList.children[startPM].classList.add(SC)
    }
    if (startMin !== null && startMin !== undefined) {
        startMinList.children[startMin].classList.add(SC)
    }
}




// Read the data from the form and enter it into
// objects. Save the timesheet item
// The result gets pushed to objData.timesheetItems
// objData gets saved when onAdd runs databaseUpdate(objData)
function createTimesheetItem(date, starttime, endtime) {
    const tdate = date
    const tsd = starttime
    const ted = endtime

    const category = []
    const hours = []

    const description = (document.querySelector(".description-input").value.trim()) ? document.querySelector(".description-input").value.trim() : ''


    if (listSelectedText(elUL[4])) {
        category.push(listSelectedText(elUL[4]))
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

    // console.log(objTimesheetItem)
    return objTimesheetItem


    function categoryAdd(num) {
        category.push(document.querySelector(".category--" + num).value)
        hours.push(Number(document.querySelector(".category--" + num + " + input").value))
    }
}





// ^TIMESHEET ITEM OPERATIONS

// Start and end dates take Javascript Date objects
// return Timesheet items that are between 2 dates
function getTimesheetItemsByStartAndEndDate(startDate, endDate) {
    return objData.timesheetItems.filter(cv => (dmyyToDate(...cv.tdate.split("/")) >= startDate) && (dmyyToDate(...cv.tdate.split("/")) <= endDate))
}


function categorySum(arr) {
    return arr.reduce((acc, curr) => (acc[curr.category] = acc[curr.category] + curr.hours || curr.hours, acc), {})
}


// Start and end dates are Date objects
// Some items can have more than one category, this splits it out
// This has more items in it than a timesheetItem
function timesheetCategorySplitGenerate(startDate, endDate) {
    // let today = new Date();
    // let todaySearch = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

    let arrTimesheetsMatched = getTimesheetItemsByStartAndEndDate(startDate, endDate);

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



// ^DOM

function render() {
    const randomBackup = () => Math.floor(Math.random() * 20);
    if (randomBackup() === 1) {
        let r = confirm("Backup data?");
        if (r == true) {
            backup()
        }
    }


    createAllSections()
}


function generateCategoryColorList(categoryList, opacity) {
    return categoryList.reduce((acc, cv) => ([...acc, `rgba(${categoryColor(cv).r}, ${categoryColor(cv).g}, ${categoryColor(cv).b}, ${opacity})`]), [])
}

function categoryColor(category) {
    let i = categories.findIndex(cat => cat === category);
    return categoryColors[i] || categoryColors[0]
}


function drawChart(chart, categories, hours, colors, bordercolors) {
    // chart.clear()
    // alert(categories)

    const myChart = new Chart(chart, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                // label: '# of Votes',
                data: hours,
                backgroundColor: colors,
                borderColor: bordercolors,
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     'rgba(54, 162, 235, 0.2)',
                //     'rgba(255, 206, 86, 0.2)',
                //     'rgba(75, 192, 192, 0.2)',
                //     'rgba(153, 102, 255, 0.2)',
                //     'rgba(255, 159, 64, 0.2)'
                // ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
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



function createAllSections() {

    settings.map(cv => createSection(cv))

}


// This is the main function to create the section
// It looks at the settings and finds the startDate and endDate
// It gets the timesheetItem data for those dates
// It creates a tables (if table: true),
// graph (if categoryGraph: true)
// This is in a loop of settings
function createSection(sectionobj) {

    if (sectionobj.enabled) {
        const elSection = createSectionTag(sectionobj)

        const timesheetItemCategoryData = timesheetCategorySplitGenerate(sectionobj.startDate, sectionobj.endDate)

        // debugger
        if (sectionobj.categoryGraph) {
            const elGraph = createGraphTag(elSection)
            const ctxGraph = elGraph.getContext('2d');

            // let categoryColorList = generateCategoryColorList(1)
            // let categoryColorBorderList = generateCategoryColorList(0.2)

            let catSum = categorySum(timesheetItemCategoryData)

            let categoriesSortedByHours = keyValueToArray(catSum, "category", "hours").sort(by("hours", true))

            let cats = categoriesSortedByHours.map(cv => Object.values(cv)[0])
            let hrs = categoriesSortedByHours.map(cv => Object.values(cv)[1])

            // colors for the graph
            let colorList = generateCategoryColorList(cats, 0.2);
            let colorBorderList = generateCategoryColorList(cats, 1);


            let chart = drawChart(ctxGraph, cats, hrs, colorList, colorBorderList)
        }


        if (sectionobj.table) {
            let inclDate = !(sectionobj.name === "Today")
            const frag = createTableFragment(inclDate)
            elSection.appendChild(frag)

            const elSectionTags = [...elSection.childNodes];

            const elTable = elSectionTags.filter(cv => cv.nodeName === "TABLE")[0]
            insertTableData(elTable.children[1], timesheetItemCategoryData, inclDate)
        }

    }
}



// Creates a section tag with title and goal
function createSectionTag(sectionobj) {
    const elSection = createElementAtt(elMain, "section", [], [], "")

    createElementAtt(elSection, "h3", [], [], sectionobj.name)

    if (sectionobj.goal[0])
        createElementAtt(elSection, "h4", ["target"], [], "Target")

    sectionobj.goal.forEach((goalItem, i) => {
        if (goalItem)
            createElementAtt(elSection, "p", ["target"], [], goalItem)
    })

    return elSection
}


// A table has a few elements in it to create columns
// A fragment is used to create the backbone
// structure of the table
function createTableFragment(includedate) {
    const frag = document.createDocumentFragment();
    const elTable = document.createElement("table")
    // const elTable = createElementAtt(frag, "table", [], [], "")
    const elThead = createElementAtt(elTable, "thead", [], [], "")
    const elTR = createElementAtt(elThead, "tr", [], [], "")
    if (includedate) {
        createElementAtt(elTR, "th", ["date"], [], "Date")
        createElementAtt(elTR, "th", ["day"], [], "Day")
    }
    createElementAtt(elTR, "th", ["times"], [], "Times")
    createElementAtt(elTR, "th", ["category"], [], "Category")
    createElementAtt(elTR, "th", ["description"], [], "Description")
    const elTbody = createElementAtt(elTable, "tbody", [], [], "")
    createElementAtt(elTbody, "tr", [], [], "")
    frag.appendChild(elTable)

    return frag
}



function insertTableData(tbl, timesheetCategoryData, includeDate) {
    if (includeDate)
        timesheetCategoryData.map(cv => cv.day = dmyyToDate(...cv.tdate.split("/"), "/").toString().slice(0, 3))
    timesheetCategoryData.map(cv => insertTableItem(tbl, cv, includeDate))
}

function insertTableItem(table, timesheetCategoryItem, includeDate) {
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

function createGraphTag(parent) {
    const elDiv = createElementAtt(parent, "div", ["o-container"], [], "")
    const elGraph = createElementAtt(elDiv, "canvas", [], [
        ["width", "100%"]
    ], "")

    return elGraph
}








// ^DATE FUNCTIONS MAYBE GET RID OF

// Choosing dates relative to today
function dateRelative(dtString) {
    let index = 0;
    let today = new Date()
    let str = dtString.replace(" ", "")
    let result

    while (index < str.length) {
        switch (str[index]) {
            case "d":
                result = getOffset();
                console.log("d")
                console.dir(result)
                // return dateChangeDays(today, result)
                if (result.type === "relative") {
                    return dateChangeDays(today, Number(result.offset))
                } else if (result.type === "absolute") {
                    return dateChangeDays(new Date(today.getFullYear(), 0, 1), Number(result.offset) - 1)
                } else {
                    return today;
                };

            case "w":
                result = getOffset()
                console.log("d")
                console.table(result)
                // return dateChangeDays(today, result)
                // return result

                if (result.type === "relative") {
                    return dateChangeDays(today, Number(result.offset))
                } else if (result.type === "absolute") {
                    return dateChangeDays(new Date(today.getFullYear(), 0, 1), Number(result.offset) - 1)
                } else {
                    return today;
                };

            default:
                result = today
        }

        index += 1
        // console.log("index - " + index)
    }

    return result


    function getOffset() {
        let posNeg = ""

        if (str.length !== 1 && str !== "today") {
            index += 1
            if (str[index] === "+" || str[index] === "-") {
                posNeg = str[index]
                index += 1

                let doffset = readOffset()
                console.log(index, str.length)

                if (index === str.length) {
                    return {
                        offset: Number(posNeg + doffset),
                        type: "relative"
                    }

                } else {
                    if (str[index] === "s" || str[index] === "e") {
                        return {
                            offset: Number(posNeg + doffset),
                            type: "relative " + str[index]
                        }
                    } else {
                        dateRelative()
                    }
                }
                // return dateChangeDays(today, Number(posNeg + doffset))
            } else {
                if (isNumber(str[index])) {
                    let offsetValue = readOffset()
                    // return dateChangeDays(new Date(today.getFullYear(), 0, 1), dayNumber - 1)
                    console.log(index, str.length)

                    return {
                        offset: Number(offsetValue),
                        type: "absolute"
                    }

                } else {
                    // error
                    return {
                        offset: 0,
                        type: "error"
                    }
                }
            }
        } else {
            // 'd' entered only ie today
            return today
        }
    }



    // given the index number and the array, it returns
    // all the consecutive numbers
    function readOffset() {
        //theRest - I think I can remove it and just use .slice
        let found = theRest(str, index).split("").findIndex(cv => !isNumber(cv))
        console.log("found - " + found, "index - " + index)
        console.log(theRest(str, index).split(""))
        if (found === -1) {
            index = str.length
            return Number(theRest(str, index))
        }
        console.log(str.slice(index, found))
        index += found
        return Number(str.slice(index, found))
    }

}
