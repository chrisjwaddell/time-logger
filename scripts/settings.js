const categories = [
	"Exercise - Running",
	"Exercise - Bush walking",
	"Work",
	"Kids",
	"Meeting friends",
	"Shopping",
	"Chores",
	"Reading",
	"Relaxing",
	"TV",
]

// These colors correspond to the categories
const categoryColors = [
	// exercise
	{
		r: 255,
		g: 100,
		b: 20,
	},
	{
		r: 255,
		g: 100,
		b: 20,
	},

	// work
	{
		r: 150,
		g: 0,
		b: 200,
	},

	// kids
	{
		r: 40,
		g: 150,
		b: 150,
	},

	// Meeting friends
	{
		r: 220,
		g: 140,
		b: 0,
	},

	// shopping, chores
	{
		r: 75,
		g: 0,
		b: 155,
	},
	{
		r: 75,
		g: 0,
		b: 155,
	},

	// reading
	{
		r: 150,
		g: 0,
		b: 200,
	},

	// relaxing
	{
		r: 25,
		g: 240,
		b: 55,
	},

	// TV
	{
		r: 100,
		g: 240,
		b: 175,
	},
]

// 24 hour time is false
let hr24 = false

// You should start with "Today". If 'name' is 'Today', it automatically
// excludes date from the table. This can't be changed.
// startDate and endDate must be Date objects.
const settings = [
	{
		enabled: true,
		name: "Today",
		startDate: BlueMoon(
			{
				day: "current",
			},
			{resultAsDateObject: false}
		),
		endDate: BlueMoon(
			{
				day: "current",
			},
			{resultAsDateObject: false}
		),
		table: true,
		categoryGraph: true,
		hideDefault: false,
		goal: ["Daily goal - 30 mins exercise"],
	},
	{
		enabled: true,
		name: "Yesterday",
		startDate: BlueMoon(
			{
				day: "-1",
			},
			{resultAsDateObject: false}
		),
		endDate: BlueMoon(
			{
				day: "-1",
			},
			{resultAsDateObject: false}
		),
		table: true,
		categoryGraph: true,
		hideDefault: false,
		goal: [],
	},
	{
		enabled: true,
		name: "This week",
		startDate: BlueMoon(
			{
				day: "Mon",
			},
			{resultAsDateObject: false}
		),
		endDate: BlueMoon(
			{
				day: "Sun",
			},
			{resultAsDateObject: false}
		),
		table: true,
		categoryGraph: true,
		hideDefault: false,
		goal: ["Exercise - 4 hours"],
	},
	{
		enabled: true,
		name: "Last week",
		startDate: BlueMoon(
			{
				day: "Mon",
				week: "-1",
			},
			{resultAsDateObject: false}
		),
		endDate: BlueMoon(
			{
				day: "Sun",
				week: "-1",
			},
			{resultAsDateObject: false}
		),
		table: true,
		categoryGraph: true,
		hideDefault: true,
		goal: ["Exercise - 4 hours"],
	},
	{
		enabled: true,
		name: "Two weeks ago",
		startDate: BlueMoon(
			{
				day: "Mon",
				week: "-2",
			},
			{resultAsDateObject: false}
		),
		endDate: BlueMoon(
			{
				day: "Sun",
				week: "-2",
			},
			{resultAsDateObject: false}
		),
		table: true,
		categoryGraph: true,
		hideDefault: true,
		goal: ["Exercise - 4 hours"],
	},
	{
		enabled: true,
		name: "This month",
		startDate: BlueMoon(
			{
				day: 1,
			},
			{resultAsDateObject: false}
		),
		endDate: BlueMoon(
			{
				day: "monthend",
			},
			{resultAsDateObject: false}
		),
		table: false,
		categoryGraph: true,
		hideDefault: false,
		goal: ["Exercise - 16 hours", "Reading - 20 hours"],
	},
	{
		enabled: true,
		name: "Last month",
		startDate: BlueMoon(
			{
				day: 1,
				month: "-1",
			},
			{resultAsDateObject: false}
		),
		endDate: BlueMoon(
			{
				day: "monthend",
				month: "-1",
			},
			{resultAsDateObject: false}
		),
		table: true,
		categoryGraph: true,
		hideDefault: true,
		goal: ["Exercise - 16 hours", "Reading - 20 hours"],
	},
	{
		enabled: true,
		name: "Two months ago",
		startDate: BlueMoon(
			{
				day: 1,
				month: "-2",
			},
			{resultAsDateObject: false}
		),
		endDate: BlueMoon(
			{
				day: "monthend",
				month: "-2",
			},
			{resultAsDateObject: false}
		),
		table: false,
		categoryGraph: true,
		hideDefault: true,
		goal: ["Exercise - 16 hours", "Reading - 20 hours"],
	},
	{
		enabled: true,
		name: "Rolling Last 90 days",
		startDate: BlueMoon(
			{
				day: "-90",
			},
			{resultAsDateObject: false}
		),
		endDate: BlueMoon(
			{
				day: "current",
			},
			{resultAsDateObject: false}
		),
		table: false,
		categoryGraph: true,
		hideDefault: false,
		goal: ["Exercise - 40 hours"],
	},
]
