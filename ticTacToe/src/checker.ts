import { Reset } from './reset'
export class Checker {
    // Variable declaration
    private plays: NodeListOf<HTMLElement>;
    private playerToken: string;
    private aiToken: string;
    private turn: number;
    private resetGame: Reset;
    public stopGame: boolean;

    constructor() {
        this.plays = document.querySelectorAll(".cell");
        this.resetGame = new Reset();
    }

    checker = (who: string, playerToken: string, aiToken: string, turn: number): void => {
        this.stopGame = false;
        this.playerToken = playerToken;
        this.aiToken = aiToken;
        this.turn = turn;
        if ((who === "player")
            // Win condition
            && ((this.plays[0].innerHTML === this.playerToken && this.plays[1].innerHTML === this.playerToken && this.plays[2].innerHTML === this.playerToken)
                || (this.plays[3].innerHTML === this.playerToken && this.plays[4].innerHTML === this.playerToken && this.plays[5].innerHTML === this.playerToken)
                || (this.plays[6].innerHTML === this.playerToken && this.plays[7].innerHTML === this.playerToken && this.plays[8].innerHTML === this.playerToken)
                || (this.plays[0].innerHTML === this.playerToken && this.plays[3].innerHTML === this.playerToken && this.plays[6].innerHTML === this.playerToken)
                || (this.plays[1].innerHTML === this.playerToken && this.plays[4].innerHTML === this.playerToken && this.plays[7].innerHTML === this.playerToken)
                || (this.plays[2].innerHTML === this.playerToken && this.plays[5].innerHTML === this.playerToken && this.plays[8].innerHTML === this.playerToken)
                || (this.plays[0].innerHTML === this.playerToken && this.plays[4].innerHTML === this.playerToken && this.plays[8].innerHTML === this.playerToken)
                || (this.plays[2].innerHTML === this.playerToken && this.plays[4].innerHTML === this.playerToken && this.plays[6].innerHTML === this.playerToken))
        ) {
            this.stopGame = true;
            setTimeout(this.win, 1000);
        }
        // Lose condition
        else if ((who === "comp")
            && ((this.plays[0].innerHTML === this.aiToken && this.plays[1].innerHTML === this.aiToken && this.plays[2].innerHTML === this.aiToken)
                || (this.plays[3].innerHTML === this.aiToken && this.plays[4].innerHTML === this.aiToken && this.plays[5].innerHTML === this.aiToken)
                || (this.plays[6].innerHTML === this.aiToken && this.plays[7].innerHTML === this.aiToken && this.plays[8].innerHTML === this.aiToken)
                || (this.plays[0].innerHTML === this.aiToken && this.plays[3].innerHTML === this.aiToken && this.plays[6].innerHTML === this.aiToken)
                || (this.plays[1].innerHTML === this.aiToken && this.plays[4].innerHTML === this.aiToken && this.plays[7].innerHTML === this.aiToken)
                || (this.plays[2].innerHTML === this.aiToken && this.plays[5].innerHTML === this.aiToken && this.plays[8].innerHTML === this.aiToken)
                || (this.plays[0].innerHTML === this.aiToken && this.plays[4].innerHTML === this.aiToken && this.plays[8].innerHTML === this.aiToken)
                || (this.plays[2].innerHTML === this.aiToken && this.plays[4].innerHTML === this.aiToken && this.plays[6].innerHTML === this.aiToken))
        ) {
            setTimeout(this.lose, 1000);
        }
        // Tie condition
        else if (this.turn === 5) {
            setTimeout(this.tie, 1000);
        }
    }

    win = () => {
        this.turn = 0;
        this.resetGame.reset('You win !')
    }
    lose = () => {
        this.turn = 0;
        this.resetGame.reset('You lose !')
    }
    tie = () => {
        this.turn = 0;
        this.resetGame.reset('You tied !')
    }

}