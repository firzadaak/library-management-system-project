const express = require('express');
const { db } = require('./models');
const { router}  = require('./routers');

const app = express();
app.use(express.json());

app.use("/api", router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  db.sync()
});