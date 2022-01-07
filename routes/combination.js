import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { n, r } = req.body;

  if (!n || !r)
    return res.status(400).send({
      status: 400,
      code: "400",
      data: null,
      message: "n or r is required",
    });

  const factorialize = (value) => {
    for (let i = value - 1; i >= 1; i--) {
      value = value * i;
    }
    return value;
  };

  const combination = factorialize(n) / (factorialize(r) * factorialize(n - r));
  res.status(200).send({
    status: 200,
    code: "200",
    data: {
      result: combination,
    },
    message: "Success",
  });
});

export default router;
