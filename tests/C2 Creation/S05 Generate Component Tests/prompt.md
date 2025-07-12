# Prompt

Implement in a separate file the 2 tests following test cases:

1. For the TowerComponent create a list of test cases. Don't generate code.
2. Should update the UI after each move (disks move between towers)

-> Jest test, .ts
Update it to use vitest

-> React is NOT Defined
Added "import React from "react";"

-> document is not defined
The error occurs because the test is running in a Node environment without a DOM, so you need to use a DOM environment like jsdom for your tests.

Configure Vitest to use JSDOM as a DOM environment
-> Test Error: Error: Cannot find package 'jsdom' imported

Installed jsdom

-> First test passed, 2nd timed-out

Fix: Increase timeout
Still fails.
