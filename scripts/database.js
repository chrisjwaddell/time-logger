async function initialize() {
    try {
        objData = ls.get("time-logger-data")
    } catch (err) {
        objData = {}
    }

    console.log(objData)

    render()

    // for testing
    allDataSplit = timesheetCategorySplitGenerate(startOfData, today)

    SCROLL_HEIGHT = rootElement.scrollHeight;
    // console.log(SCROLL_HEIGHT)


}

function databaseUpdate(data) {
    ls.set("time-logger-data", data)
}



function backup() {
    let today = new Date();
    let backupKey = String(today.getFullYear()) + ((today.getMonth() > 8) ? String(today.getMonth() + 1) : "0" + String(today.getMonth())) + ((today.getDate() > 9) ? today.getDate() : "0" + today.getDate())

    ls.set(backupKey, data)
}
