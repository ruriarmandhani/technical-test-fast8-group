import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { n } = req.body;
  if (!n)
    return res.status(400).send({
      status: 400,
      code: "400",
      data: null,
      message: "n is required",
    });

  let result = [];

  for (let i = 0; i < n; i++) {
    if (i > 1) {
      const value = result[i - 1] + result[i - 2];
      result.push(value);
    } else {
      result.push(i);
    }
  }

  res.status(200).send({
    status: 200,
    code: "200",
    data: result.toString().replace(/,/g, " "),
    message: "Success",
  });
});

export default router;
