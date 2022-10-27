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
    "TV"
]


// These colors correspond to the categories
const categoryColors = [
    // Exercise
    {
        r: 255,
        g: 100,
        b: 20
    },
    {
        r: 255,
        g: 150,
        b: 20
    },

    // Work
    {
        r: 150,
        g: 0,
        b: 200
    },

    // Kids
    {
        r: 40,
        g: 150,
        b: 150
    },


    // Meeting friends
    {
        r: 50,
        g: 140,
        b: 0
    },

    // Shopping
    {
        r: 180,
        g: 50,
        b: 0
    },


    // Chores
    {
        r: 180,
        g: 50,
        b: 100
    },

    // Reading
    {
        r: 0,
        g: 150,
        b: 50
    },
    // Relaxing
    {
        r: 50,
        g: 150,
        b: 50
    },

    // TV
    {
        r: 150,
        g: 100,
        b: 150
    }

];



// You should start with "Today". If 'name' is 'Today', it automatically
// excludes date from the table. This can't be changed.
// startDate and endDate must be Date objects.
const settings = [{
        enabled: true,
        name: "Today",
        startDate: BlueMoon({
            day: "current"
        }),
        endDate: BlueMoon({
            day: "current"
        }),
        table: true,
        categoryGraph: true,
        hideDefault: false,
        goal: ["Daily goal - 30 mins exercise"]
    },
    {
        enabled: true,
        name: "Yesterday",
        startDate: BlueMoon({
            day: "-1"
        }),
        endDate: BlueMoon({
            day: "-1"
        }),
        table: true,
        categoryGraph: true,
        hideDefault: false,
        goal: ["Daily goal - 30 mins exercise"]

    },
    {
        enabled: true,
        name: "This week",
        startDate: BlueMoon({
            day: "mon"
        }),
        endDate: BlueMoon({
            day: "sun"
        }),
        table: true,
        categoryGraph: true,
        hideDefault: false,
        goal: [
            "Exercise - 4 hours"
        ]

    },
    {
        enabled: true,
        name: "Last week",
        startDate: BlueMoon({
            day: "mon",
            week: "-1"
        }),
        endDate: BlueMoon({
            day: "sun",
            week: "-1"
        }),
        table: true,
        categoryGraph: true,
        hideDefault: true,
        goal: [
            "Exercise - 4 hours"
        ]
    },
    {
        enabled: true,
        name: "Two weeks ago",
        startDate: BlueMoon({
            day: "mon",
            week: "-2"
        }),
        endDate: BlueMoon({
            day: "sun",
            week: "-2"
        }),
        table: true,
        categoryGraph: true,
        hideDefault: true,
        goal: [
            "Exercise - 4 hours"
        ]
    },
    {
        enabled: true,
        name: "This month",
        startDate: BlueMoon({
            day: 1
        }),
        endDate: BlueMoon({
            day: "monthend"
        }),
        table: false,
        categoryGraph: true,
        hideDefault: false,
        goal: [
            "Exercise - 16 hours",
            "Reading - 20 hours"
        ]
    },
    {
        enabled: true,
        name: "Last month",
        startDate: BlueMoon({
            day: 1,
            month: "-1"
        }),
        endDate: BlueMoon({
            day: "monthend",
            month: "-1"
        }),
        table: false,
        categoryGraph: true,
        hideDefault: true,
        goal: [
            "Exercise - 16 hours",
            "Reading - 20 hours"
        ]
    },
    {
        enabled: true,
        name: "Two months ago",
        startDate: BlueMoon({
            day: 1,
            month: "-2"
        }),
        endDate: BlueMoon({
            day: "monthend",
            month: "-2"
        }),
        table: false,
        categoryGraph: true,
        hideDefault: true,
        goal: [
            "Exercise - 16 hours",
            "Reading - 20 hours"
        ]
    },
    {
        enabled: true,
        name: "Rolling Last 90 days",
        startDate: BlueMoon({
            day: "-90"
        }),
        endDate: BlueMoon({
            day: "current"
        }),
        table: false,
        categoryGraph: true,
        hideDefault: false,
        goal: ["Exercise - 40 hours"]
    }
]
