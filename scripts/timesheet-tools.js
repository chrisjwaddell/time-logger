function categoryNameChange(category) {
    // write code here
}

function itemEdit() {
    // objData.timesheetItems[33].description = "Timesheet - sort and graph - Chose Chart.js"
}


function itemsFindCategory(category) {
    return objData.timesheetItems.filter(item => item.category === category)
}

function itemsFindDate(dt) {
    let result = []
    result = objData.timesheetItems.filter(item => item.tdate === dt)

    console.table(result)
}

function itemsFind2(category) {
    // function itemsFind(startdate, enddate, category) {
    return allDataSplit.filter(item => item.category === category)
}

function sumHours(arr) {
    return arrCC.reduce((acc, cv) => acc + cv.hours, 0)
}



let startOfData = new Date(2022, 8, 1)
let today = new Date()



// I made timesheetCategory global to make it easier
