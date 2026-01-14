---
description: "Mark a task as complete (usage: /complete-task <task-id>)"
---

## Instructions

Mark task **$ARGUMENTS** as complete.

1. **Read PLAN.md** to locate the task with ID $ARGUMENTS
2. **Validate** the task exists and is in `in-progress` status `[~]`
3. **Update PLAN.md**: Change task status from `[~]` to `[x]`
4. **Read PROGRESS.md** to get the active session details
5. **Update PROGRESS.md**:
   - Move the Active Session content to Session History (prepend to existing history)
   - Update the outcome and add completion notes
   - Reset Active Session to empty state
   - Format for Session History entry:

```
### [YYYY-MM-DD]

#### Session: $ARGUMENTS - [task description]
**Duration:** [start time from active session] - [current time]
**Outcome:** Completed

- [Summary of what was accomplished based on conversation context]

---
```

6. **Reset Active Session** to:

```
## Active Session

_No active session. Use `/start-task <id>` to begin._
```

7. **Recommend next task** - Find the next `[ ]` todo item in the current phase and suggest it

## Error Handling

- If task ID doesn't exist in PLAN.md, inform the user
- If task is not `[~]` in-progress, inform the user of its current status
- If PROGRESS.md has no active session, warn that no session was tracked
