const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const newLine = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(newLine);

  response.status(200).json(newLine);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const amountLikes = repositories.find((reposit) => reposit.id === id);

  const repositoriesIndex = repositories.findIndex(
    (reposit) => reposit.id === id
  );

  if (repositoriesIndex < 0) {
    return response.status(400).json({ error: "Not found" });
  }

  const newRepo = {
    id,
    title,
    url,
    techs,
    likes: amountLikes.likes,
  };

  repositories[repositoriesIndex] = newRepo;

  return response.json(newRepo);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(
    (reposit) => reposit.id === id
  );

  if (repositoriesIndex < 0) {
    return response.status(400).json({ error: "Not found" });
  }

  repositories.splice(repositoriesIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(
    (reposit) => reposit.id === id
  );

  if (repositoriesIndex < 0) {
    return response.status(400).json({ error: "Not found" });
  }

  repositories[repositoriesIndex].likes += 1;

  return response.status(200).json(repositories[repositoriesIndex]);
});

module.exports = app;
