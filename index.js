const express = require('express');
const app = express();
const Datastore = require('nedb'); 
const port = 3000;

app.listen(3000, () => console.log(`listening on port ${port}!`));

const database = new Datastore('database.db');
database.loadDatabase();

app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));

app.get('/', (req, res) => {
    res.sendFile('./public/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('./public/about.html', { root: __dirname });
});

app.post('/api', (req, res) => {
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    console.log("Entry added to database!");
    res.json(data);
});

app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            console.log("Error!");
            response.end();
            return;
        }
        res.json(data);
    })
});