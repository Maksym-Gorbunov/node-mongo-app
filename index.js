const express = require('express')
const database_url = 'mongodb+srv://mg-user:f9on8swTaWHH7zx8@cluster0.buaxg.mongodb.net/mongo-db?retryWrites=true&w=majority'
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todosRoutes = require('./routes/todos')
const path = require('path')
const PORT = process.env.PORT || 3000
const app = express()

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.set('views', 'views')
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(todosRoutes)


async function start(){
    try{
        //connect to db
        await mongoose.connect(database_url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        //start server
        app.listen(PORT, () => {
            console.log('Server has been started...')
        })
    } catch(e) {
        console.log(e)
    }
}

start()