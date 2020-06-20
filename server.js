const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config_local.env' }); // Setting env. variables
const app = require('./app');

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting Down ...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED REJECTION! Shutting Down ...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    // process.env.DATABASE_LOCAL
    userNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection Successful'));

// STARTING THE SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
