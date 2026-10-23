---
format: longclaw.ticket/v1
id: 62d3eb94-97af-4b57-a9bc-5cf60830ba97
key: AIB-86f
title: GitHub AI filter misses agent-focused repos
status: done
priority: p2
type: feature
created_at: 2026-10-10T23:54:54.586Z
updated_at: 2026-10-17T17:47:31.935Z
---

On Issue #13 (AIB-84e) the GitHub trending AI filter passed only 2 of 13 repos. It dropped clearly AI repos whose only signal is the word "agent", which `packages/fetchers/aibytes_fetchers/sources/github.py` deliberately skips (user-agent, monitoring agents):

- mattpocock/skills: "Skills for Real Engineers. Straight from my .agents directory."
- heygen-com/hyperframes: "Write HTML. Render video. Built for agents."
- earthtojake/text-to-cad: "Give your agent CAD superpowers."
- cursor/plugins: "Cursor plugin specification and official plugins"
- ranxianglei/billion-context: "A context-compression plugin for small context windows"

The publisher added them to the week-41 snapshot by hand. Widen the patterns, for example "for agents", "your agent", ".agents", "skills", "context window" and known AI-tool owners like cursor, without letting through user-agent or monitoring-agent repos.

## Checklist

- [x] Add patterns that catch the five repos above <!-- longclaw:item=ck_de3f8f12 -->
- [x] Add negative cases (user-agent, monitoring agents) to tests/test_ai_filters.py <!-- longclaw:item=ck_f83b1ed3 -->
- [x] Test suite passes; commit and open a PR <!-- longclaw:item=ck_fadd0fe6 -->

## Activity

<!-- longclaw:event
id: evt_9bfd5ab7
kind: create
occurred_at: 2026-10-10T23:54:54.586Z
actor:
  type: agent
  id: claude-code
  name: Claude Code
-->
### Claude Code created this ticket
<!-- /longclaw:event -->

<!-- longclaw:event
id: evt_12eaad31
kind: update
occurred_at: 2026-10-17T17:47:31.935Z
actor:
  type: agent
  id: claude-code
  name: Claude Code
changes:
  - field: status
    from: todo
    to: done
  - field: checklist.ck_de3f8f12.checked
    from: "false"
    to: "true"
  - field: checklist.ck_f83b1ed3.checked
    from: "false"
    to: "true"
  - field: checklist.ck_fadd0fe6.checked
    from: "false"
    to: "true"
-->
### Claude Code updated this ticket

Widened the GitHub AI filter in sources/github.py: 'for/with agents', 'your agent' (not 'your SSH agent' or 'your build agents'), a .agents directory, context window/compression/engineering, text-to-cad/3d, and vendor owners (cursor, anthropics, openai, google-gemini, huggingface, mistralai, ollama). Tests cover the five Issue #13 repos plus morluto/rea, and negatives for user-agent, SSH agent, build agents and two non-AI 'cursor' repos. Offline suite: 395 tests OK (5 skipped). Re-fetching week-42 now keeps 7 of the 10 trending repos instead of 3, and still drops ghidra, artcraft and AnyPS5. Fixed on the Issue #14 branch (AIB-104a).
<!-- /longclaw:event -->
