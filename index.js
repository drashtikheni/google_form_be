require("dotenv").config();

const express = require("express");

const { connectDB } = require("./mongoose");
const formRoutes = require("./routes/form.routes");
const responseRoutes = require("./routes/response.routes");
const { HTTP_STATUSES } = require("./constant");
const { ERROR_MESSAGES } = require("./messages");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/forms", formRoutes);
app.use("/response", responseRoutes);

app.use("*", (req, res) => {
  return res
    .status(HTTP_STATUSES.NOT_FOUND)
    .json({ err: ERROR_MESSAGES.pathNotFound });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
