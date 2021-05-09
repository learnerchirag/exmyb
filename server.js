const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");
const { response } = require("express");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/products", (req, res) => {
  console.log(req.body);
  const addQuery = `insert into products.products (category_id, brand_id, name, price) values (${req.body.category}, ${req.body.brand}, '${req.body.name}', ${req.body.price})`;
  connection.query(addQuery, (err, response) => {
    if (err) console.log(err);
    else res.send(response);
  });
  // res.send("list");
});
app.put("/products/:productId", (req, res) => {
  console.log(req.body);
  const addQuery = `update products.products set category_id = ${req.body.category}, brand_id = ${req.body.brand}, name = '${req.body.name}', price = ${req.body.price} where product_id = ${req.params.productId}`;
  connection.query(addQuery, (err, response) => {
    if (err) console.log(err);
    else res.send(response);
  });
  // res.send("list");
});
app.post("/details", (req, res) => {
  console.log(req.body);
  const addQuery = `insert into products.details (product_id, features) values (${
    req.body.product
  }, '${JSON.stringify(req.body.details)}')`;
  connection.query(addQuery, (err, response) => {
    if (err) console.log(err);
    else res.send(response);
  });
  // res.send("list");
});
app.put("/details/:productId", (req, res) => {
  console.log(req.body);
  const addQuery = `update products.details set product_Id = ${
    req.body.product
  }, features = '${JSON.stringify(req.body.details)}' where product_id = ${
    req.params.productId
  }`;
  connection.query(addQuery, (err, response) => {
    if (err) console.log(err);
    else res.send(response);
  });
  // res.send("list");
});

app.get("/products", (req, res) => {
  var addQuery;
  if (req.query.categoryId) {
    addQuery = `select * from products where category_id = ${req.query.categoryId}`;
  } else if (req.query.search) {
    addQuery = `select * from products where name like '%${req.query.search}%'`;
  } else {
    addQuery = `select * from products`;
  }
  connection.query(addQuery, (err, response) => {
    if (err) console.log(err);
    else res.send(response);
  });
  // res.send("list");
});
app.get("/categories", (req, res) => {
  const addQuery = `select * from category`;
  connection.query(addQuery, (err, response) => {
    if (err) console.log(err);
    else res.send(response);
  });
  // res.send("list");
});
app.get("/brands/:categoryId", (req, res) => {
  const addQuery = `SELECT * FROM products.brands where category_id = ${parseInt(
    req.params.categoryId
  )}`;
  connection.query(addQuery, (err, response) => {
    if (err) console.log(err, req.params, typeof req.params.categoryId);
    else res.send(response);
  });
  // res.send("list");
});
app.get("/features/:categoryId", (req, res) => {
  const addQuery = `SELECT * FROM products.features where category_id = ${parseInt(
    req.params.categoryId
  )}`;
  connection.query(addQuery, (err, response) => {
    if (err) console.log(err, req.params, typeof req.params.categoryId);
    else res.send(response);
  });
  // res.send("list");
});
app.get("/details/:productId", (req, res) => {
  const addQuery = `SELECT * FROM products.details where product_id = ${parseInt(
    req.params.productId
  )}`;
  connection.query(addQuery, (err, response) => {
    if (err) console.log(err, req.params, typeof req.params.productId);
    else res.send(response);
  });
  // res.send("list");
});
app.get("/names/:categoryId/:brandId", (req, res) => {
  const addQuery = `select c.name as 'cName', b.name as 'bName' from category c, brands b where c.category_id = ${req.params.categoryId} and b.brand_id = ${req.params.brandId};`;
  connection.query(addQuery, (err, response) => {
    if (err) console.log(err, req.params, typeof req.params.productId);
    else res.send(response);
  });
  // res.send("list");
});
app.delete("/delete/:productId", (req, res) => {
  const addQuery = `delete from details where product_id = ${req.params.productId}; delete from products where product_id = ${req.params.productId}`;

  connection.query(addQuery, [1, 2], (err, response) => {
    if (err) console.log(err, req.params, typeof req.params.productId);
    else res.send(response);
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("server running at" + PORT);
});
