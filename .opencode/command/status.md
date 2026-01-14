---
description: Generate project progress report
---

## Instructions

Generate a progress report by reading PLAN.md and PROGRESS.md.

**Read both files first**, then produce a report with these sections:

### Report Format

```
## Project Status Report

### Current Task
[Active task from PROGRESS.md, or "No active task" if none]
[If active: time elapsed since session start]

### Phase Progress
[Current phase name from PLAN.md]

| Status | Count |
|--------|-------|
| Done | X |
| In Progress | X |
| Todo | X |
| Blocked | X |

Progress: [████████░░] XX%

**Remaining in phase:**
- [ ] TXXX - Task description
- [ ] TXXX - Task description

### Recent Activity
[Last 3 completed sessions from PROGRESS.md Session History]
[Include task ID, date, and brief outcome]

### Recommendations
- **Next task:** [First todo task in current phase]
- **Blocked items:** [Any tasks marked with [!], or "None"]
- **Notes:** [Any observations about project state]
```

## Guidelines

- Count tasks by parsing status symbols: `[ ]`, `[~]`, `[x]`, `[!]`
- Calculate progress as: (done / total in current phase) * 100
- Progress bar uses: `█` for complete, `░` for remaining (10 chars total)
- If no session history exists, say "No completed sessions yet"
- Keep the report concise and scannable
