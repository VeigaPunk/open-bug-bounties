# Godspeed inject + milestone ship (MANDATORY)

Every agent under xbgst / dual bounty runners / sekhmet L3 task authors **must** receive this block at the top of their prompt, and must **commit + push after each relevant APPROVED milestone**.

## 1. Godspeed inject (prepend to every spawn)

```
You are Godspeed-enabled.
1. Name the axes.
2. Iterate cheap, in parallel.
3. Keep moves that improve any axis and harm none.
4. Don't aim — let the frontier walk itself.
IMMEDIATELY STOP ASKING CLARIFYING QUESTIONS.
Execute tool calls concurrently in large batches. Do not serialize what can run in parallel.
Do not output philosophical reasoning or verbose plans. Act directly via tool calls.
Language lock: prefer Rust for new tooling; bash OK for op/curl/sekhmet/git.
NEVER print secrets or write credentials into distill/repo files — use op:// refs only.
```

Sekhmet already injects a godspeed directive into spark `in/godspeed.md` — still **restate** this block in every Grok subagent / workflow agent prompt.

## 2. Milestone ship (local-first → main)

After any **relevant milestone** that improved ≥1 axis with evidence and **no secret leakage**:

1. Emit: `APPROVED: <one-line reason>` (or `BLOCKED: <reason>` and do **not** ship).
2. Run secret gate:  
   `rg -n 'sk-|AKIA|password=|BEGIN (RSA |OPENSSH )?PRIVATE|cTtux|ghp_|xox[baprs]-' <paths> || true`  
   Fail closed if real secrets found (not scrub docs).
3. Stage **project files only** (never `.env`, cookies, `op item get --reveal`, raw HTML login dumps with tokens).
4. Commit with a complete sentence (HEREDOC).
5. **`git push -u origin main`** over SSH (no force-push, no fork/PR default).

### Default ship repos

| Artifact class | Repo | Path under repo |
|----------------|------|-----------------|
| Bounty distill / dual-auth race | `~/Projects/open-bug-bounties` | `distill/YYYY-MM-DD/...` (sanitized mirror) |
| Sekhmet / xbrd-spark code | `~/Projects/xbrd-spark` | as changed |
| xbgst skill / Grok stack | `~/Projects/xbrd-grok` | as changed |

Helper (preferred):

```sh
~/.xbgst/scripts/milestone-ship.sh \
  --label "dual-auth-r0-substrate" \
  --src "$HOME/.xbgst/bounty-distill/2026-08-07/dual-auth-runners" \
  --msg "Ship dual-auth substrate race reports and shared claims."
```

## 3. Who must obey

- the-planner, scout, reviewer, labrat, executor, connector, distiller, simplifier, the-revenger, sentinel, critic, mutation-tester, scribe  
- dual Runner A / Runner B  
- workflow agents in `dual-bounty-auth` / `xbgst-wrap`  
- any sekhmet task author writing durable artifacts

## 4. Anti-patterns

- Shipping without godspeed inject in the agent prompt  
- Shipping secrets or op reveals  
- Waiting for user confirmation when milestone is APPROVED  
- Force-push or rewriting published history  
- Declaring APPROVED without gates/evidence  

## 5. Sekhmet fan-out

When writing `tasks.txt` / swarm lines, include one line:

`GODSPEED inject required. After durable artifacts land: run ~/.xbgst/scripts/milestone-ship.sh if gates green.`
