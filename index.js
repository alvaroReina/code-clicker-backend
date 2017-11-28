const express = require('express');
const morgan = require('morgan');
const winston = require('winston');

const PORT = process.env.PORT || 5000;
const app = express();

const logger = new winston.Logger({
  transports: [
    new winston
      .transports
      .File({filename: 'app.log', level: 'info'}),
    new winston
      .transports
      .Console({level: 'debug'})
  ],
  exitOnError: false
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

app.use(morgan('combined', {stream: logger.stream}));

app.get('/', (req, res) => {
  res.json({message: 'Hello'});
});

app.listen(PORT, () => {
  logger.info('Server running on port', PORT);
});
