const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Set up database connection
mongoose.connect('mongodb://localhost:27017/my-ecommerce-db', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schemas and models for database collections
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String
});
const Product = mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  totalPrice: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerAddress: { type: String, required: true },
  orderDate: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// Set up middleware to handle incoming requests
app.use(bodyParser.json());

// Define routes for handling products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

app.put('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

app.delete('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json(product);
});

// Define routes for handling orders
app.get('/orders', async (req, res) => {
  const orders = await Order.find().populate('products');
  res.json(orders);
});

app.post('/orders', async (req, res) => {
  const { products, customerName, customerEmail, customerAddress } = req.body;
  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  const order = new Order({ products, totalPrice, customerName, customerEmail, customerAddress });
  await order.save();
  res.json(order);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Set up database connection
mongoose.connect('mongodb://localhost:27017/my-ecommerce-db', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schemas and models for database collections
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String
});
const Product = mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  totalPrice: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerAddress: { type: String, required: true },
  orderDate: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// Set up middleware to handle incoming requests
app.use(bodyParser.json());

// Define routes for handling products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

app.put('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

app.delete('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json(product);
});

// Define routes for handling orders
app.get('/orders', async (req, res) => {
  const orders = await Order.find().populate('products');
  res.json(orders);
});

app.post('/orders', async (req, res) => {
  const { products, customerName, customerEmail, customerAddress } = req.body;
  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  const order = new Order({ products, totalPrice, customerName, customerEmail, customerAddress });
  await order.save();
  res.json(order);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
