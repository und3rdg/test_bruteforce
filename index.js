#!/bin/node
const axios = require('axios')
const url_cors = "https://cors-anywhere.herokuapp.com/"
const url_base = "http://qcvault.herokuapp.com/"
const url_send = url_base + "unlock_safe"

const next_code = code =>  ("00"+(+code+1)).slice(-3)



let code = "000"

while(code !== "999") {
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
            if(res.data !== "Wrong code") {
                console.log(res.data)
                console.log(data)
            }
        })
        .catch(err=>console.log(err.toJSON()))

    code = next_code(code)

}

// http://imagy.me/bncfzx8obg

