import http from "http";
import App from "./service/app.mjs";

const app = new App();

const server = http.createServer(async function (req, res) {
  res.setHeader("Content-Type", "application/json");

  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      req.body = body ? JSON.parse(body) : {};

      switch (req.method) {
        case "POST":
          app.create(req, res);
          return;
        //return app.create(req, res);
        case "PUT":
          return app.update(req, res);
        case "DELETE":
          return app.delete(req, res);
        default:
          break;
      }
    });
  } else if (req.method === "GET") {
    app.get(res);
  } else {
    res.statusCode = 405; // Method Not Allowed
    res.write(JSON.stringify({
      code: 405,
      status: "error",
      data: {
        message: "Unknown request method."
      }
    }));
    res.end();
  }
});

try {
  server.listen(8000);
  console.log("App running on port 8000");
} catch (err) {
  console.error("Error starting server:", err);
}

