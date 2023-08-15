// WebSocket构造函数，创建WebSocket对象
let ws = new WebSocket("ws://62.234.57.129/ws");

// 发送心跳包
function sendHeartbeat() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send("ping");
  }
}
// 每隔一定时间发送心跳包
const heartbeatInterval = setInterval(sendHeartbeat, 5000); // 每5秒发送
// 连接成功后的回调函数
ws.onopen = function (params) {
  console.log("客户端连接成功");
};

// 从服务器接受到信息时的回调函数
ws.onmessage = function (e) {
  let Allsort: HTMLElement;
  Allsort = document.getElementById("allsort")!;
  while (Allsort.hasChildNodes()) {
    //当div下还存在子节点时 循环继续
    Allsort.removeChild(Allsort.firstChild!);
  }
  let data = JSON.parse(e.data);

  for (let i = 0; i < data.length; i++) {
    Allsort.insertAdjacentHTML(
      "beforeend",
      `<li>${data[i].name}:${data[i].score}分</li>`
    );
  }
};

// 连接关闭后的回调函数
ws.onclose = function (e) {
  clearInterval(heartbeatInterval);
  console.log("websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean);

  console.log(e);
  console.log("关闭客户端连接");
};

// 连接失败后的回调函数
ws.onerror = function (evt) {
  console.log("连接失败了");
};

// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，这样服务端会抛异常。
window.onbeforeunload = function () {
  ws.close();
};
export default ws;
