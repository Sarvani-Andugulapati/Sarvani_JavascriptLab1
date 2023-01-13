function Question(questionText, questionNo){
    this.questionText= questionText ;
    this.questionNo=questionNo;
}

const question1= new Question("If you type the following code in the console window, what result will you get 3 > 2 > 1 === false;", 1);
const question2= new Question("JavaScript is a ___ -side programming language.", 2);
const question3= new Question("Which JavaScript label catches all the values, except for the ones specified?", 3);
const question4= new Question("Which is not a javascript framework?", 4);
const question5= new Question("Which is used to connect to Database?", 5);

function Answer(AnswerText){
    this.AnswerText=AnswerText;
}
//Question1
const answer1Q1= new Answer("True");
const answer2Q1= new Answer("False");
//Question2
const answer1Q2= new Answer("Client");
const answer2Q2= new Answer("Server");
const answer3Q2= new Answer("Both");
const answer4Q2= new Answer("None");
//Question3
const answer1Q3= new Answer("Catch");
const answer2Q3= new Answer("label");
const answer3Q3= new Answer("try");
const answer4Q3= new Answer("default");
//Question4
const answer1Q4= new Answer("Python Script");
const answer2Q4= new Answer("JQuery");
const answer3Q4= new Answer("Django");
const answer4Q4= new Answer("NodeJS");
//Question5
const answer1Q5= new Answer("PHP");
const answer2Q5= new Answer("HTML");
const answer3Q5= new Answer("JS");
const answer4Q5= new Answer("All");

function QuestionAnswer(questionObj,answerChoicesObj,correctAnswerObj){
    this.questionObj=questionObj;
    this.answerChoicesObj=answerChoicesObj;
    this.correctAnswerObj=correctAnswerObj;

    this.evaluateansw= function(userAnswer){
        if(userAnswer===correctAnswerObj.AnswerText){
            return true;
        }else{
            return false;
        }
    }
}

const qa1= new QuestionAnswer(question1,[answer1Q1,answer2Q1],answer1Q1);
const qa2= new QuestionAnswer(question2,[answer1Q2,answer2Q2,answer3Q2,answer4Q2],answer3Q2);
const qa3= new QuestionAnswer(question3,[answer1Q3,answer2Q3,answer3Q3,answer4Q3],answer4Q3);
const qa4= new QuestionAnswer(question4,[answer1Q4,answer2Q4,answer3Q4,answer4Q4],answer3Q4);
const qa5= new QuestionAnswer(question5,[answer1Q5,answer2Q5,answer3Q5,answer4Q5],answer1Q5);

function QuizApp(qaArray){

 this.qaArray=qaArray;

 this.pageindex=0;  

 this.score = 0;

 this.loadandStart= function(){

    this.initandDisplay(); 
console.log("inside load page");
 }

 this.initandDisplay=function(){

    this.attachlistener();
    this.displayQuizpage();
    console.log("inside init page");
 }

 this.displayNextpage=function(){

    this.pageindex ++;
    this.attachlistener();
    this.displayQuizpage();
    console.log("inside display next page");
 }
this.attachlistener= function(){

    console.log("inside listener page");

    const questionAnswerObj=qaArray[this.pageindex];

    const listenerThisObj = this;

    const btObj=document.getElementsByTagName("button");

    console.log(btObj.length);

    for(let index=0; index<btObj.length; index++){

        console.log("inside for");

        document.getElementById("btn"+index).onclick = function(event){

            console.log("inside event handler");

           const currTarget = event.currentTarget;

            //Correct answer check
            //Track or increment the Score[claculate percentage]

            const usrAns = currTarget.children[0].innerHTML;

            const result = questionAnswerObj.evaluateansw(usrAns);

            console.log(result);

            if(result){

                listenerThisObj.incrementScore()

            }
            //Forward to next   
            listenerThisObj.next();
        }
    }
}   

this.incrementScore  = function(){

    this.score ++;

}

this.next = function(){

if(this.lastQuestion()){

    this.displayResultPage();
}else{

    this.displayNextpage();
    console.log("entered else");
}
}

this.lastQuestion = function(){

    if(this.pageindex===this.qaArray.length-1){

        return true;
    }else{
        return false;
    } 
}

 this.displayQuizpage=function(){
    this.displayQAsection();
    this.displayQprogress();
 }

 this.displayQAsection=function(){

const questionAnswerObj=qaArray[this.pageindex];

const questionText= questionAnswerObj.questionObj.questionText;

document.getElementById("question").innerHTML=questionText;

const answerObj=questionAnswerObj.answerChoicesObj;

    for(let i=0; i<answerObj.length; i++){

        const ansObj = answerObj[i];

        const elementChoice = document.getElementById("choice"+i);

        elementChoice.innerHTML=ansObj.AnswerText;
    
        }
        this.deleteButtons();
}

this.deleteButtons = function(){

    const questionAnswerObj=qaArray[this.pageindex];

    const totalBtnsObj = document.getElementsByTagName("button");

    const btnLength = totalBtnsObj.length;
    console.log(btnLength);

    const ansChoicesObj = questionAnswerObj.answerChoicesObj;

    let anslength = ansChoicesObj.length;
    console.log("answer length is" + anslength);

    let difflength = btnLength-anslength;
    console.log("difference in length is" + difflength);

    if(difflength!=0){

        for(let i=1; i<=difflength; i++){

            let btn = document.getElementById("btn"+anslength);

            btn.style.visibility = 'hidden';

            anslength++;

        }
    }else{

        for(let i=0; i<btnLength; i++){

            let visibleBtn = document.getElementById("btn"+i).style.visibility='visible';

        }

    }
}

this.displayQprogress = function(){

    const questionAnswerObj=qaArray[this.pageindex];

    const questionNo= questionAnswerObj.questionObj.questionNo;

    const noofquestions=qaArray.length;

    let progresstext = `Question ${questionNo} of ${noofquestions}`;

   const progresshtml= document.getElementById("progress");
   progresshtml.innerHTML = progresstext;   

   }
this.displayResultPage= function(){

   const percentage= (this.score/this.qaArray.length)*100;
   
    const resultElement = `
   <h1>Quiz Result</h1>
   <h3 id='score'>
   Your score is ${this.score} and percentage is ${percentage}%
   </h3>
   `

    const quizPage= document.getElementById("quiz");

    quizPage.innerHTML= resultElement;

}
}

const quizApplication= new QuizApp([qa1,qa2,qa3,qa4,qa5]);
quizApplication.loadandStart();
