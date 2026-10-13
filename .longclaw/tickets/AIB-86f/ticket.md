---
format: longclaw.ticket/v1
id: 62d3eb94-97af-4b57-a9bc-5cf60830ba97
key: AIB-86f
title: GitHub AI filter misses agent-focused repos
status: todo
priority: p2
type: feature
created_at: 2026-10-10T23:54:54.586Z
updated_at: 2026-10-10T23:54:54.586Z
---

On Issue #13 (AIB-84e) the GitHub trending AI filter passed only 2 of 13 repos. It dropped clearly AI repos whose only signal is the word "agent", which `packages/fetchers/aibytes_fetchers/sources/github.py` deliberately skips (user-agent, monitoring agents):

- mattpocock/skills: "Skills for Real Engineers. Straight from my .agents directory."
- heygen-com/hyperframes: "Write HTML. Render video. Built for agents."
- earthtojake/text-to-cad: "Give your agent CAD superpowers."
- cursor/plugins: "Cursor plugin specification and official plugins"
- ranxianglei/billion-context: "A context-compression plugin for small context windows"

The publisher added them to the week-41 snapshot by hand. Widen the patterns, for example "for agents", "your agent", ".agents", "skills", "context window" and known AI-tool owners like cursor, without letting through user-agent or monitoring-agent repos.

## Checklist

- [ ] Add patterns that catch the five repos above <!-- longclaw:item=ck_de3f8f12 -->
- [ ] Add negative cases (user-agent, monitoring agents) to tests/test_ai_filters.py <!-- longclaw:item=ck_f83b1ed3 -->
- [ ] Test suite passes; commit and open a PR <!-- longclaw:item=ck_fadd0fe6 -->

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
