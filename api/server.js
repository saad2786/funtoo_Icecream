//ZmnINNmsy9ng9SEI
const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const operationDB = require("./operationDB");
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cors());

//Login
app.post("/login", async (req, res) => {
  try {
    const result = await operationDB.getUser(req.body);

    res.status(200).json(result.recordset);
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
});

//Products
app.get("/products", async (req, res) => {
  try {
    const result = await operationDB.getItems();
    res.status(200).json(result.recordset);
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
});
app.post("/product", async (req, res) => {
  try {
    const result = await operationDB.addProduct(req.body);

    res.status(200).json(result);
    return result;
  } catch (err) {
    console.log(err);
  }
});
app.put("/product", async (req, res) => {
  try {
    const result = await operationDB.toggleProductStatus(req.body);

    res.status(200).json(result);
    return result;
  } catch (err) {
    console.log(err);
  }
});
app.put("/updateProduct", async (req, res) => {
  try {
    const result = await operationDB.updateProduct(req.body);
    res.status(200).json(result);
    return result;
  } catch (err) {
    console.log(err);
  }
});

//Transactions
app.get("/transactions", async (req, res) => {
  try {
    const result = await operationDB.getTransactions();
    res.status(200).json(result.recordset);

    return result.recordset;
  } catch (err) {
    console.log(err);
  }
});
app.post("/submit", async (req, res) => {
  try {
    const result = await operationDB.createTransaction(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send("Internal server error:" + err);
  }
});

//Paytypes
app.get("/paytypes", async (req, res) => {
  try {
    const result = await operationDB.getPayType();
    res.status(200).json(result?.recordset);
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
});
app.post("/paytype", async (req, res) => {
  try {
    const result = await operationDB.addPayType(req.body);
    res.status(200).json(result);
    return result;
  } catch (err) {
    console.log(err);
  }
});
app.put("/paytype", async (req, res) => {
  try {
    const result = await operationDB.togglePayTypeStatus(req.body);
    res.status(200).json(result);
    return result;
  } catch (err) {
    console.log(err);
  }
});

app.listen(8000, () => {
  console.log("Server is runnong running on port 8000");
});
