// ^ELEMENTS
const elAddBtn = document.querySelector(".btns .add")

let rootElement = document.documentElement
let elMain = document.querySelector("main")
let elScrollToTopBtn = document.querySelector(".scroll-arrow.top")
let elScrollToBottomBtn = document.querySelector(".scroll-arrow.bottom")

const elCategorySection = document.querySelectorAll(".categ")
const elCategoryHrs = document.querySelectorAll(".categ select")
let elCategory
const elDescr = document.querySelector(".description-input")

let elTimes = null

// ^GLOBALS
let objData = {}

// selected class (SC) name for items selected in ul list
const SC = "selected"

let SCROLL_HEIGHT

// *******************************************************************************

// ^STET LIBRARY

// .times .start .field-section
const STET_ID = "timeperiod"

let timeperiod = STET(".times.start .field-section", STET_ID, "", 1, {
	autofocus: true,
	STClickCallback: () => {
		onClickSTTimeLogger()
	},
	ETClickCallback: () => {
		onClickETTimeLogger()
	},
})

let elWarningMsg = document.querySelector(".warningmsg small")

let totalHrs = 0

function resultMessage(result) {
	if (result.stetFilledIn) {
		return result.durationText + "\n" + result.warnings
	} else {
		return result.required + "\n" + result.warnings
	}
}

function onClickSTTimeLogger() {
	let result = timeperiod.getResults(false)
	elWarningMsg.textContent = result.warnings
}

function onClickETTimeLogger() {
	// let result = stetResult("timeperiod", false)
	let result = timeperiod.getResults(false)
	elWarningMsg.textContent = result.durationText + "\n" + result.warnings
	elCategoryHrs[0].innerHTML = hourList(result.durationDecimal)
	totalHrs = result.durationDecimal
	elCategoryHrs[0].value = result.durationDecimal
	// elCategory[0].focus()
}

function hoursChosen() {
	return (
		Number(elCategoryHrs[0].value) +
		Number(elCategoryHrs[1].value) +
		Number(elCategoryHrs[2].value) +
		Number(elCategoryHrs[3].value)
	)
}

// *******************************************************************************

// ^DROP DOWN LIST

function categoryField(fieldnumber) {
	if (elCategory[fieldnumber - 1].value) {
		elCategorySection[fieldnumber].classList.add("isvisible")
	} else {
		elCategorySection[fieldnumber].classList.remove("isvisible")
		elCategoryHrs[fieldnumber].value = 0
		if (elCategorySection[fieldnumber + 1]) {
			elCategorySection[fieldnumber + 1].classList.remove("isvisible")
			elCategoryHrs[fieldnumber + 1].value = 0
		}
		if (elCategorySection[fieldnumber + 2]) {
			elCategorySection[fieldnumber + 2].classList.remove("isvisible")
			elCategoryHrs[fieldnumber + 2].value = 0
		}
	}
}

let cat1Field = DropdownField(
	".field-section.categ.category--1 .field",
	"Category 1",
	"Category",
	3,
	"category1",
	{
		maxLines: 15,
		searchMode: "anywhere in",
		onChange: function () {
			categoryField(1)
		},
	}
)
cat1Field.setList(categories)

let cat2Field = DropdownField(
	".field-section.categ.category--2 .field",
	"Category 2",
	"Category",
	5,
	"category2",
	{
		maxLines: 15,
		searchMode: "anywhere in",
		onChange: function () {
			categoryField(2)
		},
	}
)
cat2Field.setList(categories)

let cat3Field = DropdownField(
	".field-section.categ.category--3 .field",
	"Category 3",
	"Category",
	7,
	"category3",
	{
		maxLines: 15,
		searchMode: "anywhere in",
		onChange: function () {
			categoryField(3)
		},
	}
)
cat3Field.setList(categories)

let cat4Field = DropdownField(
	".field-section.categ.category--4 .field",
	"Category 4",
	"Category",
	9,
	"category4",
	{
		maxLines: 15,
		searchMode: "anywhere in",
		onChange: function () {
			categoryField(4)
		},
	}
)
cat4Field.setList(categories)

// *******************************************************************************

// ^SCROLL

window.addEventListener("resize", function () {
	SCROLL_HEIGHT = rootElement.scrollHeight
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

const scrollShowTop = () => window.scrollY > window.screen.height * 0.5
const scrollShowBottom = () =>
	window.scrollY + window.screen.height * 1.5 < SCROLL_HEIGHT

function scrollBtns() {
	scrollShowTop()
		? elScrollToTopBtn.classList.add("displayed")
		: elScrollToTopBtn.classList.remove("displayed")

	scrollShowBottom()
		? elScrollToBottomBtn.classList.add("displayed")
		: elScrollToBottomBtn.classList.remove("displayed")
}

// Scroll button functionality from https://stackoverflow.com/a/39494245/2065702
function getElementY(query) {
	return (
		window.pageYOffset +
		document.querySelector(query).getBoundingClientRect().top
	)
}

function doScrolling(element, targetScrollPos, duration) {
	var startingY = window.pageYOffset
	var elementY = element ? getElementY(element) - 50 : targetScrollPos + 50
	// If element is close to page's bottom then window will scroll only to some position above the element.
	var targetY =
		document.body.scrollHeight - elementY < window.innerHeight
			? document.body.scrollHeight - window.innerHeight
			: elementY
	var diff = targetY - startingY
	// Easing function: easeInOutCubic
	// From: https://gist.github.com/gre/1650294
	var easing = function (t) {
		return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
	}

	function easeInOutQuad(t, b, c, d) {
		// currentIteration (timeElapsed), startValue (startPosition), changeInValue (distance), totalIterations (duration)
		t /= d / 2
		if (t < 1) return (c / 2) * t * t + b
		t--
		return (-c / 2) * (t * (t - 2) - 1) + b
	}

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
	})
}

// ^DOCUMENT EVENTS

function hourList(maxDuration) {
	let result = ""

	for (let i = 0; i <= maxDuration; i += 0.25) {
		result += `<option>${i}</option>`
	}
	return result
}

function DOMLoad() {
	initialize()
	SCROLL_HEIGHT = rootElement.scrollHeight

	// const elCategories = document.querySelectorAll(".ddfield input")
	elCategory = document.querySelectorAll(".categ .ddfield input")

	elCategoryHrs[0].addEventListener("change", function () {
		elCategoryHrs[1].innerHTML = hourList(totalHrs - hoursChosen())
		elCategoryHrs[1].value = 0
	})

	elCategoryHrs[1].addEventListener("change", function () {
		elCategoryHrs[2].innerHTML = hourList(totalHrs - hoursChosen())
		elCategoryHrs[2].value = 0
	})

	elCategoryHrs[2].addEventListener("change", function () {
		elCategoryHrs[3].innerHTML = hourList(totalHrs - hoursChosen())
		elCategoryHrs[3].value = 0
	})

	elTimes = document.querySelectorAll(".times input")

	if (!elTimes[0].value) {
		elTimes[0].focus()
	} else {
		elTimes[1].focus()
	}
}

document.addEventListener("DOMContentLoaded", () => {
	DOMLoad()
})

// ^FORM CHECK

function categoryCheck(categoryIndex) {
	if (elCategory[categoryIndex]) {
		if (elCategory[categoryIndex].value.trim()) {
			if (elCategoryHrs[categoryIndex]) {
				if (!elCategoryHrs[categoryIndex].value.trim()) {
					return 2
				} else if (elCategoryHrs[categoryIndex].value === "0") {
					return 2
				} else {
					return {
						cat: elCategory[categoryIndex].value.trim(),
						hrs: elCategoryHrs[categoryIndex].value.trim(),
					}
				}
			} else {
				return 11
			}
		} else {
			// Category not filled in
			if (elCategoryHrs[categoryIndex]) {
				if (!elCategoryHrs[categoryIndex].value.trim()) {
					return ""
				} else if (elCategoryHrs[categoryIndex].value === "0") {
					return ""
				} else {
					// Hrs in, category not
					return 3
				}
			} else {
				return 12
			}
		}
	} else {
		return 10
	}
}

// Returns error message or the number of correct categories
// Correct meaning category with hours not zero
function categoryCheckFields() {
	let c1 = categoryCheck(0)
	let c2 = categoryCheck(1)
	let c3 = categoryCheck(2)
	let c4 = categoryCheck(3)

	if (typeof c1 === "number") {
		return "Category 1 - " + catCheckerDescr(c1)
	} else if (typeof c2 === "number") {
		return "Category 2 - " + catCheckerDescr(c2)
	} else if (typeof c3 === "number") {
		return "Category 3 - " + catCheckerDescr(c3)
	} else if (typeof c4 === "number") {
		return "Category 4 - " + catCheckerDescr(c4)
	} else {
		if (c2 === "") {
			return 1
		} else if (c3 === "") {
			return 2
		} else if (c4 === "") {
			return 3
		} else {
			return 4
		}
	}
}

function catCheckerDescr(result) {
	if (result === 2) {
		return "missing Hours"
	} else if (result === 3) {
		return "missing Category"
	} else {
		return "An error occurred"
	}
}

// Return a string about missing required fields
// If all fields filled in, it returns the number
// of categories filled in
function fieldsRequired(result) {
	let strRequired = ""

	if (!result.stetFilledIn) {
		// strRequired = result.required
		strRequired = resultMessage(result)
	}

	// Category
	let categoriesFilledIn = categoryCheckFields()

	if (typeof categoriesFilledIn !== "number") {
		strRequired = requiredMsg(categoriesFilledIn, strRequired)
	}

	if (!strRequired) {
		return categoriesFilledIn
	} else {
		return strRequired
	}
}

// ^FORM PROCESS

// It checks the form, if that's ok, it adds the data
// saves to database by running 'databaseUpdate',
// clears the fields and re-renders.
function onAdd() {
	let result = timeperiod.getResults(false)
	console.log(result)

	let strRequired = ""
	strRequired = fieldsRequired(result)
	let categoryCount

	if (typeof strRequired !== "number") {
		elWarningMsg.textContent = ""

		alert(strRequired)
	} else {
		let categoryCount = strRequired
		elWarningMsg.textContent = ""

		let {h, m} = timeHourMin(result.st, hr24)

		let st = timeHMTo24Hr(h, m, true)
		// let st = result.st

		let {h: h2, m: m2} = timeHourMin(result.et, hr24)
		let et = timeHMTo24Hr(h2, m2, true)

		let category = []
		let hours = []

		for (let i = 0; i < categoryCount; i++) {
			category.push(elCategory[i].value)
			hours.push(Number(elCategoryHrs[i].value))
		}

		let dayChosen = dateChangeDays(now().valueOf(), result.day)
		let d = dmy(dayChosen)
		// try to put duration in - result.durationDecimal
		let item = createTimesheetItem(
			d.d + "/" + (Number(d.m) + 1) + "/" + (Number(d.y) - 2000),
			st,
			et,
			result.durationDecimal,
			category,
			hours
		)
		console.log(item)
		console.log(JSON.stringify(item))

		objData.timesheetItems.push(item)

		let du = databaseUpdate(item, objData)

		if (du) {
			clearFields()

			const elStet = document.querySelector(".stet")

			let r = timeperiod.getResults(true)

			// alert("check result")

			// let s = document.querySelectorAll("main section")
			// s.forEach((cv) => elMain.removeChild(cv))
			// render()
		} else {
			console.log(result)
			console.log("This hasn't been saved")
		}
	}

	if (!elTimes[0].value) {
		elTimes[0].focus()
	} else {
		elTimes[1].focus()
	}
}

elAddBtn.addEventListener("click", onAdd)

function clearFields() {
	cat1Field.clearField()
	cat2Field.clearField()
	cat3Field.clearField()
	cat4Field.clearField()

	elCategoryHrs[0].value = ""
	elCategoryHrs[1].value = ""
	elCategoryHrs[2].value = ""
	elCategoryHrs[3].value = ""
	elCategoryHrs[0].innerHTML = ""
	elCategoryHrs[1].innerHTML = ""
	elCategoryHrs[2].innerHTML = ""
	elCategoryHrs[3].innerHTML = ""

	elCategorySection[1].classList.remove("isvisible")
	elCategorySection[2].classList.remove("isvisible")
	elCategorySection[3].classList.remove("isvisible")

	elDescr.value = ""
}

// Read the data from the form and enter it into
// objects. Save the timesheet item
// The result gets pushed to objData.timesheetItems
// objData gets saved when onAdd runs databaseUpdate(item, objData)
function createTimesheetItem(
	date,
	starttime,
	endtime,
	duration,
	category,
	hours
) {
	const tdate = date
	const tsd = starttime
	const ted = endtime

	const description = elDescr.value.trim()
		? document.querySelector(".description-input").value.trim()
		: ""

	let objTimesheetItem = {
		tdate: date,
		starttime: starttime,
		endtime: endtime,
		category: category,
		hours: hours,
		description: description,
	}

	return objTimesheetItem
}

// ^TIMESHEET ITEM OPERATIONS

// Start and end dates take Javascript Date objects
// return Timesheet items that are between 2 dates
function getTimesheetItemsByStartAndEndDate(startDate, endDate) {
	return objData.timesheetItems.filter(
		(cv) =>
			dmyyToDate(...cv.tdate.split("/")) >= startDate &&
			dmyyToDate(...cv.tdate.split("/")) <= endDate
	)
}

function categorySum(arr) {
	return arr.reduce(
		(acc, curr) => (
			(acc[curr.category] =
				acc[curr.category] + curr.hours || curr.hours),
			acc
		),
		{}
	)
}

// Start and end dates are Date objects
// Some items can have more than one category, this splits it out
// This has more items in it than a timesheetItem
function timesheetCategorySplitGenerate(startDate, endDate) {
	let arrTimesheetsMatched = getTimesheetItemsByStartAndEndDate(
		startDate,
		endDate
	)

	timesheetCategory = []
	arrTimesheetsMatched.forEach((timesheet) => {
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
			datesort:
				datedmyyToDDMMYY(timesheetItem.tdate, "/") +
				" " +
				timeHMToHHMM(timesheetItem.starttime, ":"),
		})
	})

	return result
}

// ^DOM

function render() {
	const randomBackup = () => Math.floor(Math.random() * 20)
	if (randomBackup() === 1) {
		let r = confirm("Backup data?")
		if (r == true) {
			backup()
		}
	}

	createAllSections()
}

function generateCategoryColorList(categoryList, opacity) {
	return categoryList.reduce(
		(acc, cv) => [
			...acc,
			`rgba(${categoryColor(cv).r}, ${categoryColor(cv).g}, ${
				categoryColor(cv).b
			}, ${opacity})`,
		],
		[]
	)
}

function categoryColor(category) {
	let i = categories.findIndex((cat) => cat === category)
	return categoryColors[i] || categoryColors[0]
}

function drawChart(chart, categories, hours, colors, bordercolors) {
	// chart.clear()
	// alert(categories)

	const myChart = new Chart(chart, {
		type: "bar",
		data: {
			labels: categories,
			datasets: [
				{
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
					borderWidth: 4,
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
			responsive: true,
			maintainAspectRatio: true,
		},
	})

	return myChart
}

function createAllSections() {
	settings.map((cv) => createSection(cv))
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

		const timesheetItemCategoryData = timesheetCategorySplitGenerate(
			sectionobj.startDate,
			sectionobj.endDate
		)

		// debugger
		if (sectionobj.categoryGraph) {
			const elGraph = createGraphTag(elSection)
			const ctxGraph = elGraph.getContext("2d")

			// let categoryColorList = generateCategoryColorList(1)
			// let categoryColorBorderList = generateCategoryColorList(0.2)

			let catSum = categorySum(timesheetItemCategoryData)

			let categoriesSortedByHours = keyValueToArray(
				catSum,
				"category",
				"hours"
			).sort(by("hours", true))

			let cats = categoriesSortedByHours.map((cv) => Object.values(cv)[0])
			let hrs = categoriesSortedByHours.map((cv) => Object.values(cv)[1])

			// colors for the graph
			let colorList = generateCategoryColorList(cats, 0.2)
			let colorBorderList = generateCategoryColorList(cats, 1)

			let chart = drawChart(
				ctxGraph,
				cats,
				hrs,
				colorList,
				colorBorderList
			)
		}

		if (sectionobj.table) {
			let inclDate = !(sectionobj.name === "Today")
			const frag = createTableFragment(inclDate)
			elSection.appendChild(frag)

			const elSectionTags = [...elSection.childNodes]

			const elTable = elSectionTags.filter(
				(cv) => cv.nodeName === "TABLE"
			)[0]
			insertTableData(
				elTable.children[1],
				timesheetItemCategoryData,
				inclDate
			)
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
		if (goalItem) createElementAtt(elSection, "p", ["target"], [], goalItem)
	})

	return elSection
}

// A table has a few elements in it to create columns
// A fragment is used to create the backbone
// structure of the table
function createTableFragment(includedate) {
	const frag = document.createDocumentFragment()
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
		timesheetCategoryData.map(
			(cv) =>
				(cv.day = dmyyToDate(...cv.tdate.split("/"), "/")
					.toString()
					.slice(0, 3))
		)
	timesheetCategoryData.map((cv) => insertTableItem(tbl, cv, includeDate))
}

function insertTableItem(table, timesheetCategoryItem, includeDate) {
	let elTr = createElementAtt(table, "tr", [], [])

	if (includeDate) {
		createElementAtt(
			elTr,
			"td",
			[["dates"]],
			[],
			timesheetCategoryItem.tdate
		)

		createElementAtt(elTr, "td", [["day"]], [], timesheetCategoryItem.day)
	}

	createElementAtt(
		elTr,
		"td",
		[["times"]],
		[],
		timesheetCategoryItem.starttime + " - " + timesheetCategoryItem.endtime
	)

	createElementAtt(
		elTr,
		"td",
		[["category"]],
		[],
		timesheetCategoryItem.category
	)

	createElementAtt(
		elTr,
		"td",
		[["description"]],
		[],
		timesheetCategoryItem.description
	)
}

function createGraphTag(parent) {
	const elDiv = createElementAtt(parent, "div", ["o-container"], [], "")
	const elGraph = createElementAtt(
		elDiv,
		"canvas",
		[],
		[["width", "100%"]],
		""
	)

	return elGraph
}
