require('dotenv').config();
const htttp = require('http');
const app = require('./index');

const server = htttp.createServer(app);
server.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });

