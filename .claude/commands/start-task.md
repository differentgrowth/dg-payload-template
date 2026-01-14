---
description: "Start a task from PLAN.md by ID (usage: /start-task <task-id>)"
---

## Instructions

Start working on task **$ARGUMENTS** from PLAN.md.

1. **Read PLAN.md** to locate the task with ID $ARGUMENTS
2. **Validate** the task exists and is in `todo` status `[ ]`
3. **Update PLAN.md**: Change task status from `[ ]` to `[~]`
4. **Update PROGRESS.md**: Replace the Active Session section with:

```
## Active Session

**Started:** [current date/time in YYYY-MM-DD HH:MM format]
**Task:** $ARGUMENTS - [task description from PLAN.md]
**Status:** In Progress

### Notes
- Session started
```

5. **Begin implementation** following CLAUDE.md conventions
6. **Use TodoWrite** to break down the task into subtasks

## Error Handling

- If task ID doesn't exist in PLAN.md, inform the user and list available tasks
- If task is already `[~]` in-progress, inform the user it's already active
- If task is already `[x]` done, inform the user it's already completed
- If task is `[!]` blocked, inform the user and show any blocking notes
