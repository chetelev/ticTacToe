export class Game {
    private modalToggle: HTMLElement;
    private playX: HTMLElement;
    private playO: HTMLElement;
    private app: HTMLElement;
    private target: HTMLElement
    private plays: NodeListOf<HTMLElement>;
    private canPlay: boolean;

    constructor() {
        this.modalToggle = document.getElementById('dark');
        this.playX = document.getElementById('playX')
        this.playO = document.getElementById('playO')
        this.plays = document.querySelectorAll(".cell");
        this.canPlay = false;
        this.startGame();
    }

    startGame() {
        this.canPlay = true;
        this.modalToggle.classList.remove('hidden');
        this.playX.addEventListener('click', () => {
            this.modalToggle.classList.add('hidden');
            this.playerMove('X');
        });
        this.playO.addEventListener('click', () => {
            this.modalToggle.classList.add('hidden');
            this.playerMove('O');
        });
    }

    playerMove(token: string) {
        this.app = document.getElementById('app')
        this.app.addEventListener('click', (e) => {
            if (this.canPlay) {
                this.target = e.target as HTMLElement;
                this.target.innerHTML = token;
                this.target.classList.remove('playable')
                this.target.setAttribute('disabled', 'true')
                this.aiMove('O');
            }
        })
    }

    aiMove(token: string) {
        let randIndex: number = Math.floor(Math.random() * this.plays.length);
        while (this.plays[randIndex].innerHTML === 'X' || this.plays[randIndex].innerHTML === 'O') {
            randIndex = Math.floor(Math.random() * this.plays.length);
        }
        this.plays[randIndex].innerHTML = token;
        this.plays[randIndex].classList.remove('playable');
        //this.checker.checker();
        //this.plays[randIndex].classList.add('class-' + compSign);
    }

    checker(checker: string) {

    }

}