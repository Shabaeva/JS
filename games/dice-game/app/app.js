    let scores, roundScore, activePlayer, gamePlaying;

    //global score 0 player
    let x = document.querySelector('#score-0').textContent;

    function init() {
        scores = [0,0];
        roundScore = 0;
        activePlayer = 0;
        gamePlaying = true;


        //dice image in the center
        document.querySelector('.dice').style.display = 'none';

        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');

    }

    init();

    let previousDiceRoll;

    function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
    }



    //Roll dice button click
    document.querySelector('.btn-roll').addEventListener('click', function clickButton() {
        if(gamePlaying) {
            //1.random number
            let dice = Math.floor(Math.random() * 6) + 1;
            //2. display result
            let diceDom =  document.querySelector('.dice');
            diceDom.style.display = 'block';
            diceDom.src = '../img/dice-' + dice + '.png';

            //3. update the round score if the rolled number was not a 1
            if (dice === 6 && previousDiceRoll === 6) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            } else if( dice !== 1) {
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                nextPlayer();
            }
            previousDiceRoll = dice;

        }
    });

    //Hold button click
    document.querySelector('.btn-hold').addEventListener('click',function score() {
        if (gamePlaying) {
            //add current score to global score
            scores[activePlayer] += roundScore;
            //update the ui
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            //check if player won the game
            if (scores[activePlayer] >=100) {
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlaying = false;
            }else {
                //next player
                nextPlayer();
            }
        }
    } );

    //New game button
    document.querySelector('.btn-new').addEventListener('click', init);



