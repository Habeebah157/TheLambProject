require("dotenv").config;
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const SECRET_KEY = process.env.SECRET_KEY || "secret_dev";
function getDatabaseUri() {
  const dbUser = process.env.DATABASE_USER || "postgres";
  const dbpass = process.env.DATABASE_PASS
    ? encodeURI(process.env.DATABASE_PASS)
    : "postgres";
  const dbhost = process.env.DATABASE_HOST || "localhost";
  const dbName = process.env.DATABASE_NAME || "lamb_project";
  const dbport = process.env.DATABASE_PORT || 5432;

  return (
    process.env.DATABASE_URL ||
    `postgresql://${dbUser}:${dbpass}@${dbhost}:${dbport}/${dbName}`
  );
}

const BRCYPT_WORK_FACTOR = 13;
console.log("Secret kY".blue, SECRET_KEY);
console.log("Wedding Registration");
console.log("PORT".blue, PORT);
console.log("Database URI:".blue, getDatabaseUri());
console.log("---");

module.exports = {
  PORT,
  SECRET_KEY,
  BRCYPT_WORK_FACTOR,
  getDatabaseUri,
};
