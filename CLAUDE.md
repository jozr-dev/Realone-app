# CLAUDE.md - Project Instructions for Claude Code

This file provides project-specific guidance for Claude Code. Update this file whenever Claude does something incorrectly so it learns not to repeat mistakes.

## Project Overview

**Real One** — PWA accountability companion. Chase is the AI personality.

- Single `index.html` file (~2200 lines), vanilla JS
- GitHub Pages frontend, Railway Node.js backend
- No build step, no framework, no bundler

## Critical Code Rules

Never break these. These exist because bugs were already fixed here.

- All onboarding button clicks route through `handleOnboardingFreeText()` — NOT `handleOnboardingMessage()`
- Confession question is hardcoded — no API call after mode selection
- `sw.js` path must be `./sw.js` not `/sw.js` — GitHub Pages subdirectory deployment
- `resetDailyCountIfNeeded()` must only be called in `sendMessage()` and `launchApp()` — never inside query or render functions
- State fields `dailyMessageCount`, `lastMessageDate`, `cooldownUntil`, `bonusUsed`, `isPaid` must be preserved from localStorage on `window.onload` — never overwritten by default state

## Chase Voice Rules

Chase is the AI personality. Always write in his voice:

- Lowercase always, casual texting style
- NEVER use em dashes (—) — `cleanResponse()` strips them but avoid generating them
- NEVER use bullet points in responses
- Max 3 short lines per response
- One question per message max
- No corporate language, no therapy speak

## Development Workflow

1. Edit in VS Code
2. Test at `localhost:5500` via Live Server
3. Deploy: `git add . && git commit -m "description" && git push`
4. Never edit `index.html` in Notepad or GitHub pencil edit

## Commands Reference

```sh
# Deploy
git add . && git commit -m "description" && git push

# Check state
git status
git diff
```

## Self-Improvement

After every correction from Josue, update this CLAUDE.md with the lesson learned. Never repeat the same mistake twice. Add new rules under Critical Code Rules when bugs are fixed.

End corrections with: "Now update CLAUDE.md so you don't make that mistake again."

## Working with Plan Mode

- Start every complex task in plan mode (shift+tab to cycle)
- Pour energy into the plan so Claude can 1-shot the implementation
- When something goes sideways, switch back to plan mode and re-plan — don't keep pushing

## Parallel Work

- For tasks that need more compute, use subagents to work in parallel
- Only one agent should edit `index.html` at a time
- For fully parallel workstreams, use git worktrees:
  `git worktree add .claude/worktrees/<name> origin/main`

## Things Claude Should NOT Do

- Don't refactor working code unless explicitly asked
- Don't add features beyond what was asked
- Don't touch state initialization logic without re-reading the localStorage preservation rules above
- Don't change `sw.js` registration path without checking GitHub Pages subdirectory behavior
- Don't generate Chase responses with em dashes or bullet points

## Project-Specific Patterns

<!-- Add patterns as they emerge -->

---

## End of Session Checklist

Before every commit:
- Run a techdebt scan (dead code, unused functions, leftover console.logs, debug artifacts)
- Fix all dead code and debug logs before pushing to production
- Never ship `console.log`, `DEBUG:` prefixes, or no-op functions to main

## Intentionally Unwired Code

- `detectPatterns()` — left unwired on purpose. It detects cause-effect patterns from conversation history and feeds `state.patterns`. Will be connected in Phase 3. Do not remove it.

---

_Update this file continuously. Every mistake is a learning opportunity._
