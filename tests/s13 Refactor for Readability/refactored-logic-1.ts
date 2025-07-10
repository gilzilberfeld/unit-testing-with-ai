import { GameState } from '../../app/logic/GameState';
import { Move } from '../../app/logic/Move';

/**
 * Refactored TowersOfHanoiLogic for improved readability and maintainability.
 */
export class RefactoredLogic1 {
  private towers: number[][] = [];
  private moves: Move[] = [];
  private currentMoveIndex = 0;
  private numTowers: number;
  private numDisks: number;

  constructor(numDisks: number = 5, numTowers: number = 3) {
    this.numTowers = this.clamp(numTowers, 3, 5);
    this.numDisks = this.clamp(numDisks, 3, 6);
    this.reset(this.numDisks);
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  reset(numDisks: number = 5): void {
    this.numDisks = this.clamp(numDisks, 3, 6);
    this.towers = Array.from({ length: this.numTowers }, () => []);
    this.moves = [];
    this.currentMoveIndex = 0;
    this.initializeTowers();
    this.generateAllMoves();
  }

  private initializeTowers(): void {
    // Place all disks on the first tower, largest at the bottom
    for (let i = this.numDisks; i >= 1; i--) {
      this.towers[0].push(i);
    }
  }

  private generateAllMoves(): void {
    // Always use the last tower as the destination
    const destinationTower = this.numTowers - 1;
    this.generateMoves(this.numDisks, 0, destinationTower, 1);
  }

  private generateMoves(n: number, from: number, to: number, aux: number): void {
    if (n === 1) {
      this.moves.push({ from, to, disk: 1 });
      return;
    }
    if (this.numTowers > 3 && n > 2) {
      // Frame-Stewart heuristic for more than 3 towers
      const k = Math.floor(n / 2);
      const nextAux = this.findBestAuxTower(from, to, aux);
      this.generateMoves(k, from, nextAux, aux);
      this.generateMoves(n - k, from, to, aux);
      this.generateMoves(k, nextAux, to, aux);
    } else {
      // Classic 3-tower recursive solution
      this.generateMoves(n - 1, from, aux, to);
      this.moves.push({ from, to, disk: n });
      this.generateMoves(n - 1, aux, to, from);
    }
  }

  private findBestAuxTower(from: number, to: number, currentAux: number): number {
    // Pick an auxiliary tower that's not from, to, or currentAux
    for (let i = 0; i < this.numTowers; i++) {
      if (i !== from && i !== to && i !== currentAux) {
        return i;
      }
    }
    return currentAux; // fallback
  }

  nextStep(): GameState | null {
    if (this.currentMoveIndex >= this.moves.length) return null;
    const move = this.moves[this.currentMoveIndex];
    const disk = this.towers[move.from].pop();
    if (disk !== undefined) {
      this.towers[move.to].push(disk);
      this.currentMoveIndex++;
      return {
        towers: this.towers.map(tower => [...tower]),
        currentMove: move,
        isAnimating: true,
      };
    }
    return null;
  }

  getCurrentState(): GameState {
    return {
      towers: this.towers.map(tower => [...tower]),
      isAnimating: false,
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
