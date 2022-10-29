async function initialize() {
    if (isObjectEmpty(data)) {
        alert("There is no data.")
    } else {
        objData = await JSON.parse(data.value)

        console.log(objData)

        render()

        // for testing
        allDataSplit = timesheetCategorySplitGenerate(startOfData, today)

        SCROLL_HEIGHT = rootElement.scrollHeight;
        // console.log(SCROLL_HEIGHT)
    }


}

function databaseUpdate(data) {}
