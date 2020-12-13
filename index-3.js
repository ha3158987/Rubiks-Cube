/* 3단계: 루빅스 큐브 구현하기

*추가구현*
[O] 프로그램 종료 시 경과 시간 출력
[O] 큐브의 무작위 섞기 기능
모든 면을 맞추면 축하 메시지와 함께 프로그램을 자동 종료
*/

//------------------------------------------------ Data클래스의 역할: 데이터 저장 맟 핸들링 ---------------------------------------------------------
class Data {
    constructor(){

        this.origin_arr;
        this.triple_arr = [];
        this.keys = [];
        this.randomKeys = ["U", "L", "F", "R", "B", "D", "U'", "L'", "F'", "R'", "B'", "D'"];
        this.playingTime = 0;
        this.cube = {
            "U": Array(3).fill(0).map(el => Array(3).fill("B")),
            "L": Array(3).fill(0).map(el => Array(3).fill("W")),
            "F": Array(3).fill(0).map(el => Array(3).fill("O")),
            "R": Array(3).fill(0).map(el => Array(3).fill("G")),
            "B": Array(3).fill(0).map(el => Array(3).fill("Y")),
            "D": Array(3).fill(0).map(el => Array(3).fill("R")),
        }
        this.orderType = {
            "F": ["020", "021", "022", "102", "112", "122", "300", "310", "320", "500", "501", "502"],
            "R": ["002", "012", "022", "202", "212", "222", "400", "410", "420", "502", "512", "522"],
            "U": ["100", "101", "102", "200", "201", "202", "300", "301", "302", "400", "401", "402"],
            "B": ["000", "001", "002", "100", "110", "120", "302", "312", "322", "520", "521", "522"],
            "L": ["000", "010", "020", "200", "210", "220", "402", "412", "422", "500", "510", "520"],
            "D": ["120", "121", "122", "220", "221", "222", "320", "321", "322", "420", "421", "422"]
        }
    }

    //3차원 배열 만들기
    makeTripleArr() {
        this.keys = Object.keys(this.cube);
        this.keys.forEach(key => {
            this.triple_arr.push(this.cube[key]);
        })
        //시작 상태의 원본배열 복사해두기
        this.origin_arr = JSON.parse(JSON.stringify(this.triple_arr));
    }

    makeRandomArr(){//0에서 11사이의 랜덤 숫자를 받아서 인덱스로 처리(랜덤믹스에 사용)
        const keysArr = [];

        for (let i = 0; i < 5; i++){
            keysArr.push(this.randomKeys[this.getRandomNum(0, 11)]);
        }
        return keysArr;
    }

    getRandomNum (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //(회전을 위한)임시 배열 만들기
    getChangingEl(idxArr) {
        const tempArray = [];

        idxArr.forEach(idx => {
            const targetEl = this.triple_arr[parseInt(idx[0])][parseInt(idx[1])][parseInt(idx[2])];
            tempArray.push(targetEl);
        })

        return tempArray;
    }

    //바뀐 요소들을 재할당 해주기
    reassignEl(idxArr, tempArr) {

        tempArr.forEach((el, idx) => {
            this.triple_arr[parseInt(idxArr[idx][0])][parseInt(idxArr[idx][1])][parseInt(idxArr[idx][2])] = el;
        })
    }

    breakdownInputString(str) {
        const inputArray = this.combineApostrophe(str.split(""));
        const convertedArray = this.convertNumberToLetter(inputArray);
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

    countPlayingTime(){
        window.setInterval(() => {this.playingTime++}, 1000);
    }

    convertPlayingTimeToString(){
        let string;
        if(this.playingTime > 60) {
            const min = Math.floor(this.playingTime / 60);
            const sec = this.playingTime % 60;
            string = `${min}분 ${sec}초`;
        } else {
            string = `${this.playingTime}초`;
        }
        return string;
    }
}

//-------------------------------------------- Rotation클래스의 역할: 큐브의 회전과 엘리먼트의 이동 ---------------------------------------------------------
class Rotation {

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

    turnSideClockwise(side){
        for (let i = 0; i < side.length; i++) {
            for (let j = 0; j < i; j++) {
                [side[i][j], side[j][i]] = [side[j][i], side[i][j]];
            }
        }
        side.forEach((row) => row.reverse());
        return side;
    }

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
        this.countRendering = 0;
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

    makeChildDiv(type, trpleArr, playingTime){
        let template = ``;

        if (type === "Q") {
            template += `<br>▪︎ 조작횟수: ${this.countRendering}<br>▪︎ 경과시간: ${playingTime}<br>이용해주셔서 감사합니다 😊  <br>뚜뚜뚜...<br>`;
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
        return template;
    }


    makeSquareShapeTemplate(doubleArray) {
        let template = ``;

        doubleArray.forEach(row => {
            const str = row.join(" ");
            template += `${str}<br>`;
        })
        return template;
    }

    renderTemplate(template){
        const container = this._("#step-3-result");
        const childDiv = document.createElement("div");

        childDiv.innerHTML = template;
        container.appendChild(childDiv);
        this.countRendering++;
    }

}

//------------------------------------------- Operator클래스의 역할: 각 클래스들을 연결하고 전체적인 프로세스를 컨트롤 --------------------------------------------
class Operator {
    constructor(data, rotate, visual) {
        this.isGameOn = false;
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
        const enterButton = this.visual._(".step3-answer-button");
        const refreshBtn = this.visual._(".step3-refresh");
        const mixButton = this.visual._(".step3-mix");

        enterButton.addEventListener("click", this.executeClickEvent.bind(this));
        refreshBtn.addEventListener("click", this.reload);
        mixButton.addEventListener("click", this.mixArray.bind(this));
    }

    executeClickEvent(){
        this.isGameOn = true;
        this.data.countPlayingTime();
        const convertedString = this.data.breakdownInputString(this.visual.readInputData());
        convertedString.forEach(type => {
            const arrIdx = this.data.orderType[type[0]];
            let template;
            if (type === "Q") {
                this.visual.makeChildDiv(type, this.data.triple_arr, this.data.convertPlayingTimeToString());
                return;
            }  else if (type[1] === "'") {
                template = this.rotateCounterClockwise(arrIdx, type);
                this.visual.renderTemplate(template);
            } else {
                template = this.rotateClockwise(arrIdx, type);
                this.visual.renderTemplate(template);
            }
        })
        if (this.isEqual()) this.endGame();
    }

    rotateClockwise(arrIdx, type){
        const tempArr = this.data.getChangingEl(arrIdx);
        const triArrIdx = this.getIndexOfType(type);

        for (let i = 1; i <= 3; i++){
            this.rotate.pushElementToRight(tempArr);
        }
        this.data.reassignEl(arrIdx, tempArr);
        this.rotate.turnSideClockwise(this.data.triple_arr[triArrIdx]);
        return this.visual.makeChildDiv(type, this.data.triple_arr);
    }

    rotateCounterClockwise(arrIdx, type){
        const tempArr = this.data.getChangingEl(arrIdx);
        const triArrIdx = this.getIndexOfType(type[0]);

        for (let j = 1; j <= 3; j++){
            this.rotate.pushElementToLeft(tempArr);
        }
        this.data.reassignEl(arrIdx, tempArr);
        this.rotate.turnSideCounterClockwise(this.data.triple_arr[triArrIdx]);
        return this.visual.makeChildDiv(type, this.data.triple_arr);
    }

    mixArray(){
        const randomKeyArr = this.data.makeRandomArr();
        randomKeyArr.forEach(el => {
            const arrIdx = this.data.orderType[el[0]];
            if (el[1] === "'") {
                this.rotateCounterClockwise(arrIdx, el);
            } else {
                this.rotateClockwise(arrIdx, el);
            }
        })
        this.visual.renderCube(this.data.cube);
    }

    getIndexOfType(type){
        const nameArr = Object.keys(this.data.cube);
        const index = nameArr.indexOf(type);
        return index;
    }

    isEqual(){
        const str1 = JSON.stringify(this.data.origin_arr);
        const str2 = JSON.stringify(this.data.triple_arr);
        if (str1 === str2){
            return true;
        }
        return false;
    }

    endGame(){
        console.log("축하합니다! 큐브를 완성하셨습니다! ");
    }

    reload(){
        location.reload();
    }
}

const data = new Data();
const rotate = new Rotation();
const visual = new Visual();
const rubiksCube = new Operator(data, rotate, visual);
rubiksCube.init();
