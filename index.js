const http = require("http");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
