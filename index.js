const express = require("express");
const app = express();

const path = require("path")

if (process.env.NODE_ENV === "production") { // check if this is a production version
    app.use(express.static("build"));
    app.get("*",(req,res)=> {
        req.sendFile(path.resolve(__dirname,"build","index.html"))
    });
}

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,()=>{console.log("react app is up on port ",port);})
