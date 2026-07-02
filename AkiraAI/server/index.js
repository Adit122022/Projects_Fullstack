import "dotenv/config";
import app from "./src/app.js";

import { connectDB } from "./src/db/db.js";

connectDB();

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`\x1b[1m\x1b[36mServer is running on port ${PORT}\x1b[0m`);
});
