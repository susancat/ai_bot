import app from './app';
import { connectToDB } from './db/connection';
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

const PORT = process.env.PORT || 3000;
// connect to DB
connectToDB()
  .then(() => {
    // connections and listeners
    app.listen(PORT, () => console.log("Server launched and connected to MongoDB"));
  })
  .catch(err => console.log(err));
