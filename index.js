const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
require('dotenv').config();


//mongoose connections
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true,useUnifiedTopology: true}, ((err, db) => {
    if (err) {
        console.log(process.env.DATABASE)
        console.log("mongodb connection failed!!!!")
    } else {
        console.log("mongodb connected success")
        require('./cron')
    }
}))

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(cookieParser());
app.use(cors());



require('./api/routes/user')(app)
require('./api/routes/rooms')(app)
require('./api/routes/bookings')(app)
require('./api/routes/staff')(app)


app.get("/test",async(req,res)=>{
    console.log("request come here",new Date())
    res.send("server is running..")
})


const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`server is running on port ${port} time- ${new Date()}`)
})