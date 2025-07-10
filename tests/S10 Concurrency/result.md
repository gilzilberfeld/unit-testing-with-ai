# Concurrency Issues

There are no explicit concurrency issues in the current `TowersOfHanoiLogic` class as written. The class is designed for single-threaded, synchronous use in a typical JavaScript/TypeScript environment (such as React). All state changes (like moving disks or generating moves) happen synchronously and are not shared across threads.

However, if you use this logic in a multi-threaded or asynchronous context (e.g., with Web Workers or concurrent React state updates), you could encounter issues such as:

- Two calls to `nextStep()` at the same time, causing race conditions in updating `towers` and `currentMoveIndex`.
- Simultaneous calls to `reset()` and `nextStep()`.

In a standard React app, these are not a concern unless you intentionally introduce concurrency.

---

## Test Cases to Check

1. **Basic Functionality**

   - Solving the puzzle for 3 towers and 3 disks (classic case).
   - Solving for 4 and 5 towers, and for 4, 5, 6 disks.

2. **Edge Cases**

   - Minimum and maximum allowed towers/disks (3/3 and 5/6).
   - Out-of-bounds values (e.g., 2 towers, 7 disks) to ensure clamping works.
   - Negative or zero values for towers/disks.

3. **Move Generation**

   - The total number of moves matches the expected minimum for given towers/disks.
   - The sequence of moves is valid (no illegal moves, e.g., larger disk on smaller).

4. **State Consistency**

   - After each `nextStep()`, the state of the towers is valid.
   - After all moves, the puzzle is complete and all disks are on the destination tower.

5. **Reset Behavior**

   - After calling `reset()`, the state returns to the initial configuration.

6. **No Moves Left**

   - Calling `nextStep()` after completion returns `null` and does not alter state.

7. **Auxiliary Tower Selection**

   - For 4+ towers, ensure `findBestAuxTower` never returns the source, destination, or current auxiliary.

8. **Immutability**
   - Returned states from `getCurrentState()` are not mutated by subsequent moves.

---

If you want to test for concurrency, you would need to simulate or mock concurrent calls, but this is not typical for this logic in a React app.
