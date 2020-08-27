const app = require("./app.js");
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Our app is running on http://localhost:${port}`);
});
