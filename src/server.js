const app = require("./app.js");
var PORT = process.env.PORT || 3000;
const port = 5555;
app.listen(port, () => {
  console.log(`Our app is running on http://localhost:${port}`);
});
