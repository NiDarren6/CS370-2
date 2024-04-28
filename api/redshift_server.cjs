const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// const urlencodedParser = bodyParser.urlencoded({ extended: false });

// app.use(express.static('public'));



const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static('public'));





const pool = new Pool({ //NEED TO SWITCH TO ENVIRONMENTAL VARIABLES
  user: 'coa_datalabs',
  host: 'coa-final-cluster.cdcmyat6z0fm.us-east-1.redshift.amazonaws.com',
  database: 'dev',
  password: 'CoADashboard#!ATL1',
  port: 5439,
});

// app.get('/', function (req, res) {
// 	res.sendFile(path.join(__dirname, '..', 'index.html'));
// });


app.get('/api/company_page', async (req, res) => {
    try {
      const queryResult = await pool.query(`SELECT name, industries, round, amount, round_valuation_usd, growth_stage, launch_year, total_rounds_number, current_company_valuation FROM coadata.master_table_stg`);
      res.json(queryResult.rows); 
    } catch (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error fetching data'); 
    }
  });

app.get('/api/map', async (req, res) => {
    try {
      const queryResult = await pool.query(`SELECT latitude, longitude FROM coadata.locations`);
      res.json(queryResult.rows); 
    } catch (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error fetching data'); 
    }
  });



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

