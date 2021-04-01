var express = require("express");
var app = express();
app.use("/style", express.static(__dirname + "/style/"));
app.use("/src", express.static(__dirname + "/src/"));
app.use("/images", express.static(__dirname + "/images"));
app.get("/", function(req, res) {
  res.sendFile("./index.html", { root: __dirname });
});
var port = process.env.PORT || 8888;
app.listen(port, function() {
  console.log("Example app listening on port : " + port);
});
