const categories = ["Code-Coding", "Code-Reading", "Code-Other",
    "Shopping", "Cooking", "Cleaning", "Chores", "Chores-Mum",
    "Timesheet", "Morning routine", "Review",
    "Reading",
    "Mind-Meditate", "Mind-Projects", "Mind-Brainstorm", "Mind-Thought experiments", "Mind-Other",
    "Exercise-Walk", "Exercise",
    "Social-Chats-Phone", "Social-Going out",
    "SH-Podcast",
    "Podcast-Misc",
    "TV-YT",
    "Sport-League", "Sport-Cricket", "Sport-Boxing", "Sport-Other",
    "Relaxing",
    "Misc",
    "Investing", "Financial",
    "Health",
    "Wasted-Drunk", "Wasted-Computer",
    "Weekly", "Monthly", "Yearly",
    "Sleep", "Eating"
]


// Today is automatically included with a table and no graph. This can't be changed.
// For dates, they can be 'today', 'ws', 'we', 'ms', 'me', 'ys', 'ye'
// w, m, y - week, month, year, s start, e - end
// 'we' is week end, 'ms' is start of month
// 'm-1s' is start of previous month
const settings = [{
        name: "This week",
        startDate: "ws",
        endDate: "we",
        table: false,
        categoryGraph: true,
        hideDefault: false,
        goal: ""
    },
    {
        name: "This month",
        startDate: "ms",
        endDate: "me",
        table: false,
        categoryGraph: true,
        hideDefault: false,
        goal: ""
    },
    {
        name: "Last month",
        startDate: "m-1s",
        endDate: "m-1e",
        table: false,
        categoryGraph: true,
        hideDefault: true,
        goal: ""
    },
    {
        name: "Two months ago",
        startDate: "m-2s",
        endDate: "m-2e",
        table: false,
        categoryGraph: true,
        hideDefault: true,
        goal: ""
    },
    {
        name: "Rolling Last 90 days",
        startDate: "d-90",
        endDate: "today",
        table: false,
        categoryGraph: true,
        hideDefault: false,
        goal: ""
    }
]
