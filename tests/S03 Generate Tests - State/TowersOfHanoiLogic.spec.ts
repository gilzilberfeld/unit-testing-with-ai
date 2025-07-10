import { describe, it, expect } from 'vitest';
import { TowersOfHanoiLogic } from '../../app/logic/TowersOfHanoiLogic';

describe('TowersOfHanoiLogic - getCurrentState', () => {
  it('should return correct initial state', () => {
    const logic = new TowersOfHanoiLogic(4, 3);
    const state = logic.getCurrentState();
    expect(state.towers).toEqual([[4,3,2,1], [], []]);
    expect(state.isAnimating).toBe(false);
  });

  it('should reflect state after several moves', () => {
    const logic = new TowersOfHanoiLogic(3, 3);
    logic.nextStep(); // Move 1
    logic.nextStep(); // Move 2
    const state = logic.getCurrentState();
    // The state should reflect the moves made
    expect(state.towers.flat().length).toBe(3);
    expect(state.isAnimating).toBe(false);
  });

  it('should not mutate internal towers array', () => {
    const logic = new TowersOfHanoiLogic(3, 3);
    const state = logic.getCurrentState();
    state.towers[0].push(99); // Mutate returned array
    // Internal state should not be affected
    const state2 = logic.getCurrentState();
    expect(state2.towers[0]).not.toContain(99);
  });
});
