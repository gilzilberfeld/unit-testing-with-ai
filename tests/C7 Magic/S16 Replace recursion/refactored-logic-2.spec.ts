import { describe, it, expect } from 'vitest';
import { RefactoredLogic2 } from './refactored-logic-2';

describe('RefactoredLogic - getCurrentState', () => {
  it('should return correct initial state', () => {
    const logic = new RefactoredLogic2(4, 3);
    const state = logic.getCurrentState();
    expect(state.towers).toEqual([[4,3,2,1], [], []]);
    expect(state.isAnimating).toBe(false);
  });

  it('should reflect state after several moves', () => {
    const logic = new RefactoredLogic2(3, 3);
    logic.nextStep(); // Move 1
    logic.nextStep(); // Move 2
    const state = logic.getCurrentState();
    // The state should reflect the moves made
    expect(state.towers.flat().length).toBe(3);
    expect(state.isAnimating).toBe(false);
  });

  it('should not mutate internal towers array', () => {
    const logic = new RefactoredLogic2(3, 3);
    const state = logic.getCurrentState();
    state.towers[0].push(99); // Mutate returned array
    // Internal state should not be affected
    const state2 = logic.getCurrentState();
    expect(state2.towers[0]).not.toContain(99);
  });
});
