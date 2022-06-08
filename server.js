const app = require('./app')
const {connectToDb} = require('./db/connection');

require('dotenv').config();

const { PORT, MONGO_URL } = process.env;

async function startServer() {
  try {
    await connectToDb(MONGO_URL);
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log('ERROR', error.message);
    process.exit(1);
  }
}

startServer();

