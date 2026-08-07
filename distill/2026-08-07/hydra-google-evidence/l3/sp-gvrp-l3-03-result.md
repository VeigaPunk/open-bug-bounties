| Test | Axis: Information Tier | Axis: Action Criticality | Expected policy result | Reward if passed | Reward if failed |
|---|---|---|---|---|---|
| T1 — unshared `fileId` | IT1 | CA | Unshared object remains inaccessible by ID alone | S2a | C1* |
| T2 — share, then revoke | IT2 | IA | Access granted only during share window; revocation removes effective access | S2b | C1* |
| T3 — link restriction residual | IT1 | CA | Restricted link does not preserve residual access or bypass ACLs | S2a | C1* |
| T4 — viewer cannot elevate | IT2 | MA | Viewer cannot self-promote, reshare, or alter permissions | S2c | C1* |
| T5 — folder vs. child ACL | IT2 | IA | Child ACL is evaluated independently; folder inheritance cannot improperly widen access | S2b | C1* |

Axes: Information Tier = IT0/IT1/IT2; Action Criticality = CA/IA/MA; Reward = S2a/S2b/S2c for compliant behavior, C1* for failure.
