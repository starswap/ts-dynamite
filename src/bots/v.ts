import { Gamestate, BotSelection } from '../models/gamestate';

const MAX_DYNAMITE = 100;
const MAX_TURNS = 2500;
const PTS_TO_WIN = 1000;
const TIE_THRESHOLD = 3;

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

function counter(x: BotSelection) {
    if (x == 'W') {
        return getRandomChoice(['R','P','S']) // otherwise don't use dynamite
    } else if (x == 'D') {
        return 'W';
    } else if (x == 'R') {
        return 'P';
    } else if (x == 'S') {
        return 'R';
    } else if (x == 'P') {
        return 'S';
    }
}

// idea:
// deduce the tie resolution strategy -> create a massive long tie -> play counter just before the end -> win the points
// if you aren't able to confidently deduce it then you fail

// dependent on the score you have - take risks

// copy them until you don't know what they are about to do
// then you play dynamite

// tuning: tune the exploration phase
// tune the  closeToEnd()
// if it overwrites, conclude that we are not sure - deal with randomness somehow


class Bot {
    private turn_number = 0;
    private dyn_used = 0;     // points to next dynamite usage
    private prev_score = 0;
    private expected_moves: BotSelection[] = new Array(MAX_TURNS).fill(undefined);
    private in_exploration_phase = true;
    private my_score = 0;
    private opponent_score = 0;

    getTurnScore(gamestate: Gamestate) {
        return gamestate.rounds.reverse().takeWhile(({p1: p1, p2: p2}) => p1 == p2).length + 1;
    }

    closeToEnd() {
        return this.turn_number > 1900;
    }

    makeMove(gamestate: Gamestate): BotSelection {
        let result;
        this.turn_number++;

        if (gamestate.rounds.length >= 1) {
            this.expected_moves[this.prev_score] = gamestate.rounds[gamestate.rounds.length - 1].p2; // what we expect them to do
        }

        const turnScore = this.getTurnScore(gamestate);
        this.prev_score = turnScore;
        
        if (turnScore >= TIE_THRESHOLD) {
            if ((!this.closeToEnd() && this.expected_moves[turnScore + 1] != undefined) || this.in_exploration_phase) { // keep chaining or we are exploring
                if (this.expected_moves[turnScore] != undefined) { // we know what they are about to do
                    result = this.expected_moves[turnScore]; // copy
                    console.log("a")
                } else if (this.expected_moves[turnScore - 1] == this.expected_moves[turnScore - 2] && this.expected_moves[turnScore - 2] == this.expected_moves[turnScore - 3] && this.expected_moves[turnScore - 1] != undefined)  { /// or we can guess 
                    result = this.expected_moves[turnScore - 1]; // copy
                    console.log("b")
                } else { // don't know but are exploring: dynamite
                    result = 'D';
                    console.log("c")
                }
                this.in_exploration_phase = (this.turn_number <= 500); // decide if we need to leave the exploration phase
            } else { // at the end and not exploiting
                if (this.expected_moves[turnScore] == undefined) { // need to end this - just play dynamite
                    result = 'D';
                } else {
                    result = counter(this.expected_moves[turnScore]); // play counter and claim the pointers
                }
                // console.log(this.expected_moves[turnScore])
                // console.log(this.turn_number)
                // console.log("d")
            }
        } else {
            return getRandomChoice(['R','P','S']) // otherwise don't use dynamite
        }

        if (result == 'D') {
            if (this.dyn_used == MAX_DYNAMITE) {
                return 'W';
            } else {
                this.dyn_used++;
            }
        }
        console.log(result)
        return result;
    }
}

export = new Bot();
