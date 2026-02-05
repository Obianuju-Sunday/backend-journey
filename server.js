const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'My backend journey starts now' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});