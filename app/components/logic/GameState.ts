import { Move } from './Move';

export interface GameState {
    towers: number[][];
    currentMove?: Move;
    isAnimating: boolean;
}
