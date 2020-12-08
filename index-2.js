/*
2단계: 평면 큐브 구현하기
1. 처음 시작하면 초기 상태를 출력한다.
2. 간단한 프롬프트 (CLI에서 키보드 입력받기 전에 표시해주는 간단한 글자들 - 예: CUBE> )를 표시해 준다.
3. 한 번에 여러 문자를 입력받은 경우 순서대로 처리해서 매 과정을 화면에 출력한다.

***주의사항***
너무 크지 않은 함수 단위로 구현하려고 노력할 것
전역변수의 사용을 자제할 것
객체와 배열을 적절히 활용할 것

- 이중 배열 사용 [[ , , ], [ , , ], [ , , ]]
- takeElementFromRight & takeElementFromLeft를 재사용하기
- 위로 밀거나 아래로 미는 건 -90도로 회전하게 되면 오른쪽/왼쪽으로 미는 것과 같아진다. 회전하는 함수 구현 필요
*/


//------------------------------------ 평면 큐브 전반에 필요한 데이터를 관리 & 핸들링하는 Model 클래스
class Model {
    constructor() {
        this.cube = [
            ["R", "R", "W"],
            ["G", "C", "W"],
            ["G", "B", "B"]
        ];
    }

}

//------------------------------------------------- DOM 핸들링과 UI 렌더링 역할을 하는 View 클래스
class View {
    makeIntoCubeShape(cube){
        const answerBox = document.querySelector("#step-2-result");
        let template = `<초기상태><br>`;

        cube.forEach(row => {
            const str = row.join(" ");
            template += `${str}<br>`;
        })
        this.renderUI(answerBox, template);
    }

    renderUI(inputBox, template){
        inputBox.innerHTML = template;
    }

}

//----------------------------------------------- Model과 View의 중계역할을 하는 Controller 클래스
class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;
    }

    init() {
        this.view.makeIntoCubeShape(this.model.cube);
    }
}

const model = new Model();
const view = new View();
const flatCube = new Controller(model, view);
flatCube.init();

