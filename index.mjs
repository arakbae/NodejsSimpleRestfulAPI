import http from "http";
import App from "./service/app.mjs";

const app = new App();
const server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "application/json");
  switch (req.method) {
    case "GET":
      return app.get(res);

    case "POST":
      return app.create(req, res);

    case "PUT":
      return app.update(req, res);

    case "DELETE":
      return app.delete(req, res);

    default:
      res.write(JSON.stringify({
        code: 200,
        status: "error",
        data: {
          message: "unknow request method."
        }
      }));
      res.end();
      return;
  }
});

try {
  server.listen(8000);
  console.log("app running in port 8000");
} catch (err) {
  console.log(err);
}
