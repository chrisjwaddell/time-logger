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

            main()

            // for testing
            allDataSplit = timesheetCategorySplitGenerate(startOfData, today)
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



function databaseUpdate(data) {
    objFirebase = {
        key: "Main",
        value: JSON.stringify(data)
    }

    socket.emit('timesheetupdate', objFirebase)
}
