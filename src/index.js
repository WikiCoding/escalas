const express = require('express');
require('./db/mongoose');
const Model = require('./model/model');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, '../public');
app.use(express.json());
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(`${publicPath}/index.html`)
})

app.get('/mapa', async (req, res) => {
  try {
    const data = await Model.find({});

    res.status(200).send(data)
  } catch (e) {
    res.status(404).send();
  }
})

app.post('/mapa', async (req, res) => {
  try {
    await Model.deleteMany({});
    const newData = new Model({
      data: req.body.data,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    })

    await newData.save();

    res.status(201).send({ message: 'Gravado' })
  } catch (e) {
    res.status(404).send();
  }
})

app.delete('/mapa', async (req, res) => {
  try {
    await Model.deleteMany({});

    res.status(200).send({ message: 'Apagado' })
  } catch (e) {
    res.status(404).send();
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
})