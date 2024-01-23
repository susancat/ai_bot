import express from 'express';

const app = express();

// middleware to use JSON 
app.use(express.json());
// GET
app.get('/hello', (req, res, next) => {
  return res.send('Hello World!');
});
// PUT
// POST
app.post('/hello', (req, res, next) => {
  console.log(req.body);
})
// DELETE
app.delete('/user/:id', (req, res, next) => {
  console.log(req.params.id);
  return res.send('Hello World!');
});

// connections and listeners
app.listen(3000, () => console.log("Server is running on port 3000"));