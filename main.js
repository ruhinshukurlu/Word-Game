
var words = [
    {title : 'buenos aires', info : 'Capital city of Argentina'},
    {title : 'canberra', info : 'Capital city of Australia'},
    {title : 'budapest', info : 'Capital city of Hungary'},
    {title : 'jakarta', info : 'Capital city of Indonesia'},
    {title : 'ottawa', info : 'Capital city of Canada'},
    {title : 'vienna', info : 'Capital city of Austria'},
    {title : 'tehran', info : 'Capital city of Iran'},
    {title : 'tokyo', info : 'Capital city of Japan'},
    {title : 'bishkek', info : 'Capital city of Kyrgyzstan'},
    {title : 'rome', info : 'Capital city of Italy'},
    {title : 'amsterdam', info : 'Capital city of Netherlands'},
    {title : 'islamabad', info : 'Capital city of Pakistan'},
    {title : 'madrid', info : 'Capital city of Spain'},
    {title : 'tripoli', info : 'Capital city of Libya'},
    {title : 'tashkent', info : 'Capital city of Uzbekistan'},
    {title : 'ashgabat', info : 'Capital city of Turkmenistan'},
    {title : 'kyiv', info : 'Capital city of Ukraine'},
    {title : 'lima', info : 'Capital city of Peru'},
    {title : 'bratislava', info : 'Capital city of Slovakia'},
    {title : 'london', info : 'Capital city of United Kingdom'},
    {title : 'caracas', info : 'Capital city of Venezuela'},
    {title : 'hanoi', info : 'Capital city of Vietnam'},
];

var main_block = document.getElementById('main-block')

var word_box = document.getElementsByClassName('word')[0]


var found_letters = [];
var checked_letters = [];
var score = 10;
var score_text = document.getElementById('score')
score_text.innerText = `Score : ${score}`;

var letter_box = document.getElementsByClassName('letter-box')[0]
var change_word_btn = document.getElementById('change-word-btn');

var id; 
function generateTimer() {
    var timer = 30;
    var time_block = document.getElementById('time')
    time_block.style.backgroundColor = '#4AFF01'
    id = setInterval( time,1000 );
    console.log('ok')
    function time() {
        time_block.innerText = `Time  ${timer}`
        timer--
        if (timer == 10) {
            time_block.style.backgroundColor = '#FF0101'
        }
        if (timer == 0) {
            clearInterval(id)
            console.log('Game over :( ')
        }
    }
    
}


function generateRandomNumbers(){
    var rand_num_list = [];
    var randomNumber = Math.floor(Math.random()*6);
    rand_num_list.push(randomNumber);
    var new_randomNumber = Math.floor(Math.random()*6);
    console.log(new_randomNumber);
    if(rand_num_list.indexOf(new_randomNumber) == -1){
        rand_num_list.push(new_randomNumber);
        return new_randomNumber;
    }
    else{
        return randomNumber;
    }
}




var iterete = 0;
var letter_btn = document.createElement('button');

function generateLetter_btns(word){
    for(var i=97; i<123; i++){
        letter_btn = document.createElement('button');
        letter_btn.innerText = String.fromCharCode(i);

        letter_btn.onclick = function(){
            this.style.boxShadow = 'unset'
            checked_letters.push(this.innerText);
            var tapilmali_herf_p = word_box.querySelectorAll('p');
            for(var i=0; i<word.length; i++){
                var tapilmali_herf = tapilmali_herf_p[i];
                if(this.innerText == tapilmali_herf.innerText){
                    this.style.background = '#55FF00'
                    found_letters.push(tapilmali_herf.innerText);
                    tapilmali_herf.style.display = 'block';
                    score++;
                }
            }
            if(found_letters.length == word.length){
                alert('You won this step, if you want to continue click "Change word" button');
            }
            this.disabled = true;
            score--;
            score_text.innerText = `Score : ${score}`;
            
        }

        // function for keyboard
        document.onkeyup = function(e){
            if(e.keyCode >= 65 && e.keyCode <= 90){
                checked_letters.push(e.key);
                var tapilmali_herf_p = word_box.querySelectorAll('p');
                for(var i=0; i<word.length; i++){
                    var tapilmali_herf = tapilmali_herf_p[i];
                    
                    if(e.key == tapilmali_herf.innerText){
                        found_letters.push(e.key);
                        tapilmali_herf.style.display = 'block';
                        score++;
                    }
                }
                if(found_letters.length == word.length){
                    alert('You won this step, if you want to continue click "Change word" button');
                }
                var letter = letter_box.querySelectorAll('button');
                for(var i=0; i<26; i++){
                    if(e.key == letter[i].innerText){
                        letter[i].disabled = true;
                    }
                }
                score--;
                score_text.innerText = `Score : ${score}`;
            }
        }
        letter_box.appendChild(letter_btn);
    }
      
}
generateLetter_btns(words[0].title);


var letter_box_self = document.createElement('div');
var p = document.createElement('p');

function generateLetterBox(word){
    for(var i=0; i < word.length; i++){
        letter_box_self = document.createElement('div');
        letter_box_self.setAttribute('class','letter_box_self');
        p = document.createElement('p');
        p.innerText = word[i];
        p.style.display = 'none';
        letter_box_self.appendChild(p);
        word_box.appendChild(letter_box_self);
    }
}
generateLetterBox(words[0].title);

function generateInformationBox( word ){
    var information_block = document.getElementsByClassName('information-box')[0]
    information_block.innerHTML = `<spanp>You have to find ${word.title.length} letter word which is ${word.info}</span>`;
    
}

var startBtn = document.getElementById('startBtn');

startBtn.onclick = function( ) {
    generateTimer();
    generateInformationBox( words[0] )
    document.getElementById('overlay').classList.add('z-index')
    var buttons  = letter_box.querySelectorAll('button')
    var letters = word_box.querySelectorAll('div')
    for ( button of buttons) {
        button.style.boxShadow = '0px 0px 17px 4px rgba(255,255,255,0.67)';
        button.style.margin = '6px';
        button.style.transition = '.4s';
    }

    
    console.log(letters)
    for ( letter of letters) {
        letter.style.margin = '3px'
        letter.style.transition = '.4s'
    }
    
}

var count = 1;
change_word_btn.onclick = function (){
    clearInterval(id)
    generateTimer();
    generateInformationBox( words[count] )
    document.getElementById('overlay').classList.add('z-index')
    
    var new_word = words[count].title;
    iterete++;
    word_box.innerHTML = '';
    generateLetterBox(new_word); 
    letter_box.innerHTML = '';
    generateLetter_btns(new_word);
    found_letters = [];
    checked_letters = [];

    score = 10;
    score_text.innerText = `Score : ${score}`;

    count++;
    var buttons  = letter_box.querySelectorAll('button')
    var letters = word_box.querySelectorAll('div')

    for ( button of buttons) {
        button.style.boxShadow = 'unset';
        button.style.margin = '3px';
        button.style.transition = '.4s';
    }
    for ( letter of letters) {
        letter.style.margin = '-5px'
        letter.style.transition = '.4s'
    }

    setTimeout(function(){
        for ( button of buttons) {
            button.style.boxShadow = '0px 0px 17px 4px rgba(255,255,255,0.67)';
            button.style.margin = '6px';
            button.style.transition = '.4s';
        }
        for ( letter of letters) {
            letter.style.margin = '3px'
            letter.style.transition = '.4s'
        }
    },100)
}

var review_btn = document.getElementById('review-word');
review_btn.onclick = function(){
    var info_text = document.getElementsByClassName('information-box')[0]
    
    if (info_text.style.display == 'none') {
        info_text.style.display = 'block'
    }else{
        info_text.style.display = 'none'
    }

}