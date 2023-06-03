// const {
//     type
// } = require("os");

function testDBSend() {
    return fetch("http://localhost:5027/test", {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: "SELECT * FROM category;"
        })
        .then(response => response.json());
}

async function load() {
    let a = await testDBSend();
    console.log(a)
    return a
}

load()

async function testDBSQL(sql) {
    console.log(sql)
    console.log(typeof sql)
    return fetch("http://localhost:5027/test", {
            method: 'POST',
            // body: "SELECT * FROM category;"
            body: String(sql)
        })
        .then(txt => txt.json())
        .catch(err => {
            err: "An error occurred."
        })
}


async function testDBItem(json) {
    // console.log(json)
    // console.log(typeof json)

    let obj = {
        tdate: "18/11/22",
        starttime: "21:15",
        endtime: "21:30",
        category: ["Misc"],
        hours: [0.25],
        description: ""
    }

    let jsonstr = JSON.stringify(obj);

    console.log(jsonstr);

    return await fetch("http://localhost:5027/timelogger-add", {
            method: 'POST',
            headers: new Headers({
                //     'Accept': 'application/json',
                //     "Access-Control-Allow-Origin": 'http://localhost:5027',
                //     // 'Content-Type': 'application/json',
                'content-type': 'application/json'
            }),
            body: jsonstr
        })

        .then(txt => txt.json())
        .catch(err => {
            err: "An error occurred."
        })


    //    await fetch("http://localhost:5027/timelogger-add", {
    //        method: 'POST',
    // body: "SELECT * FROM category;"

    // headers: {
    // 'Access-Control-Allow-Origin': 'http://localhost:5027',
    // 'Accept': 'application/json',
    // "Content-Type": "application/json",
    // "Content-Type": "application/json"
    // },

    // headers: {
    //     'Accept': 'application/json',
    //     // 'Content-Type': 'application/json;charset=UTF-8'
    //     'Content-Type': 'application/json'
    // },

    // body: String(json)
    //        body: jsonstr
    //    })

}

function testDBItem2() {
    return fetch("http://localhost:5027/timelogger-add", {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json;charset=UTF-8'
                // 'Access-Control-Allow-Origin': 'http://localhost:5502',
                // 'Origin': 'http://localhost:5502',
                // 'Access-Control-Allow-Origin': '*',
                // "Access-Control-Allow-Credentials": "true",
                // 'Access-Control-Allow-Headers': 'Origin, Access-Control-Allow-Origin, Content-Type, Accept',
                // 'Access-Control-Allow-Headers': 'Content-Type',
                // 'Content-Type': 'application/json'
            },
            body: "SELECT * FROM category;"
        })
        // .then(response => response.json());
        .then(response => response.text());
}
