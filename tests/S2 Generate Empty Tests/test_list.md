<!-- filepath: c:\GitHub\Webinars\unit-testing-with-ai\test_todo.md -->

### TowersOfHanoiLogic Unit Test Cases

#### Constructor
- [ ] should initialize with default disks and towers
- [ ] should clamp number of towers to minimum (3)
- [ ] should clamp number of towers to maximum (5)
- [ ] should initialize with custom number of disks and towers

#### reset()
- [ ] should reset to default state
- [ ] should clamp number of disks to minimum (3)
- [ ] should clamp number of disks to maximum (6)
- [ ] should reset after some moves have been made

#### nextStep()
- [ ] should perform the next move correctly
- [ ] should return null when all moves are done
- [ ] should update towers state after a move
- [ ] should increment currentMoveIndex after a move

#### getCurrentState()
- [ ] should return correct initial state
- [ ] should reflect state after several moves
- [ ] should not mutate internal towers array

#### isComplete()
- [ ] should return false before all moves are done
- [ ] should return true after all moves are done

#### getTotalMoves()
- [ ] should return correct number of moves for 3 disks, 3 towers
- [ ] should return correct number of moves for 6 disks, 5 towers

#### getCurrentMoveIndex()
- [ ] should return 0 initially
- [ ] should increment after each move
- [ ] should not exceed total moves

#### Edge/Boundary Cases
- [ ] should handle minimum allowed disks and towers
- [ ] should handle maximum allowed disks and towers

#### State Consistency
- [ ] should not allow illegal moves (larger disk on smaller)
- [ ] should preserve move history after reset

#### Move Generation
- [ ] should generate optimal moves for 3 towers
- [ ] should generate moves using extra towers for 4+ towers
