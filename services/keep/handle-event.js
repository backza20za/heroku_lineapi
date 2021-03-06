// const config = require("../config/line");
const service = require("./handle-message");
// event handler
exports.handleEvent = (event) => {
  //   //   console.log(event);
  //   if (event.type !== "message" || event.message.type !== "text") {
  //     // ignore non-text-message event
  //     return Promise.resolve(null);
  //   }

  //   // create a echoing text message
  //   const echo = { type: "text", text: event.message.text };

  //   // use reply API
  //   return config.client.replyMessage(event.replyToken, echo);
  switch (event.type) {
    case "message":
      switch (event.message.type) {
        case "text":
          service.handleMessage(event);
          break;
        case "sticker":
          console.log("sticker");
          break;
        default:
          throw new Error(
            "Unknown event " + JSON.stringify(event.message.type)
          );
      }
      break;
    case "postback":
      console.log("postback");
      break;
    default:
      throw new Error("Unknown event " + JSON.stringify(event));
  }
};
