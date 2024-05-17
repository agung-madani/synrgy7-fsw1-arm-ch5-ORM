import { Model, ModelObject } from "objection";

export class ArticlesModel extends Model {
  id!: number;
  title!: string;
  body!: string;
  approved!: boolean;

  static get tableName() {
    return "articles";
  }
}

export type Articles = ModelObject<ArticlesModel>;
