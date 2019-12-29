const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser");

const documentRoute = require("./routes/documents.route");

const app = express();
const rootContext = "/api";
app.use(cors());
app.use(bodyParser.json());
app.use(rootContext + "/document", documentRoute);

const port = process.env.PORT || 3000;

const server = app.listen(port, "0.0.0.0", function() {
  console.log("firestore-node running on port " + port);
});
