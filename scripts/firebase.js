const options = {
    rememberUpgrade: true,
    transports: ['websocket'],
    secure: true,
    rejectUnauthorized: true
}
const socket = io('http://localhost:8968', options);

let objFirebase = {
    key: "Main"
}


function initialize() {
    socket.on("timesheetget", async function (data) {
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
    })

    socket.on("timesheetupdate", function (data) {
        console.log("Updated")
    })


    objFirebase = {
        key: "Main",
    }

    // socket.emit('timesheetget', objData);
    socket.emit('timesheetget', objFirebase);
}



function databaseUpdate(item, data) {
    data.timesheetItems.push(item)

    objFirebase = {
        key: "Main",
        value: JSON.stringify(data)
    }

    socket.emit('timesheetupdate', objFirebase)
}



function backup() {
    let today = new Date();
    let backupKey = String(today.getFullYear()) + ((today.getMonth() > 8) ? String(today.getMonth() + 1) : "0" + String(today.getMonth())) + ((today.getDate() > 9) ? today.getDate() : "0" + today.getDate())

    let objFirebase = {
        key: backupKey,
        value: JSON.stringify(objData)
    }

    socket.emit("timesheetupdate", objFirebase)

}
