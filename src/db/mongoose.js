const mongoose = require("mongoose");

const connectionURL = process.env.DATABASE_CONNECTION;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});


