/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex("users").truncate();
  await knex("users").insert([
    { username: "admin", password: "$2a$10$L1kTxgpf9YfFim2I/dKjlOPERz1jKoE3SV3jqXJ3H7quKFtcQnVua" }, // password is "password"
    { username: "user", password: "$2a$10$L1kTxgpf9YfFim2I/dKjlOPERz1jKoE3SV3jqXJ3H7quKFtcQnVua" }, // password is "password"
  ]);
};
