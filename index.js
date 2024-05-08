const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('Callback test goes here again...  !!!');
});
app.post('/response/callback', (req, res) => {
  res.statusCode = 200;
  console.log(req.body);
  res.json({
    body: req.body,
  });
});

app.post('/callback/:timeout', (req, res) => {
  let { timeout = 5000 } = req.params;
  let { value, url } = req.body;

  console.log('timeout => ' + timeout, 'value => ' + value, 'url => ' + url);

  setTimeout(() => {
    let newValue = Math.random() * value;

    axios.post(
      url,
      { oldValue: value, newValue },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }, +timeout);

  res.statusCode = 200;

  res.json({
    value,
    success: true,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
