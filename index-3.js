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

//------------------------Data클래스: 데이터 저장 및 핸들링을 관할------------------------------
class Data {
    constructor(){
        this.cube = {
            "up": Array(3).fill(0).map(el => Array(3).fill("B")),
            "left": Array(3).fill(0).map(el => Array(3).fill("W")),
            "front": Array(3).fill(0).map(el => Array(3).fill("O")),
            "right": Array(3).fill(0).map(el => Array(3).fill("G")),
            "back": Array(3).fill(0).map(el => Array(3).fill("Y")),
            "down": Array(3).fill(0).map(el => Array(3).fill("R")),
        }
    }

    breakdownInputString (str) {
        const inputArray = this.combineApostrophe(str.split(""));
        const convertedArray = this.convertNumberToLetter(inputArray);
        console.log(convertedArray);
        return convertedArray;
    }

    combineApostrophe(arr){
        let newArray = [];

        arr.forEach((el, idx) => {
            if (el === "'") {
                let mergedEl = `${arr[idx - 1]}`;
                mergedEl += el;
                el = mergedEl;
                newArray.pop();
            }
            newArray.push(el);
        })
        return newArray;
    }

    convertNumberToLetter(arr){
        let newArray = [];
        let prevLetter;
        let num;

        arr.forEach((el, idx) => {
            if (isNaN(el * 1) === false) {
                num = el * 1;
                prevLetter = arr[idx - 1];
                const tempArr = Array(num - 1).fill(prevLetter);
                newArray = [...newArray, ...tempArr];
                return;
            }
            newArray.push(el);
        })
        return newArray;
    }
}

//------------------------Visual클래스: UI렌더링과 DOM핸들링을 관할--------------------------
class Visual {
    constructor(){
        this.box = {
            "U": this._("#U"),
            "L": this._("#L"),
            "F": this._("#F"),
            "R": this._("#R"),
            "B": this._("#B"),
            "D": this._("#D")
        }
    }

    _(selector, base = document) {
        return base.querySelector(selector);
    }

    readInputData() {
        return this._("#step3-input").value;
    }

    showInitialCube(cubeData) {
        const domBoxes = Object.keys(this.box); //["U", "L", "F", "R", "B", "D"]
        const cubeDataKeys = Object.keys(cubeData); //["up", "left", "front", "right", "back", "down"]

        cubeDataKeys.forEach((side, idx) => {
            const template = this.convertToCubeShape(cubeData[side]);
            this.box[domBoxes[idx]].innerHTML = template;
        })
    }

    convertToCubeShape(doubleArray) {
        let template = ``;

        doubleArray.forEach(row => {
            const str = row.join(" ");
            template += `${str}<br>`;
        })

        return template;
    }

}

//-------------Operator클래스: Visual클래스와 Data클래스를 연결해주고 전체적인 동작을 관할----------
class Operator {
    constructor(data, visual) {
        this.data = data;
        this.visual = visual;
    }

    init(){
        this.addEvent();
        this.visual.showInitialCube(this.data.cube);
    }

    addEvent(){
        const enterButton = document.querySelector(".step3-answer-button");
        enterButton.addEventListener("click", this.executeClickEvent.bind(this));
    }

    executeClickEvent(){
        const convertedString = this.data.breakdownInputString(this.visual.readInputData());
    }
}

const data = new Data();
const visual = new Visual();
const rubiksCube = new Operator(data, visual);
rubiksCube.init();
