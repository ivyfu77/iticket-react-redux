require("babel-core/register")({
    "presets":["es2015", "react", "stage-1"],
    "plugins": [
        [  
            "css-modules-transform", {
                "generateScopedName": "[name]__[local]___[hash:base64:5]",
                 "extensions": [".css"]
            }
        ],
        ["transform-decorators-legacy"],
        ["system-import-transformer"]
    ]
})

var events = require("./routes/events");
var index = require("./routes/index")

const express = require("express")
const app = express();
const compression = require("compression")

app.use(compression())
app.use(express.static(__dirname + "/../dist"))

if(process.env.NODE_ENV === 'production'){
    app.set('views', "./server/views/production")
}else{
    app.set('views', "./server/views/development")
}

app.set('view engine', 'ejs')

app.use("/events", events)
app.use("/", index);


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    console.log("App is running in " + process.env.NODE_ENV + " environment");
})