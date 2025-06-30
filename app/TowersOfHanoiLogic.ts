import { GameState } from './GameState';
import { Move } from './Move';

export class TowersOfHanoiLogic {
  private towers: number[][];
  private moves: Move[];
  private currentMoveIndex: number;
  private numTowers: number;

  constructor(numDisks: number = 5, numTowers: number = 3) {
    this.numTowers = Math.max(3, Math.min(5, numTowers)); // Clamp between 3-5
    this.towers = [];
    this.moves = [];
    this.currentMoveIndex = 0;
    this.reset(numDisks);
  }

  reset(numDisks: number = 5): void {
    const clampedDisks = Math.max(3, Math.min(6, numDisks)); // Clamp between 3-6
    this.towers = Array(this.numTowers).fill(null).map(() => []);
    this.moves = [];
    this.currentMoveIndex = 0;
    
    // Initialize first tower with disks (largest to smallest)
    for (let i = clampedDisks; i >= 1; i--) {
      this.towers[0].push(i);
    }
    
    // Generate all moves (for 3+ towers, we use the last tower as destination)
    const destinationTower = this.numTowers - 1;
    this.generateMoves(clampedDisks, 0, destinationTower, 1);
  }

  private generateMoves(n: number, from: number, to: number, aux: number): void {
    if (n === 1) {
      this.moves.push({ from, to, disk: 1 });
      return;
    }
    
    // For towers with more than 3 pegs, we can optimize by using additional auxiliary towers
    if (this.numTowers > 3 && n > 2) {
      // Use multiple auxiliary towers for better efficiency
      const k = Math.floor(n / 2);
      const nextAux = this.findBestAuxTower(from, to, aux);
      
      this.generateMoves(k, from, nextAux, aux);
      this.generateMoves(n - k, from, to, aux);
      this.generateMoves(k, nextAux, to, aux);
    } else {
      // Standard 3-tower algorithm
      this.generateMoves(n - 1, from, aux, to);
      this.moves.push({ from, to, disk: n });
      this.generateMoves(n - 1, aux, to, from);
    }
  }

  private findBestAuxTower(from: number, to: number, currentAux: number): number {
    // Find an auxiliary tower that's not the source, destination, or current aux
    for (let i = 0; i < this.numTowers; i++) {
      if (i !== from && i !== to && i !== currentAux) {
        return i;
      }
    }
    return currentAux; // Fallback
  }

  nextStep(): GameState | null {
    if (this.currentMoveIndex >= this.moves.length) {
      return null; // No more moves
    }

    const move = this.moves[this.currentMoveIndex];
    const disk = this.towers[move.from].pop();
    
    if (disk !== undefined) {
      this.towers[move.to].push(disk);
      this.currentMoveIndex++;
      
      return {
        towers: this.towers.map(tower => [...tower]),
        currentMove: move,
        isAnimating: true
      };
    }
    
    return null;
  }

  getCurrentState(): GameState {
    return {
      towers: this.towers.map(tower => [...tower]),
      isAnimating: false
    };
  }

  isComplete(): boolean {
    return this.currentMoveIndex >= this.moves.length;
  }

  getTotalMoves(): number {
    return this.moves.length;
  }

  getCurrentMoveIndex(): number {
    return this.currentMoveIndex;
  }
}