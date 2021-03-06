export class Reset {
    // Variable declaration
    private modalToggle: HTMLElement;
    private playX: HTMLElement;
    private playO: HTMLElement;
    private plays: NodeListOf<HTMLElement>;
    private message: HTMLElement;
    private dark: HTMLElement;

    constructor() {
        // DOM Selectors
        this.modalToggle = document.getElementById('dark');
        this.playX = document.getElementById('playX');
        this.playO = document.getElementById('playO');
        this.plays = document.querySelectorAll(".cell");
        this.message = document.getElementById('message');
        this.dark = document.getElementById('dark');
    }

    reset = (msg: string): void => {
        // Reset method for modal pop after game has finished
        this.playX.classList.add("hidden");
        this.playO.classList.add("hidden");
        this.modalToggle.classList.remove('hidden')
        this.message.textContent = msg;
        this.message.classList.remove("hidden");
        this.dark.classList.remove("hidden");
        setTimeout(this.hideModal, 1500);
    }

    hideModal = () => {
        this.playX.classList.remove("hidden");
        this.playO.classList.remove("hidden");
        this.message.classList.add("hidden");
        this.plays.forEach(e => {
            e.innerHTML = '';
            e.classList.add('playable')
        });
    }

}