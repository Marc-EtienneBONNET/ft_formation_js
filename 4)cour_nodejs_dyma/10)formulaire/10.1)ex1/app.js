const  express = require('express');
const path = require('path');
require('./database/server');
const route = require('./routes/route');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, "/views/"));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(route.route);

app.listen(port);