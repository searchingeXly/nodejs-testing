const { application } = require("express");
const express = require("express");
const app = express();
const { products } = require("./data");
app.get("/", (req, res) => {
  res.send(`<h1>Home Page</h1><a href="/api/products">products</a>`);
});

app.get("/api/products", (req, res) => {
  const trimmedProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(trimmedProducts);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const singleProduct = products.find((product) => product.id === Number(id));
  if (!singleProduct) {
    return res.status(404).send("Product Does Not Exist");
  }
  res.json(singleProduct);
});

app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("hello");
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }
  return res.status(200).json(sortedProducts);
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(8000, () => {
  console.log("server is listening on port 8000");
});
