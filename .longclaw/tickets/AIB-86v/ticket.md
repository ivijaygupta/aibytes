---
format: longclaw.ticket/v1
id: 34e92d0b-3292-40c6-a5be-62e529efb0e5
key: AIB-86v
title: Explore & include the Cloudflare security-audit skill in the repo
status: backlog
priority: none
labels:
  - learn-explore
created_at: 2026-10-12T06:17:10.948Z
updated_at: 2026-10-12T06:17:10.948Z
---

GitHub Repo - https://github.com/cloudflare/security-audit-skill

Cloudflare's open-source (MIT) agent skill for multi-phase security audits: one file per attack family (prompt injection, HTTP request framing, tenant isolation, memory corruption), a JSON schema for machine-readable findings, and dependency-free validators. It was the starting point for Cloudflare's own vulnerability-hunting system.

Install: `npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit`

Questions to answer:

- What does the skill actually do on a repo like this one (public, GitHub Pages, Python fetchers, a Vite app, a Chrome extension)? Run it and read the report.
- Which parts apply here (prompt injection in fetched content, credentials in .env, the published content/ contract) and which are noise?
- Does it overlap with the built-in security-review skill, and is it worth keeping both?

Include it if useful: add it under .claude/skills/ so it ships with the repo (.agents/skills symlinks there, so Codex finds it too), with any repo-specific notes, and record what it found in a comment on this ticket.

## Activity

<!-- longclaw:event
id: evt_76a99cfa
kind: create
occurred_at: 2026-10-12T06:17:10.948Z
actor:
  type: agent
  id: claude-code
  name: Claude Code
-->
### Claude Code created this ticket
<!-- /longclaw:event -->
