import ScorePanel from "./ScorePanel";

class Food {
    //定义一个属性表示食物所对应的元素
    element: HTMLElement;
    constructor() {
        //获取页面中i的food元素，并将其赋值给element
        this.element = document.getElementById('food')!;
    }
    //定义一个获取食物x坐标的方法
    get X() {
        return this.element.offsetLeft
    }
    get Y() {
        return this.element.offsetTop
    }
    //修改食物位置
    change() {
        let top = Math.round(Math.random() * 29) * 10
        let left = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}
export default Food;