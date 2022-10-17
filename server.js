import Express, { response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import searchMDN from './mdn.js';

const PORT = 8000 || process.env.PORT;

const app = Express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    res.send('A basic API for fetching basic details from the MDN Web Docs in a JSON format.\n')

});

app.post('/fetch', async (req, res) => {

    if(!req.body.query){
        res.send({ error: "No query was given." })
    }

    let query = req.body.query;
    
    let returned = await searchMDN(query);
    res.send(returned);

});

app.listen(PORT, () => {
     console.log(`Listening on port: ${PORT}`)
});

