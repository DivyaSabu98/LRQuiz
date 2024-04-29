let timer;
let questions = [
  {
      id: 1,
      question: "What is (2 + 7+ 9) – (3+4+8) = ?",
      answer:"3",
      options: [
          "3",
          "5",
          "2",
          "6"
      ]   
  },
  {
      id: 2,
      question: "What is 15 * 5 + 78 – 5/4 = ?",
      answer: "151.75",
      options: [
        "123",
        "175.2",
        "151.75",
        "134.25"
      ]
    },
    {
      id: 3,
      question: "100 – 2X = 30; FIND X ",
      answer: "35",
      options: [
        "35",
        "26",
        "55",
        "30"
      ]
    },
    {
      id: 4,
      question: "(3X)^2/4 = 10800, FIND X",
      answer: "120",
      options: [
        "110",
        "120",
        "100",
        "150"
      ]
    },
    {
      id: 5,
      question: "22% * X = 176; FIND X ",
      answer: "800",
      options: [
        "600",
        "750",
        "910",
        "800"
      ]
    },
    {
      id: 6,
      question: "Fill in the blankcs using: =, /, +, -, * or =. 6 _ 4 _ 12 _ 12  ",
      answer: " *, -, =",
      options: [
        " *, -, =",
        " *, +, =",
        " +, /, *",
        " -, *, ="
      ]
    },
    {
      id: 7,
      question: "Fill in the blankcs using: =, /, +, -, * or =. (8 _ 7 _ 6) _ 5 _ 10   ",
      answer: " =, /, -, + ",
      options: [
        " =, /, *, + ",
        " =, /, +, + ",
        " =, +, -, + ",
        " =, /, -, + "
      ]
    },
    {
      id: 8,
      question: "Fill in the blankcs using: =, /, +, -, * or =. 24 _ 34 _ 2 _ 5 _ 12",
      answer: "  *, -, /, =  ",
      options: [
        "  *, -, /, +  ",
        "  *, -, /, =  ",
        "  /, -, *, =  ",
        "  +, -, /, +  "
      ]
    },
    {
      id: 9,
      question: "N(N -1)/ 2 = 45; FIND N?",
      answer: "10",
      options: [
        "12",
        "10",
        "21",
        "9"
      ]
    },
    {
      id: 10,
      question: " X-1 = Y+1; X+1 = 2(Y-1), FIND X AND Y?",
      answer: "X = 7; Y = 5 ",
      options: [
        "X = 7; Y = 5",
        "X = 3; Y = 5",
        "X = 10; Y = 3",
        "X = 8; Y = 2"
        
      ]
    },
    {
      id: 11,
      question: " 160% OF Q = 130% OF R, FIND THE RATIO Q:R?",
      answer: "13:16 ",
      options: [
        "11:21  ",
        "13:20  ",
        "14:15  ",
        "13:16  "
        
      ]
    },      {
      id: 12,
      question: " X-1 = Y+1; X+1 = 2(Y-1), FIND X AND Y?",
      answer: " X=2; Y=4; Z=3 ",
      options: [
        " X=1; Y=4; Z=5 ",
        " X=2; Y=3; Z=5 ",
        " X=2; Y=4; Z=3 ",
        " X=1; Y=5; Z=1 "
        
      ]
    },
];

let question_count = 0;
let points = 0;

window.onload = function(){
    show(question_count);
    startTimer();
};

function show(count){
    let question = document.getElementById("questions");
    let[first, second, third, fourth] = questions[count].options;

    question.innerHTML = `<h2>Q${count + 1}. ${questions[count].question}</h2>
    <ul class="option_group">
    <li class="option">${first}</li>
    <li class="option">${second}</li>
    <li class="option">${third}</li>
    <li class="option">${fourth}</li>
    </ul>`;
    toggleActive();
}

function toggleActive(){
    let option = document.querySelectorAll("li.option");
    for(let i=0; i < option.length; i++){
        option[i].onclick = function(){
            for(let i=0; i < option.length; i++){
                if(option[i].classList.contains("active")){
                    option[i].classList.remove("active");
                }
            }
            option[i].classList.add("active");
            clearInterval(timer); // Reset timer when user selects an option
            startTimer(); // Start timer again for the next question
        }
    }
}

function startTimer(){
    let timeLeft = 30;
    timer = setInterval(function(){
        document.getElementById("timer").innerText = timeLeft;
        timeLeft -= 1;
        if(timeLeft < 0){
            clearInterval(timer);
            next();
        }
    }, 1000);
}

function next(){
    if(question_count == questions.length -1){
        location.href = "final.html";
    }

    let user_answer = document.querySelector("li.option.active").innerHTML;

    if(user_answer == questions[question_count].answer){
        points += 10;
        sessionStorage.setItem("points",points);
    }
    question_count++;
    show(question_count);
}
function toggleActive(){
  let option = document.querySelectorAll("li.option");
  let isActive = false; // Flag to check if timer is already active
  for(let i=0; i < option.length; i++){
      option[i].onclick = function(){
          for(let i=0; i < option.length; i++){
              if(option[i].classList.contains("active")){
                  option[i].classList.remove("active");
              }
          }
          option[i].classList.add("active");
          if (!isActive) {
              clearInterval(timer); // Reset timer when user selects an option
              startTimer(); // Start timer again for the next question
              isActive = true; // Set flag to true indicating timer is active
          }
      }
  }
}
function next(){
  if(question_count == questions.length -1){
      location.href = "final.html";
  }

  let user_answer = document.querySelector("li.option.active").innerHTML;

  if(user_answer == questions[question_count].answer){
      points += 10;
      sessionStorage.setItem("points",points);
  }
  question_count++;
  show(question_count);
  startTimer(); // Restart timer for the next question
}
