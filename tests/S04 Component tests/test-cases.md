# TowersOfHanoi Component Test Cases

## Rendering & Initialization

- [ ] Should render the correct number of towers based on `numTowers` prop (3, 4, 5)
- [ ] Should render the correct number of disks based on `numDisks` prop (3–6)
- [ ] Should clamp `numTowers` and `numDisks` props to allowed ranges
- [ ] Should display the initial state with all disks on the first tower

## Game Controls

- [ ] Should start the animation when "Start" is clicked
- [ ] Should stop the animation when "Stop" is clicked
- [ ] Should reset the puzzle when "Reset" is clicked
- [ ] Should disable "Start" when the puzzle is running or complete
- [ ] Should disable "Stop" when the puzzle is not running

## Game Logic & State

- [ ] Should update the UI after each move (disks move between towers)
- [ ] Should show the correct move count as the puzzle progresses
- [ ] Should display the "Puzzle Completed" message when finished
- [ ] Should not allow moves after completion

## Weather Integration

- [ ] Should display loading state while fetching weather
- [ ] Should display weather data when fetch succeeds
- [ ] Should display fallback/sample weather data on fetch error
- [ ] Should show error message if weather fetch fails

## Accessibility & Responsiveness

- [ ] Should have accessible button labels and roles
- [ ] Should render correctly on different screen sizes

## Edge Cases

- [ ] Should handle rapid clicking of Start/Stop/Reset without crashing
- [ ] Should handle prop changes (numTowers/numDisks) during an active game
- [ ] Should not mutate internal state when props change
