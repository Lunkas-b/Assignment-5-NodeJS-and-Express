const express = require('express');
const logger = require('./middleware/logger.js');
const app = express();
const PORT = 3000

app.set('view engine', 'ejs');
app.use(express.json());
app.use(logger);

// Gets the router that contains all fetch request handling for the model database
const resourceRouter = require('./routes/resources.js');
app.use('/api/resources', resourceRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}\n`)
});