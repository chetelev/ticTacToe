import { GamePlay } from './gamePlay';

export class Game {

    // Variable declaration
    private modalToggle: HTMLElement;
    private playX: HTMLElement;
    private playO: HTMLElement;
    private playerToken: string;
    private aiToken: string;
    private play: GamePlay;

    constructor() {
        // DOM Selectors
        this.modalToggle = document.getElementById('dark');
        this.playX = document.getElementById('playX');
        this.playO = document.getElementById('playO');
        this.startGame();
    }

    startGame = (): void => {
        this.play = new GamePlay();
        // Modal trigger and choose sign    
        this.modalToggle.classList.remove('hidden');
        this.playX.addEventListener('click', () => {
            this.modalToggle.classList.add('hidden');
            this.playerToken = 'X';
            this.aiToken = 'O';
            this.play.turn = 0
            this.play.cellEventListener(this.playerToken, this.aiToken);
        });
        this.playO.addEventListener('click', () => {
            this.modalToggle.classList.add('hidden');
            this.playerToken = 'O';
            this.aiToken = 'X';
            this.play.turn = 0;
            this.play.cellEventListener(this.playerToken, this.aiToken);
        });
    }
}
export default new Game()