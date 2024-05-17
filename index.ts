import express, { Express, Request, Response } from "express";
import knex from "knex";
import { Model } from "objection";
import { ArticlesModel } from "./model/article.model";

const app: Express = express();
const port = 3000;

const knexInstance = knex({
  client: "pg",
  connection: {
    user: "postgres",
    password: "armada009",
    port: 5432,
    host: "localhost",
    database: "ORM_CH5",
  },
});

Model.knex(knexInstance);
app.use(express.json()); // This should be above all route definitions

app.get("/", (_, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Create an article
app.post("/articles", async (req: Request, res: Response) => {
  const { id, title, body, approved } = req.body;
  try {
    const newArticle = await ArticlesModel.query().insert({
      id,
      title,
      body,
      approved,
    });
    res.status(201).json(newArticle);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
});

// Read all articles
app.get("/articles", async (_, res: Response) => {
  try {
    const articles = await ArticlesModel.query();
    res.json({ data: articles });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
});

// Read an article by id
app.get("/articles/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const article = await ArticlesModel.query().findById(id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
});

// Update an article by id
app.put("/articles/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, body, approved } = req.body;
  try {
    const updatedArticle = await ArticlesModel.query().patchAndFetchById(id, {
      title,
      body,
      approved,
    });
    if (updatedArticle) {
      res.json(updatedArticle);
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
});

// Delete an article by id
app.delete("/articles/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await ArticlesModel.query().deleteById(id);
    if (rowsDeleted) {
      res.json({ message: "Article deleted" });
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// import express, { Express, Response, Request } from "express";
// import knex from "knex";
// import { ArticlesModel, Articles } from "./models/article";
// import { Model, NotFounderr } from "objection";

// const PORT = 3000;

// const app: Express = express();
// const knexInstance = knex({
//   client: "postgresql",
//   connection: {
//     database: "my_db",
//     user: "username",
//     password: "password",
//   },
// });

// interface IParams {
//   id: string;
// }

// Model.knex(knexInstance);

// app.use(express.json());

// app.listen(PORT, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
// });

// app.get("/articles", async (_, res: Response) => {
//   const articles = await ArticlesModel.query();
//   return res.json(articles);
// });

// app.get("/articles/:id", async (req: Request<IParams>, res: Response) => {
//   const id = +req.params.id;
//   const article = await ArticlesModel.query().findById(id).throwIfNotFound();
//   return res.json(article);
// });

// app.post("/articles", async (req: Request<{}, {}, Articles>, res: Response) => {
//   const body = req.body;
//   const article = await ArticlesModel.query().insert(body).returning("*");
//   return res.json(article);
// });

// app.patch(
//   "/articles/:id",
//   async (req: Request<IParams, {}, Partial<Articles>>, res: Response) => {
//     const body = req.body;
//     const id = +req.params.id;
//     const articles = await ArticlesModel.query()
//       .where({ id })
//       .patch(body)
//       .throwIfNotFound()
//       .returning("*");
//     return res.json(articles);
//   }
// );

// app.delete("/articles/:id", async (req: Request<IParams>, res: Response) => {
//   const id = +req.params.id;
//   await ArticlesModel.query()
//     .where({ id })
//     .del()
//     .throwIfNotFound()
//     .returning("*");
//   return res.json({ message: "Success delete articles" });
// });
