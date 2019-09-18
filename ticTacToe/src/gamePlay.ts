import { Checker } from './checker';

export class GamePlay {
    // Variable declaration
    public turn: number;
    private plays: NodeListOf<HTMLElement>;
    private aiToken: string;
    private playerToken: string;
    private checker: Checker;

    constructor() {
        this.plays = document.querySelectorAll(".cell");
        this.turn = 0;
        this.checker = new Checker();
    }

    cellEventListener = (playerToken: string, aiToken: string): void => {
        this.playerToken = playerToken;
        this.aiToken = aiToken
        // add event listener
        for (var i = 0; i < this.plays.length; i++) {
            this.plays[i].addEventListener("click", this.playerMove);
        }
    }

    playerMove = (e: Event): void => {
        let self = this
        let target = e.target as HTMLElement;
        target.innerHTML = this.playerToken;
        target.classList.remove('playable');
        target.removeEventListener('click', this.playerMove);
        this.checker.checker('player', this.playerToken, this.aiToken, this.turn);
        if (this.checker.stopGame === false) {
            setTimeout(() => {
                this.aiMove(self.aiToken);
            }, 300);
        }
        this.turn++
    }

    aiMove = (token: string): void => {
        // Generate random number
        let randomNumber: number = Math.floor(Math.random() * 9);
        // Algorithm for computer turn
        while (this.plays[randomNumber].innerHTML === 'X' || this.plays[randomNumber].innerHTML === 'O' && this.turn < 5) {
            randomNumber = Math.floor(Math.random() * 9);
        }
        this.checker.checker("comp", this.playerToken, this.aiToken, this.turn);
        this.plays[randomNumber].innerHTML = token;
        this.plays[randomNumber].classList.remove('playable');
        this.plays[randomNumber].removeEventListener('click', this.playerMove)
    }
}