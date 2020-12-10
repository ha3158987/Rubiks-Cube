/*
큐브는 W, B, G, Y, O, R의 6가지 색깔을 가지고 있다.
입력: 각 조작법을 한 줄로 입력받는다.
출력: 큐브의 6면을 펼친 상태로 출력한다.
Q를 입력받으면 프로그램을 종료하고, 조작 받은 명령의 갯수를 출력시킨다.

가능한 한 커밋을 자주 하고 구현의 의미가 명확하게 전달되도록 커밋 메시지를 작성할 것
함수나 메소드는 한 번에 한 가지 일을 하고 가능하면 20줄이 넘지 않도록 구현한다.
함수나 메소드의 들여쓰기를 가능하면 적게(3단계까지만) 할 수 있도록 노력해 본다.

프로그램 종료 시 경과 시간 출력
큐브의 무작위 섞기 기능
모든 면을 맞추면 축하 메시지와 함께 프로그램을 자동 종료
*/

class Data {
    constructor(){
        this.cube = {
            "front": Array(3).fill(0).map(el => Array(3).fill("O")),
            "back": Array(3).fill(0).map(el => Array(3).fill("Y")),
            "left": Array(3).fill(0).map(el => Array(3).fill("W")),
            "right": Array(3).fill(0).map(el => Array(3).fill("G")),
            "up": Array(3).fill(0).map(el => Array(3).fill("B")),
            "down": Array(3).fill(0).map(el => Array(3).fill("R")),
        }
    }
}

class Visual {

}

class Operator {
    constructor(data, visual) {
        this.data = data;
        this.visual = visual;
    }

    init(){}
}

const data = new Data();
const visual = new Visual();
const rubiksCube = new Operator(data, visual);
rubiksCube.init();

console.dir(data.cube["back"]);