const http = require("node:http");
const fs = require("node:fs");

const hostname = "127.0.0.1";
const port = 4000;

//1. Write a API endpoint which will create a text file in a particular folder
const server = http.createServer((req, res) => {
  const date = new Date();
  const filename = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    //padStart() method pads a string from the start
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}-${date
    .getHours()
    .toString()
    .padStart(2, "0")}-${date.getMinutes().toString().padStart(2, "0")}-${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}.txt`;
  try {
    fs.appendFileSync(`./dateTime/${filename}`, `${date}`);
    res.statusCode = 200;
    res.setHeader("content-type", "text/plain");
    res.end(
      `${filename} Date and Time created inside dateTime folder successfull`
    );

    //2. Write a API endpoint to retrieve all the text files in that particular folder
    const files = fs.readdirSync("./dateTime");
    console.log(files);
  } catch (err) {
    console.log(err);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/ `);
});
