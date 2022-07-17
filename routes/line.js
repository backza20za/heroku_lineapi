const express = require("express");
const router = express.Router();
const config = require("../config/line");

/* GET users listing. */
router.post(
  "/callback",
  config.line.middleware(config.lineConfig),
  function (req, res, next) {
    // res.send("line callback4");
    Promise.all(req.body.events.map(handleEvent))
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });
  }
);
// event handler
function handleEvent(event) {
  console.log(event);
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: "text", text: event.message.text };

  // use reply API
  return config.client.replyMessage(event.replyToken, echo);
}

module.exports = router;
