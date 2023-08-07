//引入其他的类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
class GameControl {
    //定义三个属性
    snake: Snake;
    food: Food;
    ScorePanel: ScorePanel;
    //移动方向
    direction: string = "Right";
    //创建一个属性用来记录游戏是否结束
    isLive = true;
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.ScorePanel = new ScorePanel();
        this.init();
    }
    init() {
        //绑定键盘按下事件
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.run()
    }
    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key;
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
            this.isLive = false;
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.ScorePanel.level - 1) * 30)
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