//引入其他的类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
import ws from "../request/index";
class GameControl {
  //定义三个属性
  snake: Snake;
  food: Food;
  ScorePanel: ScorePanel;
  Up: HTMLElement;
  Down: HTMLElement;
  Left: HTMLElement;
  Right: HTMLElement;
  History: HTMLElement;
  //移动方向
  direction: string = "Right";
  //创建一个属性用来记录游戏是否结束
  isLive = true;
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.ScorePanel = new ScorePanel();
    this.Down = document.getElementById("bottom")!;
    this.Up = document.getElementById("top")!;
    this.Left = document.getElementById("left")!;
    this.Right = document.getElementById("right")!;
    this.History = document.getElementById("sort")!;
    this.init();
  }
  init() {
    //绑定键盘按下事件
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    this.Down.addEventListener("click", this.clickHandler.bind(this, "down"));
    this.Up.addEventListener("click", this.clickHandler.bind(this, "up"));
    this.Left.addEventListener("click", this.clickHandler.bind(this, "left"));
    this.Right.addEventListener("click", this.clickHandler.bind(this, "right"));
    let arr = JSON.parse(localStorage.getItem("history") || "[]");
    arr.sort((a: number, b: number) => b - a);
    for (let i = 0; i < arr.length; i++) {
      if (i == 5) break;
      else {
        this.History.insertAdjacentHTML("beforeend", `<li>${arr[i]}分</li>`);
      }
    }
    this.run();
  }
  keydownHandler(event: KeyboardEvent) {
    this.direction = event.key;
  }
  clickHandler(type: String): void {
    switch (type) {
      case "up":
        this.direction = "ArrowUp";
        break;
      case "down":
        this.direction = "ArrowDown";
        break;
      case "left":
        this.direction = "ArrowLeft";
        break;
      case "right":
        this.direction = "ArrowRight";
        break;
    }
  }
  //创建蛇移动的方法
  run() {
    let x = this.snake.X;
    let y = this.snake.Y;
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        x -= 10;
        break;
      case "ArrowRight":
      case "Right":
        x += 10;
        break;
    }
    this.checkEat(x, y);
    try {
      this.snake.X = x;
      this.snake.Y = y;
    } catch (e) {
      alert((e as any).message + "Game Over!刷新后可重新开始");
      let name = prompt("是否上传记录，上传则输入您的名字", "user");
      let arr = JSON.parse(localStorage.getItem("history") || "[]");
      let sendObj = { name: name, score: this.ScorePanel.score };
      ws.send(JSON.stringify(sendObj));
      arr.push(this.ScorePanel.score);
      arr.sort((a: number, b: number) => b - a);
      arr.splice(5, arr.length - 5);
      localStorage.setItem("history", JSON.stringify(arr));
      this.isLive = false;
    }

    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.ScorePanel.level - 1) * 30);
  }
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.change();
      this.ScorePanel.addScore();
      this.snake.addBody();
    }
  }
}
export default GameControl;
