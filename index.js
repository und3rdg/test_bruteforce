#!/bin/node
const axios = require('axios')
// const url_cors = "https://cors-anywhere.herokuapp.com/" // in node I don't need it, but if you will ask me to run it in browser, I will need to use it.
const url_base = "http://qcvault.herokuapp.com/"
const url_send = url_base + "unlock_safe"

// init code as a string
let code = "000"

// convert code to number,
// then add string "00" to number
// and return only last 3 characters of string
const next_code = code =>  ("00"+(+code+1)).slice(-3) // I will never do shortcut like that on production, but on simple, one time use script or prototype... why not.


// fetching data
const check_code = code => {
    // form data for API
    const data = {
        first: code[0],
        second: code[1],
        third: code[2],
    }

    axios({
        method: 'POST',
        url: url_send,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        json: true,
    })
        .then(res=>{
            // output to console only if code is not wrong
            if(res.data !== "Wrong code") {
                console.log(res.data)
                console.log(data) // object from current iteration
            }
        })
        .catch(err=>console.log(err.toJSON())) // habit
}



// checking string (optimisation)
while(code !== "999") {
    check_code(code)
    code = next_code(code)
}
check_code(code) // one more run for case "999"



// http://imagy.me/bncfzx8obg

// Congratulation, you found the code.<br>Please send us the following quote along with your source code.<br>"If brute force does not solve your problems, then you are not using enough."
