const { log } = require("console");
let ws = require("nodejs-websocket");
const Port = 3000;
let arr = [];
let server = ws.createServer((conn) => {
  conn.send(JSON.stringify(arr));
  conn.on("text", (data) => {
    if (data !== "ping") {
      arr.push(JSON.parse(data));
      arr.sort((a, b) => b.score - a.score);
      arr.splice(5, arr.length - 5);
      conn.send(JSON.stringify(arr));
    }
  });
  console.log("success!");
});
server.listen(Port, () => {
  console.log("服务器启动成功，监听端口" + Port);
});
