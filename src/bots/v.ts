import { Gamestate, BotSelection } from '../models/gamestate';

const MAX_DYNAMITE = 100;
const MAX_TURNS = 2500;
const PTS_TO_WIN = 1000;
const USE_DYNAMITE_THRESH = 3;

declare global {
    interface Array<T> {
        takeWhile(fn: (a: T) => boolean): Array<T>;
    }
}

Array.prototype.takeWhile = function<T>(fn: (a: T) => boolean) {
    let results: T[] = [];
    for (const t of this) {
        if (fn(t)) {
            results.push(t);
        } else {
            break;
        }
    }
    return results;
}

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
    private dyn_used = 0;     // points to next dynamite usage

    getTurnScore(gamestate: Gamestate) {
        return gamestate.rounds.reverse().takeWhile(({p1: p1, p2: p2}) => p1 == p2).length + 1;
    }

    makeMove(gamestate: Gamestate): BotSelection {
        if (this.getTurnScore(gamestate) >= USE_DYNAMITE_THRESH && this.dyn_used < MAX_DYNAMITE) {
            this.dyn_used++;
            return 'D';
        } else {
            return getRandomChoice(['R','P','S']) // otherwise don't use dynamite
        }
    }
}

export = new Bot();
