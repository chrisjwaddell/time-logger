async function initialize() {

    if (!ls.supported) {
        alert("localStorage is not supported. Unfortunetely, you can't use Time-logger")
    } else {


        try {
            objData = ls.get("time-logger-data")
        } catch (err) {
            objData = {}
            objData.timesheetItems = []
        }

        if (objData) {
            render()

            // for testing
            allDataSplit = timesheetCategorySplitGenerate(startOfData, today)

            SCROLL_HEIGHT = rootElement.scrollHeight;
            // console.log(SCROLL_HEIGHT)
        } else {
            objData = {}
            objData.timesheetItems = []
        }
    }

}

function databaseUpdate(item, data) {
    let result = ls.set("time-logger-data", data)
    return (result === false) ? false : true 
}



function backup() {
    let today = new Date();
    let backupKey = String(today.getFullYear()) + ((today.getMonth() > 8) ? String(today.getMonth() + 1) : "0" + String(today.getMonth())) + ((today.getDate() > 9) ? today.getDate() : "0" + today.getDate())

    ls.set(backupKey, data)
}
