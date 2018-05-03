const path = require('path');
const express = require('express');
const app = express();

let port = 3000;
let staticPath = path.join(__dirname, '/docs');

app.use(express.static(staticPath));
app.listen(port, () => console.log('Listening on ' + port + '...'));