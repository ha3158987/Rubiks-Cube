/*
큐브는 W, B, G, Y, O, R의 6가지 색깔을 가지고 있다.
입력: 각 조작법을 한 줄로 입력받는다.
출력: 큐브의 6면을 펼친 상태로 출력한다.
Q를 입력받으면 프로그램을 종료하고, 조작 받은 명령의 갯수를 출력시킨다.

가능한 한 커밋을 자주 하고 구현의 의미가 명확하게 전달되도록 커밋 메시지를 작성할 것
함수나 메소드는 한 번에 한 가지 일을 하고 가능하면 20줄이 넘지 않도록 구현한다.
함수나 메소드의 들여쓰기를 가능하면 적게(3단계까지만) 할 수 있도록 노력해 본다.

*추가구현*
프로그램 종료 시 경과 시간 출력
큐브의 무작위 섞기 기능
모든 면을 맞추면 축하 메시지와 함께 프로그램을 자동 종료
*/

//------------------------------------------------ Data클래스의 역할: 데이터 저장 맟 핸들링 ---------------------------------------------------------
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
            "F": ["020", "021", "022", "102", "112", "122", "300", "310", "320", "500", "501", "502"], //F면 90도 시계방향 회전
            "R": ["002", "012", "022", "202", "212", "222", "400", "410", "420", "502", "512", "522"], //R면 90도 시계방향 회전
            "U": ["100", "101", "102", "200", "201", "202", "300", "301", "302", "400", "401", "402"], //U면 90도 시계방향 회전
            "B": ["000", "001", "002", "100", "110", "120", "302", "312", "322", "520", "521", "522"], //B면 90도 시계방향 회전
            "L": ["000", "010", "020", "200", "210", "220", "402", "412", "422", "500", "510", "520"], //L면 90도 시계방향 회전
            "D": ["120", "121", "122", "220", "221", "222", "320", "321", "322", "420", "421", "422"] //D면 90도 시계방향 회전
        }
    }

    //3차원 배열 만들기
    makeTripleArr() {
        const keys = Object.keys(this.cube); //["U", "L", "F", "R", "B", "D"]
        keys.forEach(key => {
            this.triple_arr.push(this.cube[key]);
        })
        console.log("3차원 배열 오리지날", this.triple_arr);
    }

    //(회전을 위한)임시 배열 만들기
    getChangingEl(idxArr) {
        const tempArray = [];

        idxArr.forEach(idx => {
            const targetEl = this.triple_arr[parseInt(idx[0])][parseInt(idx[1])][parseInt(idx[2])];
            tempArray.push(targetEl);
        })

        console.log("tempArray", tempArray);
        return tempArray;
    }

    //바뀐 요소들을 재할당 해주기
    reassignEl(idxArr, tempArr) {

        tempArr.forEach((el, idx) => {
            this.triple_arr[parseInt(idxArr[idx][0])][parseInt(idxArr[idx][1])][parseInt(idxArr[idx][2])] = el;
        })
        console.log("회전 후 3차원 배열", this.triple_arr);
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

//-------------------------------------------- Rotation클래스의 역할: 큐브의 회전과 엘리먼트의 이동 ---------------------------------------------------------
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

//--------------------------------------------------- Visual클래스의 역할: UI렌더링과 DOM핸들링 --------------------------------------------------------
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

    makeChildDiv(type, trpleArr){
        const container = this._("#step-3-result");
        const childDiv = document.createElement("div");
        let template = ``;

        if (type === "Q") {
            template += `<br>이용해주셔서 감사합니다! 😊  <br>뚜뚜뚜...<br>`;
        } else {
            template += `<div class="starting-message">< ${type} ></div>
            <div id="U" class="box">${this.makeSquareShapeTemplate(trpleArr[0])}</div>
            <div class="vertical-center">
                <div id="L" class="box">${this.makeSquareShapeTemplate(trpleArr[1])}</div>
                <div id="F" class="box">${this.makeSquareShapeTemplate(trpleArr[2])}</div>
                <div id="R" class="box">${this.makeSquareShapeTemplate(trpleArr[3])}</div>
                <div id="B" class="box">${this.makeSquareShapeTemplate(trpleArr[4])}</div>
            </div>
            <div id="D" class="box">${this.makeSquareShapeTemplate(trpleArr[5])}</div>`;
        }

        childDiv.innerHTML = template;
        container.appendChild(childDiv);
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

//------------------------------------------- Operator클래스의 역할: 각 클래스들을 연결하고 전체적인 프로세스를 컨트롤 --------------------------------------------
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
                this.visual.makeChildDiv(type);
                return;
            }

            //'가 붙은 것들을 먼저 걸러야함.
            else if (type[1] === "'") {
                console.log("arrIdx", arrIdx);
                this.rotateCounterClockwise(arrIdx, type);
                //type[0]으로 실행한 후, pushElementToLeft 와 turnSideCounterClockwise 실행.
            } else {
                console.log("arrIdx", arrIdx);
                this.rotateClockwise(arrIdx, type);

            }
        })
    }

    rotateClockwise(arrIdx, type){
        const tempArr = this.data.getChangingEl(arrIdx);  //["B", "B", "B", "W", "W", "W", "G", "G", "G", "R", "R", "R"]
        const triArrIdx = this.getIndexOfType(type);

        for (let i = 1; i <= 3; i++){  //엘리먼트가 3개씩 묶어주지 않는 대신 3번을 밀어줘야 함.
            this.rotate.pushElementToRight(tempArr);
        }
        console.log("tempArr after push", tempArr);
        this.data.reassignEl(arrIdx, tempArr); //다시 가져온 인덱스에 바뀐 엘리먼트 재할당 해주기
        this.rotate.turnSideClockwise(this.data.triple_arr[triArrIdx]); //중심이 되는 면 시계방향으로 돌려주기
        this.visual.makeChildDiv(type, this.data.triple_arr); //바뀐 전개도 모양이랑 type 을 DOM에 추가하기
    }

    rotateCounterClockwise(arrIdx, type){

    }

    getIndexOfType(type){
        const nameArr = Object.keys(this.data.cube); //["U", "L", "F", "R", "B", "D"];
        const index = nameArr.indexOf(type);
        return index;
    }
}

const data = new Data();
const rotate = new Rotation();
const visual = new Visual();
const rubiksCube = new Operator(data, rotate, visual);
rubiksCube.init();
