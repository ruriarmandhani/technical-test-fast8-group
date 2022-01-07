import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const restCountries = await axios.get(
      "https://gist.githubusercontent.com/herysepty/ba286b815417363bfbcc472a5197edd0/raw/aed8ce8f5154208f9fe7f7b04195e05de5f81fda/coutries.json"
    );
    const countries = restCountries.data.map((e) => ({
      name: e.name,
      region: e.region,
      timezones: e.timezones,
    }));

    res.status(200).send({
      status: 200,
      code: "200",
      data: countries,
      message: "Success",
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      code: "400",
      data: null,
      message: "Something Went Wrong",
    });
  }
});

export default router;
