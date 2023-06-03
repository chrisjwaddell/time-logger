// STET - Abbreviation for Start time end time
// stet is a reference to the start time eend time component

// This should be the same as .times { width: 325 px;
// minus 5px margin left and right for start and end so ((2*5px) * 2)
const COMPONENT_WIDTH = 325 - 2 * 5 * 2
// This must be the same width as in CSS
// .day__timebar.marker { width.....
const MARKER_WIDTH = 72
//Black marker width, it should be the same as in CSS
// .day__timebar - start, .day__timebar-end { width.....
const STARTEND_MARKER_WIDTH = 4

function STET(target, STETId, STETTitle, STtabindex, opts) {
	// selected class (SC) name for items selected in ul list
	const SC = "selected"

	// This should be the same as .times { width: 325 px;
	// minus 5px margin left and right for start and end so ((2*5px) * 2)
	const COMPONENT_WIDTH = 325 - 2 * 5 * 2
	// This must be the same width as in CSS
	// .day__timebar.marker { width.....
	const MARKER_WIDTH = 72
	//Black marker width, it should be the same as in CSS
	// .day__timebar - start, .day__timebar-end { width.....
	const STARTEND_MARKER_WIDTH = 4

	// ^ SETTINGS
	const settingDefaults = {
		durationOverXHrs: 10,
		startTimeXHrsBeforeNow: 10,
		saveLastETInLocalStorage: true,
		hr24: false,
		STTitle: "Start time",
		ETTitle: "End time",
	}

	const settings = opts || {}

	const durationOverXHrs =
		settings.durationOverXHrs ?? settingDefaults.durationOverXHrs
	const startTimeXHrsBeforeNow =
		settings.startTimeXHrsBeforeNow ??
		settingDefaults.startTimeXHrsBeforeNow
	const saveLastETInLocalStorage =
		settings.saveLastETInLocalStorage ??
		settingDefaults.saveLastETInLocalStorage
	const hr24 = settings.hr24 ?? settingDefaults.hr24
	const STTitle = settings.STTitle ?? settingDefaults.STTitle
	const ETTitle = settings.ETTitle ?? settingDefaults.ETTitle

	let stField = ""
	let etField = ""

	let objSTET

	// let lastET = saveLastETInLocalStorage ? getLastETStored(STETId) : null
	// let lastETVsNow = lastET ? dayDiff(lastET, now().valueOf()) : null
	// refreshST(0, lastET, lastETVsNow, hr24)

	render(target, STETId, STETTitle, STtabindex)

	document.addEventListener("DOMContentLoaded", onSTETPageLoad)

	function onSTETPageLoad() {
		let stet = document.querySelector(target + "> .stet")
		objSTET = stetDOM(stet)

		stetClickEvents(stet)

		timebar(objSTET, hr24)

		// last time entered
		let lastET = saveLastETInLocalStorage
			? getLastETStored(objSTET.id)
			: null

		refreshTimeLists(objSTET, lastET, 0, hr24)

		function stetClickEvents(stet) {
			stet.querySelector(".triangle--left").addEventListener(
				"click",
				dayLeft
			)
			stet.querySelector(".triangle--right").addEventListener(
				"click",
				dayRight
			)
		}
	}

	// tab index of Start time will be STtabindex
	// tab index of End time will be STtabindex + 1
	function render(target, STETId, STETTitle, STtabindex) {
		const elStet = createElementAtt(null, "div", ["stet"], [], "")
		elStet.dataset.stetId = STETId

		let elTitle = document.createElement("h2")
		elTitle.textContent = STETTitle
		elStet.appendChild(elTitle)

		// Day DOM branch with left and right arrow and day name eg "Today"
		const elDay = createElementAtt(null, "div", ["day"], [], "")
		elDay.dataset.day = "0"

		const elTriangleContL = createElementAtt(
			elDay,
			"div",
			["triangle__container"],
			[],
			""
		)

		const elTriangleL = createElementAtt(
			elTriangleContL,
			"div",
			["triangle"],
			[],
			""
		)
		createElementAtt(
			elTriangleL,
			"div",
			["triangle--left", "isvisible"],
			[],
			""
		)

		createElementAtt(elDay, "h3", [], [], "Today")

		const elTriangleContR = createElementAtt(
			elDay,
			"div",
			["triangle__container"],
			[],
			""
		)

		const elTriangleR = createElementAtt(
			elTriangleContR,
			"div",
			["triangle"],
			[],
			""
		)

		createElementAtt(elTriangleR, "div", ["triangle--right"], [], "")

		elStet.appendChild(elDay)

		// Timebar DOM branch
		let elDayTimeBarMain = document.createElement("div")
		let elDayTimeBar = createElementAtt(
			elDayTimeBarMain,
			"div",
			["day__timebar"],
			[],
			""
		)

		createElementAtt(
			elDayTimeBar,
			"div",
			["day__timebar--bar"],
			["style", "width: 0px"],
			""
		)

		createElementAtt(
			elDayTimeBar,
			"div",
			["day__timebar--bar-template"],
			[],
			""
		)

		createElementAtt(elDayTimeBar, "div", ["day__timebar-start"], [], "")
		createElementAtt(elDayTimeBar, "div", ["day__timebar-end"], [], "")

		const elStartMarker = createElementAtt(
			elDayTimeBar,
			"div",
			["day__timebar-start-marker", "marker"],
			[],
			""
		)
		createElementAtt(elStartMarker, "p", [], [], "")

		const elEndMarker = createElementAtt(
			elDayTimeBar,
			"div",
			["day__timebar-end-marker", "marker"],
			[],
			""
		)
		createElementAtt(elEndMarker, "p", [], [], "")

		elStet.appendChild(elDayTimeBarMain)

		// Start and end dropdown fields
		const elFlex = createElementAtt(null, "div", ["o-flex"], [], "")
		const elStart = createElementAtt(elFlex, "div", ["start"], [], "")
		elStart.dataset.starttime = ""

		const elEnd = createElementAtt(elFlex, "div", ["end"], [], "")
		elEnd.dataset.endtime = ""

		elStet.appendChild(elFlex)

		document.querySelector(target).appendChild(elStet)

		stField = DropdownField(
			target + " .start",
			STTitle,
			STTitle,
			STtabindex,
			STETId + "ST",
			{
				maxLines: 6,
				cssClassList: ["time-field"],
				onFocusOpenDropdown: true,
				typingOpenDropdown: true,
				arrowKeysNoDropdown: 2,
				enterToggleDropdown: true,
				autocomplete: false,
				autofocus:
					typeof settings.autofocus !== "undefined" &&
					settings.autofocus !== false,
				onChange: function () {
					if (objSTET.elStart.childNodes[0].dataset.origin) {
						if (
							objSTET.elStart.childNodes[0].childNodes[1]
								.childNodes[0].value
						) {
							if (
								objSTET.elStart.childNodes[0].dataset.origin !==
								objSTET.elStart.childNodes[0].childNodes[1]
									.childNodes[0].value
							) {
								// value has changed
								objSTET.elEnd.dataset.endtime = ""
								objSTET.et = ""
								objSTET.elEnd.childNodes[0].childNodes[1].childNodes[0].value =
									""
								objSTET.etUL.innerHTML = ""
							}
						}
					}
					STUpdate(objSTET)

					if (settings.STClickCallback) settings.STClickCallback()
				},
			}
		)

		stField.setList(refreshST(0, hr24))

		etField = DropdownField(
			target + " .end",
			ETTitle,
			ETTitle,
			STtabindex + 1,
			STETId + "ET",
			{
				maxLines: 6,
				cssClassList: ["time-field"],
				onFocusOpenDropdown: true,
				typingOpenDropdown: true,
				arrowKeysNoDropdown: 2,
				autocomplete: false,
				enterToggleDropdown: true,
				disableOnOpen: true,
				onChange: function () {
					ETUpdate(objSTET)

					if (settings.ETClickCallback) settings.ETClickCallback()
				},
			}
		)
	}

	const dayValue = (d) => (d.dataset.day ? Number(d.dataset.day) : 0)

	function stetDOM(stet) {
		// Given start and end elements, it returns the start and end time
		const stValue = (stUL) =>
			stUL.dataset.starttime ? stUL.dataset.starttime : ""
		const etValue = (etUL) =>
			etUL.dataset.endtime ? etUL.dataset.endtime : ""
		const idValue = (stet) =>
			stet.dataset.stetId ? stet.dataset.stetId : ""

		if (
			stet.childNodes[3].childNodes[0] &&
			stet.childNodes[3].childNodes[1]
		) {
			let id = idValue(stet)
			let timebar = stet.childNodes[2]
			let elDay = stet.childNodes[1]
			let day = dayValue(stet.childNodes[1])
			let elStart = stet.childNodes[3].childNodes[0]
			let elEnd = stet.childNodes[3].childNodes[1]
			let st = stValue(stet.childNodes[3].childNodes[0])
			let et = etValue(stet.childNodes[3].childNodes[1])
			let elstUL =
				stet.childNodes[3].childNodes[0].childNodes[0].childNodes[2]
			let eletUL =
				stet.childNodes[3].childNodes[1].childNodes[0].childNodes[2]

			return {
				id,
				timebar,
				elDay,
				day,
				elStart,
				elEnd,
				st,
				et,
				stUL: elstUL,
				etUL: eletUL,
			}
		} else {
			return null
		}
	}

	function dayLeft(e) {
		dayChangeEvent(e, -1)

		let elInput =
			e.target.parentNode.parentNode.parentNode.parentNode.childNodes[3]
				.childNodes[0].childNodes[0].childNodes[1].childNodes[0]
		elInput.focus()
	}

	function dayRight(e) {
		dayChangeEvent(e, 1)

		let elInput =
			e.target.parentNode.parentNode.parentNode.parentNode.childNodes[3]
				.childNodes[0].childNodes[0].childNodes[1].childNodes[0]
		elInput.focus()
	}

	function dayChangeEvent(e, dayChange) {
		let elStet = e.target.parentNode.parentNode.parentNode.parentNode
		let day = Number(objSTET.day) + dayChange
		objSTET.elDay.dataset.day = day
		objSTET.day = day

		objSTET.elStart.dataset.starttime = ""
		objSTET.elEnd.dataset.endtime = ""

		let {lastET, lastETVsNow, hr24} = dateChange(elStet)

		refreshTimeLists(objSTET, lastET, lastETVsNow, hr24)
	}

	function dateChange(el) {
		function timebarReset(el) {
			const elTimebar = el.children[0]
			const elTimebarBar = elTimebar.childNodes[0]

			const elTimebarStart = elTimebar.children[2]
			const elTimebarStartMarker = elTimebar.children[4]

			const elTimebarEnd = elTimebar.children[3]
			const elTimebarEndMarker = elTimebar.children[5]

			elTimebarBar.style.width = "0px"
			elTimebarBar.style.left = "20px"

			elTimebarStart.classList.remove("isvisible")
			elTimebarStartMarker.classList.remove("isvisible")
			elTimebarEnd.classList.remove("isvisible")
			elTimebarEndMarker.classList.remove("isvisible")
		}

		let lastET = saveLastETInLocalStorage
			? getLastETStored(objSTET.id)
			: null
		let lastETVsNow = lastET ? dayDiff(lastET, now().valueOf()) : null

		let elHeading = objSTET.elDay.childNodes[1]
		elDayLeft = objSTET.elDay.children[0].children[0].children[0]
		elDayRight = objSTET.elDay.children[2].children[0].children[0]

		timebarReset(objSTET.timebar)
		objSTET.etUL.innerHTML = ""

		if (objSTET.day === -1) {
			elHeading.textContent = "Yesterday"
			elDayLeft.classList.add("isvisible")
			elDayRight.classList.add("isvisible")
			if (lastET) {
				if (lastETVsNow === 0) {
					objSTET.elDay.classList.add("warning")
				} else {
					objSTET.elDay.classList.remove("warning")
				}
			}
		} else if (objSTET.day === 0) {
			// Today
			elHeading.textContent = "Today"
			elDayLeft.classList.add("isvisible")
			elDayRight.classList.remove("isvisible")
			if (lastET) {
				if (lastETVsNow === 0) {
					objSTET.elDay.classList.remove("warning")
				} else {
					objSTET.elDay.classList.remove("warning")
				}
			}
		} else {
			elHeading.textContent = dateToDMYY(
				dateChangeDays(now().valueOf(), objSTET.day)
			)
			elDayLeft.classList.add("isvisible")
			elDayRight.classList.add("isvisible")
			if (lastET) {
				if (lastETVsNow === 0) {
					objSTET.elDay.classList.add("warning")
				} else {
					objSTET.elDay.classList.remove("warning")
				}
			}
		}

		return {
			lastET,
			lastETVsNow,
			hr24,
		}
	}

	function timebar(stet, hr24) {
		let elTimebar = stet.timebar.childNodes[0]

		let elTimebarBar = elTimebar.childNodes[0]

		let elTimebarStart = elTimebar.childNodes[2]
		let elTimebarEnd = elTimebar.childNodes[3]

		let elTimebarStartMarker = elTimebar.childNodes[4]
		let elTimebarEndMarker = elTimebar.childNodes[5]

		elTimebarBar.style.left =
			timeDecimal(stet.st, hr24, true) * COMPONENT_WIDTH + "px"
		elTimebarStart.style.left =
			timeDecimal(stet.st, hr24, true) * COMPONENT_WIDTH + "px"

		if (stet.st === "0" || stet.st === "") {
			elTimebarStart.classList.remove("isvisible")
			elTimebarStartMarker.classList.remove("isvisible")
			elTimebarEnd.classList.remove("isvisible")
			elTimebarEndMarker.classList.remove("isvisible")

			elTimebarBar.style.width = "0px"
			elTimebarEnd.style.left = elTimebarStart.style.left
		} else {
			elTimebarStart.classList.add("isvisible")
			elTimebarStartMarker.textContent = stet.st
			elTimebarStartMarker.classList.add("isvisible")

			if (stet.et === "0" || stet.et === "") {
				elTimebarBar.style.width = "20px"
				elTimebarEnd.style.left =
					Number.parseInt(elTimebarStart.style.left) + 20 + "px"

				elTimebarEnd.classList.remove("isvisible")
				elTimebarEndMarker.classList.remove("isvisible")
			} else {
				if (stet.st === "0" || stet.st === "") {
					elTimebarStart.classList.remove("isvisible")
					elTimebarStartMarker.classList.remove("isvisible")
					elTimebarEnd.classList.remove("isvisible")
					elTimebarEndMarker.classList.remove("isvisible")
				} else {
					elTimebarBar.style.width =
						durationDecimal(stet.st, stet.et, hr24) *
							COMPONENT_WIDTH +
						"px"
					elTimebarEnd.style.left =
						Number.parseInt(elTimebarStart.style.left) +
						durationDecimal(stet.st, stet.et, hr24) *
							COMPONENT_WIDTH +
						"px"
					elTimebarEndMarker.textContent = stet.et

					elTimebarStart.classList.add("isvisible")
					elTimebarStartMarker.classList.add("isvisible")
					elTimebarEnd.classList.add("isvisible")
					elTimebarEndMarker.classList.add("isvisible")
				}
			}
		}

		// start means the timebar 'left' value is 0 to 72 px, the width of the bubble
		// so the bubble can't appear on the left at all
		const start = Number.parseInt(elTimebarStart.style.left) < MARKER_WIDTH
		const end =
			Number.parseInt(elTimebarEnd.style.left) >
			COMPONENT_WIDTH - MARKER_WIDTH

		let widthOne = false
		let widthTwo = false

		if (Number.parseInt(elTimebarBar.style.width) > MARKER_WIDTH) {
			if (Number.parseInt(elTimebarBar.style.width) > MARKER_WIDTH * 2) {
				widthTwo = true
			} else {
				widthOne = true
			}
		}

		if (widthTwo) {
			elTimebarStartMarker.style.left = elTimebarStart.style.left
			elTimebarStartMarker.classList.remove("br")
			elTimebarStartMarker.classList.remove("rt")
			elTimebarStartMarker.classList.remove("line")
			elTimebarStartMarker.classList.add("bl")
			elTimebarEndMarker.style.left =
				Number.parseInt(elTimebarEnd.style.left) - MARKER_WIDTH + "px"
			elTimebarEndMarker.classList.remove("bl")
			elTimebarEndMarker.classList.remove("lt")
			elTimebarEndMarker.classList.remove("line")
			elTimebarEndMarker.classList.add("br")
		} else {
			if (start) {
				elTimebarStartMarker.style.left = elTimebarStart.style.left
				elTimebarStartMarker.classList.remove("br")
				elTimebarStartMarker.classList.remove("rt")
				elTimebarStartMarker.classList.remove("line")
				elTimebarStartMarker.classList.add("bl")
				if (widthOne) {
					elTimebarEndMarker.style.left = elTimebarEnd.style.left
					elTimebarEndMarker.classList.remove("br")
					elTimebarEndMarker.classList.remove("lt")
					elTimebarEndMarker.classList.remove("line")
					elTimebarEndMarker.classList.add("bl")
				} else {
					elTimebarEndMarker.style.left = elTimebarEnd.style.left
					elTimebarEndMarker.classList.remove("br")
					elTimebarEndMarker.classList.remove("bl")
					elTimebarEndMarker.classList.add("lt")
					elTimebarEndMarker.classList.add("line")
				}
			} else {
				if (end) {
					elTimebarEndMarker.style.left =
						Number.parseInt(elTimebarEnd.style.left) -
						MARKER_WIDTH +
						"px"
					elTimebarEndMarker.classList.remove("bl")
					elTimebarEndMarker.classList.remove("lt")
					elTimebarEndMarker.classList.remove("line")
					elTimebarEndMarker.classList.add("br")
					if (widthOne) {
						elTimebarStartMarker.style.left =
							Number.parseInt(elTimebarStart.style.left) -
							MARKER_WIDTH +
							"px"
						elTimebarStartMarker.classList.remove("bl")
						elTimebarStartMarker.classList.remove("rt")
						elTimebarStartMarker.classList.remove("line")
						elTimebarStartMarker.classList.add("br")
					} else {
						elTimebarStartMarker.style.left =
							Number.parseInt(elTimebarStart.style.left) -
							MARKER_WIDTH +
							"px"
						elTimebarStartMarker.classList.remove("br")
						elTimebarStartMarker.classList.remove("bl")
						elTimebarStartMarker.classList.add("rt")
						elTimebarStartMarker.classList.add("line")
					}
				} else {
					// not start and not end
					elTimebarStartMarker.style.left =
						Number.parseInt(elTimebarStart.style.left) -
						MARKER_WIDTH +
						"px"
					elTimebarStartMarker.classList.remove("bl")
					elTimebarStartMarker.classList.remove("rt")
					elTimebarStartMarker.classList.remove("line")
					elTimebarStartMarker.classList.add("br")
					elTimebarEndMarker.style.left = elTimebarEnd.style.left
					elTimebarEndMarker.classList.remove("br")
					elTimebarEndMarker.classList.remove("lt")
					elTimebarEndMarker.classList.remove("line")
					elTimebarEndMarker.classList.add("bl")
				}
			}
		}
	}

	function refreshTimeLists(stet, lastET, lastETVsNow, hr24) {
		stField.setList(refreshST(stet.day, hr24))

		stet.st = ""
		stet.elStart.dataset.starttime = stet.st
		let elSTInput = stet.elStart.childNodes[0].childNodes[1].childNodes[0]
		elSTInput.value = ""

		stet.et = ""
		stet.elEnd.dataset.endtime = stet.et
		let elETInput = stet.elEnd.childNodes[0].childNodes[1].childNodes[0]
		elETInput.value = ""

		if (lastET) {
			let chosenVsLastET = dayDiff(
				lastET,
				dateChangeDays(new Date(), stet.day).valueOf()
			)

			if (chosenVsLastET === 0) {
				let index = chooseTime(timehmampm(lastET, hr24), stet.stUL)

				if (index !== -1) {
					stet.st = timehmampm(lastET, hr24)
					stet.elStart.dataset.starttime = stet.st
					elSTInput.value = stet.st
					stet.stUL.childNodes[index].classList.add(SC)

					lastETSelectAndET(stet, hr24)

					etField.enableList(true)
				}
			} else {
				// If nothing is selected, this at least keeps tabindex
				stet.etUL.scrollTo(0, 0)
				etField.enableList(false)
			}
		} else {
			// If nothing is selected, this at least keeps tabindex
			stet.etUL.scrollTo(0, 0)
			etField.enableList(false)

			etField.enableList(false)
		}

		timebar(stet, hr24)

		if (settings.STClickCallback) {
			settings.STClickCallback()
		}
	}

	function STUpdate(stet) {
		let elSTInput = stet.elStart.childNodes[0].childNodes[1].childNodes[0]
		let st = elSTInput.value ? elSTInput.value : ""
		stet.elStart.dataset.starttime = st
		stet.st = st

		elArrow = stet.elEnd.childNodes[0].childNodes[1].childNodes[1]

		if (st !== "" && st !== "0") {
			etField.enableList(true)

			lastETSelectAndET(stet, hr24)
		} else {
			let elETInput = stet.elEnd.childNodes[0].childNodes[1].childNodes[0]
			elETInput.value = ""
			stet.etUL.innerHTML = ""
			stet.elEnd.dataset.endtime = ""
			stet.et = ""
			etField.enableList(false)
		}

		timebar(stet, hr24)

		if (settings.startTimeClickCallback) {
			settings.startTimeClickCallback()
		}
	}

	// This populates Start time list
	// it also chooses the Start time based on the last time
	// that was chosen
	function refreshST(day, hr24) {
		let zeroTozero
		if (now().getHours() > 12) {
			zeroTozero = true
		} else {
			zeroTozero = false
		}

		let times = []
		if (day === 0) {
			// Today
			if (hr24) {
				times = timesPopulate(
					"00:00",
					timehmampm(
						new Date(lastTimeRounded(now().valueOf())),
						hr24
					),
					zeroTozero,
					hr24
				)
			} else {
				times = timesPopulate(
					"00:00 AM",
					timehmampm(
						new Date(lastTimeRounded(now().valueOf())),
						hr24
					),
					zeroTozero,
					hr24
				)
			}
		} else {
			if (hr24) {
				times = timesPopulateMew("00:00", "23:45", false, hr24)
			} else {
				times = timesPopulate("00:00 AM", "11:45 PM", false, hr24)
			}
		}

		return times
	}

	// Populate list based on start time (st) and end time (et)
	function timesPopulate(st, et, zeroTozero, hr24) {
		let result = []

		let sth = Number(st.slice(0, 2))
		let stm = String(st.slice(3, 5))
		let stampm = st.slice(6, 8)

		let eth = Number(et.slice(0, 2))
		let etm = String(et.slice(3, 5))
		let etampm = et.slice(6, 8)

		let st24h
		stampm.toUpperCase() === "PM" && sth !== 12
			? (st24h = sth + 12)
			: (st24h = sth)

		let et24h
		etampm.toUpperCase() === "PM" && eth !== 12
			? (et24h = eth + 12)
			: (et24h = eth)

		if (etampm.toUpperCase() === "PM" && eth !== 12) {
			et24h = eth + 12
		} else {
			if (eth === 0 && zeroTozero) {
				et24h = 24
			} else {
				et24h = eth
			}
		}

		let mins = ["00", "15", "30", "45"]

		stmIndex = mins.findIndex((cv) => cv === String(stm))
		etmIndex = mins.findIndex((cv) => cv === String(etm))

		for (let hIndex = st24h; hIndex < et24h + 1; hIndex++) {
			if (st24h === et24h) {
				arrMins = mins.slice(stmIndex, etmIndex + 1)
			} else {
				if (hIndex === st24h) {
					if (stmIndex < 4 && stmIndex !== -1) {
						arrMins = mins.slice(stmIndex, 4)
					} else {
						arrMins = mins
					}
				} else if (hIndex === et24h) {
					if (etmIndex < 4 && etmIndex !== -1) {
						arrMins = mins.slice(0, etmIndex + 1)
					} else {
						arrMins = mins
					}
				} else {
					arrMins = mins
				}
			}

			arrMins.forEach((min) => {
				let item = ""

				if (hr24) {
					// 24 hour time
					item = (hIndex < 10 ? "0" + hIndex : hIndex) + ":" + min
				} else {
					// 5 different cases here
					if (hIndex < 10) {
						item = `0${hIndex}:${min} AM`
						// elLI.dataset.ampm = "AM"
					} else {
						if (hIndex < 12) {
							item = `${hIndex}:${min} AM`
							// elLI.dataset.ampm = "AM"
						} else {
							if (hIndex === 12) {
								item = `${hIndex}:${min} PM`
							} else if (hIndex < 22) {
								item = `0${hIndex - 12}:${min} PM`
							} else {
								item = `${hIndex - 12}:${min} PM`
							}
							// elLI.dataset.ampm = "PM"
						}
					}
				}

				result.push(item)
			})
		}

		return result
	}

	// This chooses a time in the list given time text
	// When a start and end time period is added, the next time period
	// start time is the end time of the previous one
	// this function chooses the start time in the list
	function chooseTime(time, ul) {
		let elUL = ul

		let findLiItem = Array.from(elUL.childNodes).findIndex(
			(li) => li.textContent === time
		)

		if (findLiItem !== -1) {
			elUL.childNodes[findLiItem].classList.add(SC)
			scrollItemToTop(elUL, findLiItem)
		}

		return findLiItem
	}

	// When an item is selected, scroll to top
	function scrollItemToTop(ul, itemSelected) {
		if (itemSelected !== -1) {
			let ulTop = ul.offsetTop
			let itemTop = ul.childNodes[itemSelected].offsetTop

			ul.scrollTo(0, itemTop - ulTop - 10)
		}
	}

	// -------------------------------------------------------------------------------
	// ^LOCALSTORAGE

	// make changes here
	function getLastETStored(id) {
		if (typeof localStorage == "undefined") return null

		let lastET = Number(localStorage.getItem(id))

		if (lastET) {
			if (Number(lastET) === "NaN") {
				lastET = lastTimeRounded(new Date().valueOf()).valueOf()
				setLastETStored(id, lastET)
			}
		} else {
			lastET = lastTimeRounded(new Date().valueOf()).valueOf()
			setLastETStored(id, lastET)
		}

		return lastET
	}

	// takes a number
	function setLastETStored(id, lastet) {
		if (typeof localStorage !== "undefined")
			localStorage.setItem(id, String(lastet))
	}

	// ^ET -----------------------------------

	function ETUpdate(stet, selectedIndex) {
		let elETInput = stet.elEnd.childNodes[0].childNodes[1].childNodes[0]
		let et = elETInput.value ? elETInput.value : ""

		stet.elEnd.dataset.endtime = et
		stet.et = et

		timebar(stet, hr24)

		if (settings.endTimeClickCallback) settings.endTimeClickCallback()
	}

	// Find the time after the ST selected, that's what
	// ET list starts with
	function nextTimeSelectedST(stet, hr24) {
		let selectedIndex = listFindSelected(stet.stUL, SC)

		// We need the full list unfiltered because when the list is filtered
		// indexes can't be relied on
		let fullList = refreshST(stet.day, hr24)

		let selectedFromFullList = fullList.findIndex(
			(cv) => cv === stet.stUL.children[selectedIndex].textContent
		)

		if (selectedFromFullList !== -1) {
			if (selectedFromFullList !== fullList.length) {
				return fullList[selectedFromFullList + 1]
			}
		}
		return ""
	}

	// When page is refreshed or a new day selected
	// ST is refreshed. It looks to see if lastET
	// is same as day and it selects that and
	// populates ET list
	function lastETSelectAndET(stet, hr24) {
		let nextST = nextTimeSelectedST(stet, hr24)
		let times = []
		if (nextST !== "" && typeof nextST !== "undefined") {
			times = refreshET(stet.id, stet.day, nextST, hr24)
		} else {
			stet.etUL.innerHTML = ""
			if (stet.day !== 0) {
				// The End time list can end at midnight,
				// Start time list cannot have midnight
				// at the end of the list
				hr24 ? times.push("00:00") : times.push("00:00 AM")
			} else {
				times = refreshET(
					stet.id,
					stet.day,
					timehmampm(
						new Date(dateFormat(0, stet.st, false) + 1000 * 60 * 15)
					),
					hr24
				)
			}
		}
		etField.setList(times)
	}

	function refreshET(id, day, time, hr24) {
		let zeroTozero
		if (now().getHours() > 12) {
			zeroTozero = true
		} else {
			zeroTozero = false
		}

		let times = []
		if (day === 0) {
			// Today
			const MINS_AHEAD_ET = 1000 * 60 * 15
			times = timesPopulate(
				time,
				timehmampm(
					new Date(lastTimeRounded(now().valueOf() + MINS_AHEAD_ET)),
					hr24
				),
				zeroTozero,
				hr24
			)
		} else {
			if (hr24) {
				times = timesPopulate(time, "23:45", zeroTozero, hr24)
			} else {
				times = timesPopulate(time, "11:45 PM", zeroTozero, hr24)
			}

			// The End time list can end at midnight,
			// Start time list cannot have midnight
			// at the end of the list
			hr24 ? times.push("00:00") : times.push("00:00 AM")
		}

		return times
	}

	// Current date chosen (dayChosen variable), it takes time
	// and makes it a date-time value
	function dateFormat(day, time, hr24) {
		let dayChosen = dateChangeDays(new Date(), day)
		let hr = timeHourMin(time, hr24)
		let dt = new Date(
			dayChosen.getFullYear(),
			dayChosen.getMonth(),
			dayChosen.getDate(),
			hr.h,
			hr.m,
			0,
			0
		)

		return dt.valueOf()
	}

	// displays duration in decimal
	function durationDecimal(st, et, hr24) {
		let duration
		if (st === "0" || et === "0" || st === "" || et === "") {
			duration = 0
		} else {
			if (et.slice(0, 5) === "00:00") {
				duration =
					timeDecimal(et, hr24, false) - timeDecimal(st, hr24, true)
			} else {
				duration =
					timeDecimal(et, hr24, true) - timeDecimal(st, hr24, true)
			}
		}

		return duration
	}

	// Displays duration as a string with 'hours'
	// or 'mins'
	function duration(st, et, hr24) {
		let dur = durationDecimal(st, et, hr24)

		if (dur < 0.04166) {
			// if it's less than an hour, use minutes as the duration measure
			return {
				durationText: Math.round(dur * 1440) + " mins",
				durationDecimal: durationDecRound(dur * 24),
			}
		} else {
			let str = String((dur * 24).toFixed(2))

			if (str.slice(str.length - 3, str.length) === ".00") {
				str = str.slice(0, str.length - 3)
			} else if (str.slice(str.length - 3, str.length) === ".50") {
				str = str.slice(0, str.length - 1)
			}

			return {
				durationText: str + " hrs",
				durationDecimal: durationDecRound(dur * 24),
			}
		}

		// Duration is either whole number, .25, .5, .75
		// Long Floating points are given
		// This rounds it up
		function durationDecRound(dur) {
			let str = String(dur)

			switch (str.slice(str.indexOf("."), str.indexOf(".") + 2)) {
				case ".0":
					return str.slice(0, str.indexOf("."))
				case ".9":
					return Number(str.slice(0, str.indexOf("."))) + 1
				case ".2":
					return Number(str.slice(0, str.indexOf(".")) + ".25")
				case ".4":
					return Number(str.slice(0, str.indexOf(".")) + ".5")
				case ".5":
					return Number(str.slice(0, str.indexOf(".")) + ".5")
				case ".6":
					return Number(str.slice(0, str.indexOf(".")) + ".5")
				case ".7":
					return Number(str.slice(0, str.indexOf(".")) + ".75")
				default:
					return dur
			}
		}
	}

	// It rounds the time to the next 15 mins if it's not already
	// result is put into lastET variable
	// It assures the lastET is a time that can be chosen
	// from a Start time end time list because it's
	// a time with minutes ending in :00, :15, :30, :45
	function lastTimeRounded(dt) {
		let {y, m, d, hr, min} = dmyhm(dt)

		let minNew = min
		if (min % 15 !== 0) {
			minNew = min - (min % 15)
		}

		return new Date(y, m, d, hr, minNew)
	}

	// Refresh every 10 mins
	function onTimeout() {
		// record st and et selected
		// I wish I didn't have to do lastET
		// maybe just do null

		// maybe just add to et list
		// .getList()

		let lastET = saveLastETInLocalStorage
			? getLastETStored(objSTET.id)
			: null
		let lastETVsNow = lastET ? dayDiff(lastET, now().valueOf()) : null

		refreshTimeLists(objSTET, lastET, lastETVsNow, hr24)

		setTimeout(() => onTimeout(), 1000 * 60 * 10)
	}

	setTimeout(() => onTimeout(), 1000 * 60 * 10)

	// -------------------------------------------------------------------------------
	// ^WARNING AND RESULTS

	// it uses StetSettings and generates warnings
	// based on the settings
	// Currently the only setting warnings are:
	// * Star time - x hours before now
	// * duration threshold - if over x hrs, warn me
	function stetWarnings(day, st, et) {
		let hrsAgo = hoursDiff(now().valueOf(), dateFormat(day, st, hr24))
		let warn = ""
		let durationDec = 0

		if (st !== "0" && st !== "" && et !== "0" && et !== "") {
			durationDec = durationDecimal(st, et, hr24)
		}

		if (st !== "0" && st !== "" && et !== "0" && et !== "") {
			if (durationDec > durationOverXHrs / 24 && durationOverXHrs !== 0) {
				warn = requiredMsg(
					warn,
					"This is over " + durationOverXHrs + " hours."
				)
			}
		}

		if (st !== "0" && st !== "") {
			if (
				startTimeXHrsBeforeNow <= hrsAgo &&
				startTimeXHrsBeforeNow !== 0
			) {
				warn = requiredMsg(
					warn,
					"The Start time was " + hrsAgo + " hours ago."
				)
			}
		}

		return warn
	}

	// This function returns an object with the st, et, duration
	// warning message, required message
	// Run this function in an Add event
	// refresh means clear the start time and end time lists
	// and refresh the timebar
	// updateLocalStorage tells it to localStorage with the lastET
	function getResults(refresh) {
		const refr = refresh || false
		let result = {}
		let elStet = document.querySelector(target + "> .stet")

		let objSTET = stetDOM(elStet)

		result.day = objSTET.day
		result.st = objSTET.st
		result.et = objSTET.et

		let required = ""

		// result.stet = objSTET
		if (!objSTET.st) {
			required = "Start time not filled in"
		}
		if (!objSTET.et) {
			required = requiredMsg(required, "End time not filled in")
		}

		let stFilledIn = Boolean(objSTET.st)
		let etFilledIn = Boolean(objSTET.et)

		result.required = required
		result.stFilledIn = stFilledIn
		result.etFilledIn = etFilledIn
		result.stetFilledIn = stFilledIn && etFilledIn
		let {durationText, durationDecimal} = duration(
			objSTET.st,
			objSTET.et,
			hr24
		)
		result.durationText = durationText || ""
		result.durationDecimal = durationDecimal || 0

		let stt = objSTET.st ? objSTET.st : "0"
		let ett = objSTET.et ? objSTET.et : "0"

		let w = stetWarnings(objSTET.day, stt, ett)
		result.warnings = w

		if (refr) {
			if (result.stetFilledIn) {
				let lastET = lastTimeRounded(
					dateFormat(result.day, ett, hr24)
				).valueOf()
				if (saveLastETInLocalStorage)
					setLastETStored(objSTET.id, lastET)

				stField.clearField()
				etField.clearField()
				objSTET.st = ""
				objSTET.et = ""

				let lastETVsNow = lastET
					? dayDiff(lastET, now().valueOf())
					: null

				refreshTimeLists(
					objSTET,
					lastTimeRounded(
						dateFormat(result.day, ett, hr24)
					).valueOf(),
					lastETVsNow,
					hr24
				)
			}
		}

		return result
	}

	return {getResults}
}
