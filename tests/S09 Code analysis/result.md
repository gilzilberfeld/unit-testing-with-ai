# How the Algorithm Works

The `TowersOfHanoiLogic` class implements the Towers of Hanoi puzzle for 3 to 5 towers (pegs) and 3 to 6 disks. The main logic is in the `generateMoves` method, which recursively generates the sequence of moves needed to solve the puzzle.

- **Initialization**: The constructor clamps the number of towers and disks to valid ranges, initializes the towers, and calls `reset` to set up the initial state and generate the move list.
- **Move Generation**:
  - For 3 towers, it uses the classic recursive algorithm:
    1. Move `n-1` disks from source to auxiliary.
    2. Move the largest disk to the destination.
    3. Move `n-1` disks from auxiliary to destination.
  - For more than 3 towers, it tries to optimize by splitting the disks and using additional auxiliary towers. It uses `findBestAuxTower` to pick an auxiliary tower that is not the source, destination, or current auxiliary.
- **Move Execution**: The `nextStep` method pops the next move from the list and updates the towers accordingly.
- **State Queries**: Methods like `getCurrentState`, `isComplete`, `getTotalMoves`, and `getCurrentMoveIndex` provide information about the current puzzle state.

## Edge Cases

- **Number of Towers**: The number of towers is clamped between 3 and 5. If a value outside this range is provided, it defaults to the nearest valid value.
- **Number of Disks**: The number of disks is clamped between 3 and 6. Out-of-bounds values are adjusted accordingly.
- **Auxiliary Tower Selection**: The `findBestAuxTower` method ensures that the auxiliary tower is not the source, destination, or current auxiliary. If no suitable tower is found, it falls back to the current auxiliary.
- **Move List Exhaustion**: If `nextStep` is called after all moves are completed, it returns `null`.
- **Empty Tower Pop**: If a move tries to pop from an empty tower (should not happen with correct logic), it safely does nothing.
