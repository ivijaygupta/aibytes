---
format: longclaw.ticket/v1
id: 1a875705-e01f-4039-b9f5-0fb78714d291
key: AIB-105j
title: Publish the weekly issue on aibytes.io/weekly
status: todo
priority: p2
type: feature
created_at: 2026-10-18T04:50:25.960Z
updated_at: 2026-10-18T04:50:25.960Z
---

Publish each weekly aiBytes_ issue on our own site, at `aibytes.io/weekly/<slug>`, before it goes out on Beehiiv.

- Beehiiv keeps sending the email from `newsletter.aibytes.io`.
- The issue's live page on `aibytes.io/weekly/...` becomes the issue's canonical home: the newsletter links to it, and the social posts use it as `ISSUE_URL` instead of the Beehiiv link.
- Search engines index our own domain, not Beehiiv's, so the archive builds SEO for aibytes.io.
- We control what the page shows: layout, extra context, related daily editions, without Beehiiv's limits.

The web app is `apps/web/` (Vite + React, static build for GitHub Pages). Open questions for the spec: the slug format (`issue-14-claude-ecdsa-meta-muse`? `2026-10-19`?), whether the page renders the issue HTML as-is or from structured data, and whether a `/weekly` index lists past issues.

## Checklist

- [ ] Write the spec in docs/specs/ (slug format, page source, /weekly index, canonical URL) <!-- longclaw:item=ck_7c583b73 -->
- [ ] Build the /weekly/<slug> page in apps/web from the issue output <!-- longclaw:item=ck_3400f914 -->
- [ ] Add a 'publish on aibytes.io' step to generate-newsletter-content, before the Beehiiv send <!-- longclaw:item=ck_03f49c6f -->
- [ ] Use the aibytes.io URL as ISSUE_URL in the newsletter and social posts <!-- longclaw:item=ck_4ed5c676 -->
- [ ] Back-fill past issues under /weekly <!-- longclaw:item=ck_e685259b -->
- [ ] Tests pass; commit and open a PR <!-- longclaw:item=ck_4d755e79 -->

## Activity

<!-- longclaw:event
id: evt_1a72b882
kind: create
occurred_at: 2026-10-18T04:50:25.960Z
actor:
  type: agent
  id: claude-code
  name: Claude Code
-->
### Claude Code created this ticket
<!-- /longclaw:event -->
