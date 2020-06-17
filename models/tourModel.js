const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config_local.env' });

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    // process.env.DATABASE_LOCAL
    userNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB Connection Successful');
  });

// Creating a mongodb schema with mongoose
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
