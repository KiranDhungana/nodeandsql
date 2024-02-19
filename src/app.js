const express = require('express');
const connection =require('./db.js');



const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    connection.query('SELECT * FROM user', (err, rows) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          return;
        }
        const dataArray = [];
        rows.forEach(rows => {
          const id = rows.id;
          const name = rows.name;
          
          // Push the values into the dataArray
          dataArray.push({ id, name });
      });
      res.send(dataArray);

      });
});

app.post('/user', (req, res) => {
  const name =req.body.name;
  console.log(name);
  const sql = `INSERT INTO user (name) VALUES ('${name}')`;
  connection.query(sql,(err, results) => {
    if (err) {
        console.error('Error inserting data:', err);
        return;
    }
    res.send('Data inserted successfully');
});

});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});