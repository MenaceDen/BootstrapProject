const mainContainer = document.querySelector("#main_container");
const questionNumberContainer = document.querySelector(
  "#question_count_container"
);
const counter = document.querySelector(".counting");
const invitationContainer = document.querySelector("#invitation");
const startButton = document.querySelector("#btn_start_survey");
startButton.addEventListener("click", startSurvey);
const firstQuestion = document.querySelector("#first_question");
const surveyName = document.querySelector("#survey_name_input");
const nextButton1 = document.querySelector("#btn_survey_name_next");
nextButton1.addEventListener("click", addNameAndContinue);
const surveyAnswers = new Map();
const secondQuestion = document.querySelector("#second_question");
const secondQuestionRadios = document.getElementsByName("flexRadioDefault");
const userComment = document.querySelector("#second_comment");
const nextButton2 = document.querySelector("#btn_survey_second_next");
nextButton2.addEventListener("click", answerSecondQuestion);
const thirdQuestion = document.querySelector("#third_question");
const thirdQuestionRadios = document.getElementsByName("flexRadioThird");
const nextButton3 = document.querySelector("#btn_survey_third_next");
nextButton3.addEventListener("click", answerThirdQuestion);
const fourthQuestion = document.querySelector("#fourth_question");
const fourthQuestionRadios = document.getElementsByName("flexRadioFourth");
const nextButton4 = document.querySelector("#btn_survey_fourth_next");
nextButton4.addEventListener("click", answerFourthQuestion);
const fifthQuestion = document.querySelector("#fifth_question");
const fifthRange = document.querySelector("#survey_range");
const fifthButton = document.querySelector("#btn_survey_fifth_end");
fifthButton.addEventListener("click", finishSurvey);
let questionNumber = 1;

function startSurvey() {
  invitationContainer.style.visibility = "hidden";
  firstQuestion.style.visibility = "visible";
  countQuestions();
  questionNumberContainer.style.visibility = "visible";
}
function addNameAndContinue() {
  if (!surveyName.value || surveyName.value === " ") {
    alert("Name must be filled out");
  } else {
    surveyAnswers.set(`${surveyName.name}`, `${surveyName.value}`);
    firstQuestion.style.visibility = "hidden";
    countQuestions();
    secondQuestion.style.visibility = "visible";
  }
}
function answerSecondQuestion() {
  let isChecked = false;
  secondQuestionRadios.forEach((item) => {
    if (item.checked) {
      isChecked = true;
      switch (item.id) {
        case "second_question_radio1":
          surveyAnswers.set("secondQuestion", "answer1");
          break;
        case "second_question_radio2":
          surveyAnswers.set("secondQuestion", "answer2");
          break;
        case "second_question_radio3":
          surveyAnswers.set("secondQuestion", "answer3");
          break;
        case "second_question_radio4":
          surveyAnswers.set("secondQuestion", "answer4");
          break;
        case "second_question_radio5":
          surveyAnswers.set("secondQuestion", "answer5");
          break;
        case "second_question_radio6":
          surveyAnswers.set("secondQuestion", "answer6");
          break;
        case "second_question_radio7":
          if (userComment.value) {
            surveyAnswers.set("secondQuestion", `${userComment.value}`);
          } else {
            alert("Type your answer!");
          }
          break;
      }
    }
    if (!isChecked) {
      surveyAnswers.set("secondQuestion", "no answer");
    }
  });
  secondQuestion.style.visibility = "hidden";
  countQuestions();
  thirdQuestion.style.visibility = "visible";
}
function answerThirdQuestion() {
  let isChecked = false;
  thirdQuestionRadios.forEach((item) => {
    if (item.checked) {
      isChecked = true;
      switch (item.id) {
        case "third_question_radio1":
          surveyAnswers.set("thirdQuestion", "answer1");
          break;
        case "third_question_radio2":
          surveyAnswers.set("thirdQuestion", "answer2");
          break;
        case "third_question_radio3":
          surveyAnswers.set("thirdQuestion", "answer3");
          break;
        case "third_question_radio4":
          surveyAnswers.set("thirdQuestion", "answer4");
          break;
        case "third_question_radio5":
          surveyAnswers.set("thirdQuestion", "answer5");
          break;
        case "third_question_radio6":
          surveyAnswers.set("thirdQuestion", "answer6");
          break;
      }
    }
    if (!isChecked) {
      surveyAnswers.set("thirdQuestion", "no answer");
    }
  });

  thirdQuestion.style.visibility = "hidden";
  countQuestions();
  fourthQuestion.style.visibility = "visible";
}
function answerFourthQuestion() {
  let isChecked = false;
  fourthQuestionRadios.forEach((item) => {
    if (item.checked) {
      isChecked = true;
      switch (item.id) {
        case "fourth_question_radio1":
          surveyAnswers.set("fourthQuestion", "answer1");
          break;
        case "fourth_question_radio2":
          surveyAnswers.set("fourthQuestion", "answer2");
          break;
        case "fourth_question_radio3":
          surveyAnswers.set("fourthQuestion", "answer3");
          break;
        case "fourth_question_radio4":
          surveyAnswers.set("fourthQuestion", "answer4");
          break;
        case "fourth_question_radio5":
          surveyAnswers.set("fourthQuestion", "answer5");
          break;
        case "fourth_question_radio6":
          surveyAnswers.set("fourthQuestion", "answer6");
          break;
      }
    }
    if (!isChecked) {
      surveyAnswers.set("fourthQuestion", "no answer");
    }
  });

  fourthQuestion.style.visibility = "hidden";
  countQuestions();
  fifthQuestion.style.visibility = "visible";
}
function finishSurvey() {
  fifthQuestion.style.visibility = "hidden";
  questionNumberContainer.style.visibility = "hidden";
  surveyAnswers.set("fifthQuestion", `${fifthRange.value}`);
  const cheersHeader = document.createElement("h3");
  cheersHeader.innerHTML = `Hi ${surveyAnswers.get(
    "name"
  )}! <br> Thank you for your time!`;
  const cheersMessage = document.createElement("p");
  cheersMessage.setAttribute("class", "fs-6");
  const smileIcon = document.createElement("img");
  smileIcon.setAttribute("class", "img-fluid");
  smileIcon.setAttribute("style", "width: 80px");
  switch (parseInt(surveyAnswers.get("fifthQuestion"))) {
    case 1:
      cheersMessage.innerHTML =
        "We appreciate your opinion. Oooops, sorry to disappoint you.";
      smileIcon.src = "Images/smile4.svg";
      break;
    case 2:
      cheersMessage.innerHTML =
        "We appreciate your opinion. We hope it will be better next time!";
      smileIcon.src = "Images/smile3.svg";
      break;
    case 3:
      cheersMessage.innerHTML = "We appreciate your opinion. Golden middle!";
      smileIcon.src = "Images/smile5.svg";
      break;
    case 4:
      cheersMessage.innerHTML =
        "We appreciate your opinion. Thanks for the very good rating!";
      smileIcon.src = "Images/smile1.svg";
      break;
    case 5:
      cheersMessage.innerHTML =
        "We appreciate your opinion. Perfect! We are glad to meet your requirements!";
      smileIcon.src = "Images/smile2.svg";
      break;
  }

  mainContainer.appendChild(cheersHeader);
  mainContainer.appendChild(cheersMessage);
  mainContainer.appendChild(smileIcon);
}
function countQuestions() {
  counter.innerHTML = questionNumber.toString();
  questionNumber++;
}
