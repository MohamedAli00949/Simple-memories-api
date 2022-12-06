const app = require('./server');

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}/`)
})