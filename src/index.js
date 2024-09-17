import express from "express";
import router from "./api.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`); // eslint-disable-line
});

