/*
2단계: 평면 큐브 구현하기
1. 처음 시작하면 초기 상태를 출력한다.
2. 간단한 프롬프트 (CLI에서 키보드 입력받기 전에 표시해주는 간단한 글자들 - 예: CUBE> )를 표시해 준다.
3. 한 번에 여러 문자를 입력받은 경우 순서대로 처리해서 매 과정을 화면에 출력한다.

***주의사항***
너무 크지 않은 함수 단위로 구현하려고 노력할 것
전역변수의 사용을 자제할 것
객체와 배열을 적절히 활용할 것
*/

//------------------------------------ 평면 큐브 전반에 필요한 데이터를 관리 & 핸들링하는 Model 클래스
class Model {
    constructor() {
        this.cube = [
            ["R", "R", "W"],
            ["G", "C", "W"],
            ["G", "B", "B"]
        ];

        this.direction = {
            "U": () => this.takeElementFromLeft(this.cube[0]),
            "U'": () => this.takeElementFromRight(this.cube[0]),
            "R": () => this.takeElementFromRight((this.turnCubeClockwise(this.cube))[2]),
            "R'": () => this.takeElementFromLeft((this.turnCubeClockwise(this.cube))[2]),
            "L": () => this.takeElementFromLeft((this.turnCubeClockwise(this.cube))[0]),
            "L'": () => this.takeElementFromRight((this.turnCubeClockwise(this.cube))[0]),
            "B": () => this.takeElementFromRight(this.cube[2]),
            "B'": () => this.takeElementFromLeft(this.cube[2]),
            "Q": () => {return `Bye~🖐`}
        }
    }

    takeElementFromRight(array){
        const poppedElement = array.pop();
        array.unshift(poppedElement);
        return array;
    }

    takeElementFromLeft(array){
        const shiftedElement = array.shift();
        array.push(shiftedElement);
        return array;
    }


    //시계방향으로 90도 회전
    turnCubeClockwise(cube){
        for (let i = 0; i < cube.length; i++) {
            for (let j = 0; j < i; j++) {
              [cube[i][j], cube[j][i]] = [cube[j][i], cube[i][j]];
            }
        }
        cube.forEach((row) => row.reverse());
        return cube;
    }

    //시계반대방향으로 90도 회전
    turnCubeCounterClockwise(cube){
        cube.forEach((row) => row.reverse());
           for (let i = 0; i < cube.length; i++) {
               for (let j = 0; j < i; j++) {
                 [cube[i][j], cube[j][i]] = [cube[j][i], cube[i][j]];
               }
           }
        return cube;
    }

}

//------------------------------------------------- DOM 핸들링과 UI 렌더링 역할을 하는 View 클래스
class View {
    makeStringsIntoCubeShape(cube, type, template){
        type ? template += `${type}<br>` : template += `<초기상태><br>`;

        cube.forEach(row => {
            const str = row.join(" ");
            template += `${str}<br>`;
        })

        template += `<br>`
        return template;
    }

    getInputValue(){
        const inputValue = (document.querySelector("#step2-input").value).split("");
        const filteredStrings = this.filterInputValue(inputValue);

        return filteredStrings;
    }

    filterInputValue(inputString) {
        let array = [];

        inputString.forEach((el, idx) => {
            if (el === "'") {
                let mergedEl = `${inputString[idx - 1]}`;
                mergedEl += el;
                el = mergedEl;
                array.pop();
            }
            array.push(el);
        })

        return array;
    }

    renderUI(inputBox, template){
        inputBox.innerHTML = template;
        this.resetToDefaultStatus();
    }

    resetToDefaultStatus(){
        const form = document.querySelector(".input_form2");
        const input = document.querySelector("#step2-input");

        form.reset();
        input.focus();
    }

}

//----------------------------------------------- Model과 View의 중계역할을 하는 Controller 클래스
class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.template = ``;
    }

    init() {
        this.template = this.view.makeStringsIntoCubeShape(this.model.cube, null, this.template);
        this.addEvent();
    }

    addEvent(){
        const inputButton = document.querySelector(".step2-answer-button");
        const refreshButton = document.querySelector(".refresh");

        inputButton.addEventListener("click", this.executeClickEvent.bind(this));
        refreshButton.addEventListener("click", this.reloadPage);
    }

    executeClickEvent(){
        const answerBox = document.querySelector("#step-2-result");
        const directionArray = this.view.getInputValue();

        directionArray.forEach((type)=> {
            if (type === "Q"){
                const endMessage = this.model.direction[type]();
                this.template = endMessage;
                return;
            } else {
                this.model.direction[type]();
            }

            if (this.isRightOrLeftColumn(type)){
                this.model.turnCubeCounterClockwise(this.model.cube);
            }
            this.template = this.view.makeStringsIntoCubeShape(this.model.cube, type, this.template);
        })
        this.view.renderUI(answerBox, this.template);
    }

    isRightOrLeftColumn(type){
        return (type === "R" || type === "R'" || type === "L" || type === "L'") ? true : false ;
    }

    reloadPage(){
        location.reload();
    }
}

const model = new Model();
const view = new View();
const flatCube = new Controller(model, view);
flatCube.init();

