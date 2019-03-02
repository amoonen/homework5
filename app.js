$('#start').on('click',function(){
    $('#start').remove();
    game.loadQuestion();
    
})

$(document).on('click','.answer-button',function(e){game.clicked(e);
})

$(document).on('click','#reset',function(){
    game.reset();
})

var questions = [{
    question: "What country did America gain independence from?",
    answers: ["Mexico","Venezuela","Canada","Great Britain" ],
    correctAnswer: "Great Britain",
},

{
    question: "DONDE ESTA LA LECHE,translates to?",
    answers: ["Chimi changa","Where is the milk","I'll have four tacos","Who is milk" ],
    correctAnswer: "Where is the milk",
},

{
    question: "Who was the best guitarist to walk the face of the earth?",
    answers: ["Hendrix","Page","Stevie Ray","Oprah Winfrey" ],
    correctAnswer: "Stevie Ray",
},

{
    question: "Go ahead,make my day",
    answers: ["Tom Cruise","Clint Eastwood","Samuel L Jackson","Don Knotts" ],
    correctAnswer: "Clint Eastwood",
},

{
    question: "Who serves the best fried chicken?",
    answers: [" Chick Fil a","Popeyes","Raising Canes","KFC" ],
    correctAnswer: "Raising Canes",
}];

var game = {
    questions: questions,
    currentQuestion:0,
    counter:30,
    correct:0,
    incorrect:0,
    unanswered:0,
    
    countdown:function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0){
            console.log("TIME UP!");
            game.timeUp();
        }

    },
    
    loadQuestion:function(){
        timer=setInterval(game.countdown,1000);
        $('subwrapper').html("<h2> id= 'counter'>30 <h/2>");
        $('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
        for(var i=0;i<questions[game.currentQuestion]. answers.length;i++)
        {
            $('#subwrapper').append('<button class="answer-button" id="button-'+i+'"data-name="'
            +questions[game.currentQuestion].answers[i]+'">'
            +questions[game.currentQuestion].answers[i]+'</button>');
        }
    },

    nextQuestion:function(){
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();

    },
    timeUp:function(){
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2>OUT OF TIME</h2>');
        $('#subwrapper').append('<h3>CORRECT ANSWER WAS:'
        +questions[game.currentQuestion].correctAnswer+'<h/3>');
        if(game.currentQuestion==questions.lenght-1){
            setTimeout(game.results,3*1000);
        } else{
            setTimeout(game.nextQuestion,3*1000);
        }

    },
    results:function(){
        clearInterval(timer);
        $('#subwrapper').html("<h2> ALL DONE </h2>")
        $('#subwrapper').append("<h3> CORRECT:"+game.correct+"<h/3>");
        $('#subwrapper').append("<h3> incorrect:"+game.incorrect+"<h/3>");
        $('#subwrapper').append("<h3>Unanswered:"+game.unanswered+"</h3>");
        $('#subwrapper').append("<button id='reset'>RESET</button>");

        

    },
    clicked:function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();

        } else {
            game.answeredIncorrectly();
        }

    },
    answeredCorrectly:function(){
        console.log("YOU GOT IT");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2> YOU GOT IT RIGHT </h2>');
        if(game.currentQuestion==questions.lenght-1){
            setTimeout(game.results,3*1000);
        } else{
            setTimeout(game.nextQuestion,3*1000);
        }

    },
    answeredIncorrectly:function(){
        console.log("WRONG");
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2> YOU GOT IT WRONG </h2>');
        if(game.currentQuestion==questions.lenght-1){
            setTimeout(game.results,3*1000);
        } else{
            setTimeout(game.nextQuestion,3*1000);
        }

    },
    reset:function(){
        game.currentQuestion=0;
        game.counter=0;
        game.correct=0;
        game.incorrect=0;
        game.unanswered=0;
        game.loadQuestion();


    },





}