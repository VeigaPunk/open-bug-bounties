# F4 Dropbox Intigriti — passive product/API HTTP (Runner B)

**UTC:** 2026-08-07T14:35:32Z  
**XOR:** DEEP F4 · PARK H2 · **Policy recon only**

## Live status

| URL | Code | Signal |
|-----|------|--------|
| app.intigriti.com/programs/dropbox/dropbox/detail | 200 | Public program detail |
| app.intigriti.com/researcher/programs/dropbox/detail | 200 | Researcher view |
| dropbox.com / login / developers / help | 200 | Web shells |
| api.dropboxapi.com/ | **404** | No open API root index |
| api.dropboxapi.com/2/users/get_current_account | **400** | Endpoint present; needs auth + proper method/headers |
| content.dropboxapi.com/ | **404** | Content host not directory-listable |
| dropbox.com/scl/fi | **404** | Share-link prefix alone invalid |

## Auth-ready implications

1. Inti join + **@intigriti.me** + UA + `X-Intigriti-Username` + ≤5 rps still required before tests.
2. API is not anonymously enumerable (404/400 without session) — good boundary signal.
3. Free trial dual accounts human; own files/shares only.
4. Related: `auth/F4-DROPBOX-PASSIVE.md` checklist · `findings/F4-dropbox-xor.md`.

## Axes

- evidence_fidelity↑ (API 404/400 map)
- auth_ready↑ (clear unauth boundary)
- safety_in_policy↑ (no token use)
