const express = require("express");
const https = require("https");
const app = express();


app.get("/", (req,res)=>{
    
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.2608724&lon=-123.113952&appid=c6e14cc884dc83ae1a4a66fb78a30dfd&units=metric";

    https.get(url, (response)=>{
        console.log(response);

        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            const des = weatherData.weather[0].description;
            const temperature = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const iconLink = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            console.log(des);
            res.send(`
                <h1>The temperature in Vancouver is ${temperature} Celsius</h1>
                <br>
                <p>The weather is currently with ${des}</p>
                <img src="${iconLink}" alt="${des} weather icon">
            `);
        });
    });

    

    
});





app.listen(3000, ()=>{
    console.log("Server started on port 3000")
});