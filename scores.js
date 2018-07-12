const http = require('http');
const textBody = require("body");
const jsonBody = require("body/json");
const hostname = '127.0.0.1';
const port = 3000;
let scores = [{
  name: "Edwin",
  score: 50
}, {
  name: "David",
  score: 39
}];

const resources = {
  "/scores": JSON.stringify(scores),
};



const server = http.createServer((req, res) => {
  console.log(req.url)
  if (req.method === "GET") {
    if (resources[req.url] === undefined) {
      res.statusCode = 404;
      res.end("ERROR NOT FOUND");
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      const responseBody = JSON.stringify(scores);
      res.end(responseBody);
    }
  } else if (req.method === "PUT") {
    res.statusCode = 201;
    textBody(req, res, (err, requestBody) => {
      //resources[req.url] = requestBody;
      const responseBody = resources[req.url];
      res.end(responseBody);
    })
  } else if (req.method === "POST") {
    res.statusCode = 201;
    jsonBody(req, res, (err, requestBody) => {
      scores.push(requestBody)
      scores.sort((a, b) => {
        return b.score - a.score
      })
      scores = scores.slice(0, 3)
      resources[req.url] = JSON.stringify(scores)
      const responseBody = resources[req.url]
      res.end(responseBody)
    })
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});