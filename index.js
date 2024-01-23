const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

app.use(express.static('public'))

// Index route
app.get('/', function (req, res) {
res.send('Zakasnina iznosi 7 centi po danu kašnjenja. Koliko dana kasnite s vraćanjem knjige?')

})

app.post('/zakasnina/', function (req, res) {
    console.log(JSON.stringify(req.body));
    var dani_kasnjenja = req.body.result.parameters.dani_kasnjenja;
    //const dani_kasnjenja = req.body.queryResult.parameters && req.body.queryResult.parameters.dani_kasnjenja;
    var cijena_po_danu = 0.07
    var ukupni_iznos = dani_kasnjenja * cijena_po_danu;
    
    res.setHeader('Content-Type', 'application/json');
    var botSpeech = "Vaša zakasnina u trajanju od " + dani_kasnjenja
    + " dana iznosi " + ukupni_iznos + " €.";
    out = {speech: botSpeech,
        displayText: botSpeech,
        data: null};
    var outString = JSON.stringify(out);
    console.log('Out:' + outString);
    res.send(outString);
})

// Spin up the server
app.listen(app.get('port'), function() {
console.log('running on port', app.get('port'))
})
