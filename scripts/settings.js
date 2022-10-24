const categories = ["Code-Coding", "Code-Reading", "Code-Other",
    "Shopping", "Cooking", "Cleaning", "Chores", "Chores-Mum",
    "Timesheet", "Morning routine", "Review",
    "Reading",
    "Mind-Meditate", "Mind-Projects", "Mind-Brainstorm", "Mind-Thought experiments", "Mind-Other",
    "Exercise-Walk", "Exercise",
    "Social-Chats-Phone", "Social-Going out",
    "SH-Podcast", "SH",
    "Podcast-Misc",
    "TV-YT",
    "Sport-League", "Sport-Cricket", "Sport-Boxing", "Sport-Other",
    "Relaxing",
    "Misc",
    "Internet banking", "Investing", "Financial",
    "Health",
    "Wasted-Drunk", "Wasted-Computer", "Waste-General",
    "Weekly", "Monthly", "Yearly",
    "Sleep", "Eating"
]




// These colors correspond to the categories
const categoryColors = [
    // code
    {
        r: 255,
        g: 100,
        b: 20
    },
    {
        r: 255,
        g: 100,
        b: 20
    },
    {
        r: 255,
        g: 100,
        b: 20
    },

    // chores
    {
        r: 150,
        g: 0,
        b: 200
    },
    {
        r: 150,
        g: 0,
        b: 200
    },
    {
        r: 150,
        g: 0,
        b: 200
    },
    {
        r: 150,
        g: 0,
        b: 200
    },
    {
        r: 150,
        g: 0,
        b: 200
    },

    // Daily stuff
    {
        r: 40,
        g: 150,
        b: 150
    },
    {
        r: 40,
        g: 150,
        b: 150
    },
    {
        r: 40,
        g: 150,
        b: 150
    },

    // reading
    {
        r: 220,
        g: 140,
        b: 0
    },

    // Mind
    {
        r: 75,
        g: 0,
        b: 155
    },
    {
        r: 75,
        g: 0,
        b: 155
    },
    {
        r: 75,
        g: 0,
        b: 155
    },
    {
        r: 75,
        g: 0,
        b: 155
    },
    {
        r: 75,
        g: 0,
        b: 155
    },

    // Exercise
    {
        r: 150,
        g: 0,
        b: 200
    },
    {
        r: 150,
        g: 0,
        b: 200
    },

    // Social
    {
        r: 25,
        g: 240,
        b: 55
    },
    {
        r: 25,
        g: 240,
        b: 55
    },

    // SH
    {
        r: 100,
        g: 40,
        b: 175
    },
    {
        r: 100,
        g: 40,
        b: 175
    },

    // Podcasts
    {
        r: 100,
        g: 40,
        b: 175
    },

    // TV, YT
    {
        r: 220,
        g: 220,
        b: 0
    },

    // Sport
    {
        r: 120,
        g: 220,
        b: 70
    },
    {
        r: 120,
        g: 220,
        b: 70
    },
    {
        r: 120,
        g: 220,
        b: 70
    },
    {
        r: 120,
        g: 220,
        b: 70
    },

    // Relax
    {
        r: 220,
        g: 220,
        b: 0
    },

    // Misc
    {
        r: 170,
        g: 140,
        b: 150
    },

    // Financial
    {
        r: 20,
        g: 60,
        b: 200
    },
    {
        r: 20,
        g: 60,
        b: 200
    },
    {
        r: 20,
        g: 60,
        b: 200
    },

    // Health
    {
        r: 150,
        g: 0,
        b: 200
    },

    // Wasted
    {
        r: 240,
        g: 0,
        b: 40
    },
    {
        r: 240,
        g: 0,
        b: 40
    },
    {
        r: 240,
        g: 0,
        b: 40
    },

    // Weekly, Monthly, Yearly
    {
        r: 40,
        g: 150,
        b: 150
    },
    {
        r: 40,
        g: 150,
        b: 150
    },
    {
        r: 40,
        g: 150,
        b: 150
    },

    // Sleep, eat
    {
        r: 240,
        g: 100,
        b: 0
    },
    {
        r: 240,
        g: 100,
        b: 0
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
        goal: ["Code-Coding - 6-10 Hrs",
            "Code-Total - 8-10 Hrs",
            "Every chat, be funny"
        ]
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
        goal: []

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
            "Code-Coding - 40 Hrs",
            "Code-Total - 60-65 Hrs",
            "Wasted-Drunk - less than 7 Hrs",
            "Reading - More than 5 hrs",
            "Txt files - More than 1 hr",
            "Podcasts - More than 2 hrs",
            "TV - Less than 3 hours esp bad TV",
            "Its quality of time, not quantity of time",
            "Put in hrs of TV watches esp Sunday night",
            "Every chat, be funny"
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
            "Code-Coding - 40 Hrs",
            "Code-Total - 60-65 Hrs",
            "Wasted-Drunk - less than 7 Hrs",
            "Reading - More than 5 hrs",
            "Txt files - More than 1 hr",
            "Podcasts - More than 2 hrs",
            "TV - Less than 3 hours esp bad TV",
            "Its quality of time, not quantity of time"
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
            "Code-Coding - 175 Hrs",
            "Code-Total - 260 Hrs",
            "Wasted-Drunk - less than 25 Hrs",
            "Sport - 20 hrs max",
            "Cooking - 16 hrs",
            "Shopping - 14 hrs",
            "Cleaning - 12 hrs",
            "Reading - 28 hrs or more",
            "TV - cut down on murder TV and negative stuff. I don't get a lot of value out of TV. Books are much better."
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
            "Code-Coding - 175 Hrs",
            "Code-Total - 260 Hrs",
            "Wasted-Drunk - less than 25 Hrs",
            "Sport - 20 hrs max",
            "Cooking - 16 hrs",
            "Shopping - 14 hrs",
            "Cleaning - 12 hrs",
            "Reading - 28 hrs or more",
            "TV - cut down on murder TV and negative stuff. I don't get a lot of value out of TV. Books are much better."
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
            "Code-Coding - 175 Hrs",
            "Code-Total - 260 Hrs",
            "Wasted-Drunk - less than 25 Hrs",
            "Sport - 20 hrs max",
            "Cooking - 16 hrs",
            "Shopping - 14 hrs",
            "Cleaning - 12 hrs",
            "Reading - 28 hrs or more",
            "TV - cut down on murder TV and negative stuff. I don't get a lot of value out of TV. Books are much better."
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
        goal: ["Code-Coding - 515 Hrs", "Code-Total - 770 Hrs", "Wasted-Drunk - less than 75 Hrs"]
    }
]
