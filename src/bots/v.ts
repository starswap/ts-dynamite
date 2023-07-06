import { Gamestate, BotSelection } from '../models/gamestate';

const MAX_DYNAMITE = 100;
const MAX_TURNS = 2500;
const PTS_TO_WIN = 1000;

// Excluding maximum
function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}  

function getRandomChoice(list: any[]) {
    return list[getRandomInt(list.length)]
}

class Bot {
    private dyn_turns: number[]; // turn indices where we will use dynamite
    private turn_number = 0;
    private dyn_pointer = 0;     // points to next dynamite usage

    constructor() {
        // Populate dynamite turns
        this.dyn_turns = [];
        for (let i = 0; i < MAX_DYNAMITE; ++i) {
            let next = getRandomInt(PTS_TO_WIN);
            while (this.dyn_turns.includes(next)) { // ensure distinct turns
                next = getRandomInt(PTS_TO_WIN);
            }
            this.dyn_turns.push(next);
        }

        // Get them in order so pointer method works
        this.dyn_turns.sort((n1,n2) => n1 - n2);
    }

    makeMove(gamestate: Gamestate): BotSelection {
        this.turn_number++;
        if (this.turn_number == this.dyn_turns[this.dyn_pointer]) { // planned to use dynamite
            this.dyn_pointer++;
            return 'D';
        } else {
            return getRandomChoice(['R','P','S']) // otherwise don't use dynamite
        }
    }
}

export = new Bot();
