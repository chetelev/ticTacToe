import { transcode } from "buffer";
import { brotliDecompressSync } from "zlib";

export class Game {
    // Variable declaration
    private modalToggle: HTMLElement;
    private playX: HTMLElement;
    private playO: HTMLElement;
    private plays: NodeListOf<HTMLElement>;
    private canPlay: boolean;
    private playerToken: string;
    private aiToken: string;
    private turn: number;
    private message: HTMLElement;
    private dark: HTMLElement;
    private playerMoveGlobal: any;
    private stopGame: boolean;

    constructor() {
        // DOM Selectors
        this.modalToggle = document.getElementById('dark');
        this.playX = document.getElementById('playX');
        this.playO = document.getElementById('playO');
        this.plays = document.querySelectorAll(".cell");
        this.message = document.getElementById('message');
        this.dark = document.getElementById('dark');
        this.turn = 0;
        this.canPlay = false;
        this.stopGame = false;
        this.startGame();
    }

    startGame() {
        // Modal trigger and choose sign
        this.modalToggle.classList.remove('hidden');
        this.playX.addEventListener('click', () => {
            this.modalToggle.classList.add('hidden');
            this.playerToken = 'X';
            this.aiToken = 'O';
            this.playerMove(this.playerToken);
        });
        this.playO.addEventListener('click', () => {
            this.modalToggle.classList.add('hidden');
            this.playerToken = 'O';
            this.aiToken = 'X';
            this.playerMove(this.playerToken);
        });
    }

    playerMove(token: string) {
        // Instance of global this 
        var self = this;
        // PlayerMove function
        this.playerMoveGlobal = function (e: any) {
            if (self.stopGame === false) {
                let target = e.target as HTMLElement;
                target.innerHTML = token;
                target.classList.remove('playable');
                target.removeEventListener('click', self.playerMoveGlobal)
                self.checker('player');
                setTimeout(() => {
                    if (self.stopGame === false) {
                        self.aiMove(self.aiToken);
                    }
                }, 300);

                self.turn++
            }
        }
        for (var i = 0; i < this.plays.length; i++) {
            this.plays[i].addEventListener("click", this.playerMoveGlobal);
        }
    }

    aiMove(token: string) {
        // Generate random number
        let randomNumber: number = Math.floor(Math.random() * 9);
        // Algorithm for computer turn
        while (this.plays[randomNumber].innerHTML === 'X' || this.plays[randomNumber].innerHTML === 'O' && this.turn < 5) {
            randomNumber = Math.floor(Math.random() * 9);
        }
        this.plays[randomNumber].removeEventListener('click', this.playerMoveGlobal)
        this.plays[randomNumber].innerHTML = token;
        this.plays[randomNumber].classList.remove('playable');
        this.checker("comp");
        console.log(this.turn)
    }
    checker(who: string) {
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
            setTimeout(() => {
                this.reset('You win !')
            }, 1000);
            // Lose condition
        } else if ((who === "comp")
            && ((this.plays[0].innerHTML === this.aiToken && this.plays[1].innerHTML === this.aiToken && this.plays[2].innerHTML === this.aiToken)
                || (this.plays[3].innerHTML === this.aiToken && this.plays[4].innerHTML === this.aiToken && this.plays[5].innerHTML === this.aiToken)
                || (this.plays[6].innerHTML === this.aiToken && this.plays[7].innerHTML === this.aiToken && this.plays[8].innerHTML === this.aiToken)
                || (this.plays[0].innerHTML === this.aiToken && this.plays[3].innerHTML === this.aiToken && this.plays[6].innerHTML === this.aiToken)
                || (this.plays[1].innerHTML === this.aiToken && this.plays[4].innerHTML === this.aiToken && this.plays[7].innerHTML === this.aiToken)
                || (this.plays[2].innerHTML === this.aiToken && this.plays[5].innerHTML === this.aiToken && this.plays[8].innerHTML === this.aiToken)
                || (this.plays[0].innerHTML === this.aiToken && this.plays[4].innerHTML === this.aiToken && this.plays[8].innerHTML === this.aiToken)
                || (this.plays[2].innerHTML === this.aiToken && this.plays[4].innerHTML === this.aiToken && this.plays[6].innerHTML === this.aiToken))
        ) {
            this.stopGame = true;
            setTimeout(() => {
                this.reset('You lose !')
            }, 1000);
        }
        // Tie condition
        else if (this.turn === 6) {
            this.stopGame = true;
            setTimeout(() => {
                this.reset('You tied !')
            }, 1000);
        }
    }

    reset(msg: string) {
        // Reset method for modal pop after game has finished
        this.playX.classList.add("hidden");
        this.playO.classList.add("hidden");
        this.modalToggle.classList.remove('hidden')
        this.message.textContent = msg;
        this.message.classList.remove("hidden");
        this.dark.classList.remove("hidden");
        setTimeout(function () {
            location.reload()
        }, 1500);
    }
}