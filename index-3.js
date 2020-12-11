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

//---------------------- Data클래스의 역할: 데이터 저장 맟 핸들링 --------------------------
class Data {
    constructor(){

        this.triple_arr = [];

        this.cube = {
            "U": Array(3).fill(0).map(el => Array(3).fill("B")),
            "L": Array(3).fill(0).map(el => Array(3).fill("W")),
            "F": Array(3).fill(0).map(el => Array(3).fill("O")),
            "R": Array(3).fill(0).map(el => Array(3).fill("G")),
            "B": Array(3).fill(0).map(el => Array(3).fill("Y")),
            "D": Array(3).fill(0).map(el => Array(3).fill("R")),
        }

        this.orderType = {
            "F": ["[0][2][0]", "[0][2][1]", "[0][2][2]", "[1][0][2]", "[1][1][2]", "[1][2][2]", "[3][0][0]", "[3][1][0]", "[3][2][0]", "[5][0][0]", "[5][0][1]", "[5][0][2]"], //F면 90도 시계방향 회전
            "R":["[0][0][2]", "[0][1][2]", "[0][2][2]", "[2][0][2]", "[2][1][2]", "[2][2][2]", "[4][0][0]", "[4][1][0]", "[4][2][0]", "[5][0][2]", "[5][1][2]", "[5][2][2]"], //R면 90도 시계방향 회전
            "U": ["[1][0][0]", "[1][0][1]", "[1][0][2]", "[2][0][0]", "[2][0][1]", "[2][0][2]", "[3][0][0]", "[3][0][1]", "[3][0][2]", "[4][0][0]", "[4][0][1]", "[4][0][2]"], //U면 90도 시계방향 회전
            "B": ["[0][0][0]", "[0][0][1]", "[0][0][2]", "[1][0][0]", "[1][1][0]", "[1][2][0]", "[3][0][2]", "[3][1][2]", "[3][2][2]", "[5][2][0]", "[5][2][1]", "[5][2][2]"], //B면 90도 시계방향 회전
            "L": ["[0][0][0]", "[0][1][0]", "[0][2][0]", "[2][0][0]", "[2][1][0]", "[2][2][0]", "[4][0][2]", "[4][1][2]", "[4][2][2]", "[5][0][0]", "[5][1][0]", "[5][2][0]"], //L면 90도 시계방향 회전
            "D": ["[1][2][0]", "[1][2][1]", "[1][2][2]", "[2][2][0]", "[2][2][1]", "[2][2][2]", "[3][2][0]", "[3][2][1]", "[3][2][2]", "[4][2][0]", "[4][2][1]", "[4][2][2]"] //D면 90도 시계방향 회전
        }
    }

    //3차원 배열 만들기
    makeTripleArr() {
        const keys = Object.keys(this.cube); //["U", "L", "F", "R", "B", "D"]
        keys.forEach(key => {
            this.triple_arr.push(this.cube[key]);
        })
        console.log(this.triple_arr);
    }

    breakdownInputString(str) {
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
                el = (mergedEl += el);
                newArray.pop();
            }
            newArray.push(el);
        })
        return newArray;
    }

    convertNumberToLetter(arr){
        let newArray = [];

        arr.forEach((el, idx) => {
            if (isNaN(el * 1) === false) {
                let num = el * 1;
                let prevLetter = arr[idx - 1];
                const tempArr = Array(num - 1).fill(prevLetter);
                newArray = [...newArray, ...tempArr];
                return;
            }
            newArray.push(el);
        })
        return newArray;
    }
}

//------------------ Rotation클래스의 역할: 큐브의 회전과 엘리먼트의 이동 ----------------------
class Rotation {

    //임시배열들을 오른쪽으로 밀기
    pushElementToRight(arr){
        const poppedElement = arr.pop();
        arr.unshift(poppedElement);
        return arr;
    }

    pushElementToLeft(arr){
        const shiftedElement = arr.shift();
        arr.push(shiftedElement);
        return arr;
    }

    //시계방향으로 90도 회전
    turnSideClockwise(side){
        for (let i = 0; i < side.length; i++) {
            for (let j = 0; j < i; j++) {
                [side[i][j], side[j][i]] = [side[j][i], side[i][j]];
            }
        }
        side.forEach((row) => row.reverse());
        return side;
    }

    //시계반대방향으로 90도 회전
    turnSideCounterClockwise(side){
        side.forEach((row) => row.reverse());
        for (let i = 0; i < side.length; i++) {
            for (let j = 0; j < i; j++) {
                [side[i][j], side[j][i]] = [side[j][i], side[i][j]];
            }
        }
        return side;
    }
}

//--------------------- Visual클래스의 역할: UI렌더링과 DOM핸들링 ---------------------------
class Visual {
    constructor(){
        this.DOMbox = {
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

    renderCube(cubeData) {
        const domBoxes = Object.keys(this.DOMbox); //["U", "L", "F", "R", "B", "D"]

        domBoxes.forEach((side) => {
            const template = this.makeSquareShapeTemplate(cubeData[side]);
            this.DOMbox[side].innerHTML = template;
        })
    }

    makeSquareShapeTemplate(doubleArray) {
        let template = ``;

        doubleArray.forEach(row => {
            const str = row.join(" ");
            template += `${str}<br>`;
        })

        return template;
    }

}

//------------ Operator클래스의 역할: 각 클래스들을 연결하고 전체적인 프로세스를 컨트롤 --------------
class Operator {
    constructor(data, rotate, visual) {
        this.data = data;
        this.rotate = rotate;
        this.visual = visual;
    }

    init(){
        this.addEvent();
        this.visual.renderCube(this.data.cube);
        this.data.makeTripleArr();
    }

    addEvent(){
        const enterButton = document.querySelector(".step3-answer-button");
        enterButton.addEventListener("click", this.executeClickEvent.bind(this));
    }

    executeClickEvent(){
        const convertedString = this.data.breakdownInputString(this.visual.readInputData()); //["F", "R", "R'", "U", "U", "R"]
        convertedString.forEach(type => {
            const arrIdx = this.data.orderType[type[0]];
            //"Q"일 경우 바로 종료 메세지 출력
            if (type === "Q") {
                //종료메세지 UI에 띄우기
                return;
            }

            //'가 붙은 것들을 먼저 걸러야함.
            else if (type[1] === "'") {
                console.log("arrIdx", arrIdx);
                //type[0]으로 실행한 후, pushElementToLeft 와 turnSideCounterClockwise 실행.
            } else {
                console.log("arrIdx", arrIdx);//["[0][2][0]", "[0][2][1]", "[0][2][2]", "[1][0][2]", "[1][1][2]", "[1][2][2]", "[3][0][0]", "[3][1][0]", "[3][2][0]", "[5][0][0]", "[5][0][1]", "[5][0][2]"]

            }
        })
    }
}

const data = new Data();
const rotate = new Rotation();
const visual = new Visual();
const rubiksCube = new Operator(data, rotate, visual);
rubiksCube.init();
