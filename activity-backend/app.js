const express = require ('express');
const routes = require('./router'); 
const controller = require('./controller')

const app = express();

app.use(express.json());

controller.connect();

app.use('/', routes); 

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})
