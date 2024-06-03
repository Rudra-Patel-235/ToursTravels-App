const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
  path: './config.env',
});
const app = require('./app');
const tourRouter = require('./routes/tourRoutes');
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successfull');
  });

// console.log(process.env);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server started on port ${port}...`);
});
