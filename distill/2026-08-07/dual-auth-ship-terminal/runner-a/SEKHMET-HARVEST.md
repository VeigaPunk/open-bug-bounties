# Sekhmet harvest — Runner A auth-ready swarm (2026-08-07T22:36Z)

Both pools: `--timeout 180 --no-keep`, tasks in `tasks-auth-ready.txt`.

## LUNA (`sekhmet-luna.sh`) — all status=ok

| spark_id | notes |
|----------|-------|
| sp-1d59d225-2155-4c06-824e-7eda0cc8c9b3 | identity-day (rate_limit fail_reason but status ok) |
| sp-53c48b9e-ff55-4373-ba96-74770fd0b87f | Q-BC-AUTH-GATES |
| sp-d1c59eea-285e-429e-a19e-2c84bce9e670 | okta runbook |
| sp-276a02c4-1cde-43ff-9aba-c84505b43e7a | aiven checklist |
| sp-f90b70b7-1ed4-4e84-af15-4ff2c0dbd0b5 | atlassian-openai |

## SPARK (`sekhmet-spark.sh`) — all status=ok; codex-spark usage_limit → luna fallback

| spark_id | notes |
|----------|-------|
| sp-be205186-6106-4fba-aa89-3c9382968e8b | identity-day |
| sp-7c58a15e-4ae4-4a5a-8dbb-42beb902b5bb | aiven |
| sp-6f66c9a5-17ed-4082-b75c-bbf3032169d8 | okta runbook |
| sp-38942c86-5027-4403-995a-a45c2b370518 | atlassian-openai |
| sp-79f52837-a2d0-4834-8aaa-567217d340aa | Q-BC-AUTH-GATES |

Durable copies: `l3/*-r2.md` (host filled where dual-write race left thin).
Logs: `sekhmet-luna-swarm.log`, `sekhmet-spark-swarm.log`, `sekhmet-ids.json`.
