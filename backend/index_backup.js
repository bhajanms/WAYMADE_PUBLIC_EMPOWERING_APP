var express = require("express");

var app = express();

const pgp = require("pg-promise")(/* options */);
const db = pgp("postgres://postgres:1@localhost:5432/empower");
app.use(express.json());
app.post("/register", async function (request, result) {
  // Manage Request
  const userDetail = request.body;
  console.log(userDetail);
  await db.one(
    'INSERT INTO public.user(firstName, lastName, email, phone, password) VALUES (${fname}, ${lname}, ${email}, ${phone}, ${password});',
    userDetail
  );

  result.status(200).send({
    message:
      "Hi" +
      request.body.fullName +
      " . You have successfully registered to EMPOWER",
  });
});

app.listen(3000);
