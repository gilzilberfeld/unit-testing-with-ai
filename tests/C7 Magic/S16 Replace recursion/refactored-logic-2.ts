import { GameState } from '../../app/logic/GameState';
import { Move } from '../../app/logic/Move';

/**
 * Iterative (non-recursive) Towers of Hanoi logic for 3-5 towers and 3-6 disks.
 * Uses an explicit stack to simulate recursion for move generation.
 */
export class RefactoredLogic2 {
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
    this.generateAllMovesIterative();
  }

  private initializeTowers(): void {
    for (let i = this.numDisks; i >= 1; i--) {
      this.towers[0].push(i);
    }
  }

  private generateAllMovesIterative(): void {
    // Always use the last tower as the destination
    const destinationTower = this.numTowers - 1;
    this.iterativeGenerateMoves(this.numDisks, 0, destinationTower, 1);
  }

  /**
   * Iterative move generation using an explicit stack to simulate recursion.
   * Handles both 3-tower and 4/5-tower cases.
   */
  private iterativeGenerateMoves(n: number, from: number, to: number, aux: number): void {
    type Frame = { n: number; from: number; to: number; aux: number; state: number };
    const stack: Frame[] = [];
    stack.push({ n, from, to, aux, state: 0 });

    while (stack.length > 0) {
      const frame = stack.pop()!;
      const { n, from, to, aux } = frame;

      if (n === 1) {
        this.moves.push({ from, to, disk: 1 });
        continue;
      }

      if (this.numTowers > 3 && n > 2) {
        // Frame-Stewart heuristic for more than 3 towers
        const k = Math.floor(n / 2);
        const nextAux = this.findBestAuxTower(from, to, aux);
        // Simulate recursion: push in reverse order
        stack.push({ n: k, from: nextAux, to, aux, state: 0 });
        stack.push({ n: n - k, from, to, aux, state: 0 });
        stack.push({ n: k, from, to: nextAux, aux, state: 0 });
      } else {
        // Classic 3-tower algorithm
        // Simulate recursion: push in reverse order
        stack.push({ n: n - 1, from: aux, to, aux: from, state: 0 });
        stack.push({ n: 1, from, to, aux, state: 0 });
        stack.push({ n: n - 1, from, to: aux, aux: to, state: 0 });
      }
    }
  }

  private findBestAuxTower(from: number, to: number, currentAux: number): number {
    for (let i = 0; i < this.numTowers; i++) {
      if (i !== from && i !== to && i !== currentAux) {
        return i;
      }
    }
    return currentAux;
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
