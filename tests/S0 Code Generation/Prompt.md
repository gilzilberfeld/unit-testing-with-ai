### Generating the code

# Part 1

Create code in typescript. A React component that Shows the Towers Of Hanoi simulation.

3 towers, left tower is full with 5 levels, other towers are empty.
The component should have a "Reset" button.

Should have a "Start" button, that starts to show the next steps. Use animation to show the transition of each steps. Each step is 300ms apart.

Should have a "Stop" Button that stops the animation.

Separate the logic into a separate class. The class should have a _NextStep_ method that returns the state of the next state.

Component should also have the title "Towers of Hanoi". Next it shows "Current temperature in Hanoi", and get it from a free weather API.

# Part 2

Modify the code to have between 3-5 towers and between 3-6 rings on each tower. Pass them as props.

# Part 3

Write another code that set the towers and disks that sits in the page. it will sit on top of the towers component. There will be a "Set" button that will update the props in the component.
