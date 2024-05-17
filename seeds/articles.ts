import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  //   await knex("articles").del();

  // Inserts seed entries
  await knex("articles").insert([
    {
      id: 1,
      title: "AAAAAAAAAAAAAAAAAAAAAAA",
      body: "zxczxczxczxc",
      approved: true,
    },
    {
      id: 2,
      title: "BBBBBBBBBBBBBBBBBBBBBBB",
      body: "qweqweqweqwe",
      approved: false,
    },
    {
      id: 3,
      title: "CCCCCCCCCCCCCCCCCCCCCC",
      body: "asasasasaasasasa",
      approved: false,
    },
  ]);
}
