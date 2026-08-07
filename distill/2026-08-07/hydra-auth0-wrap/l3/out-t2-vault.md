# Axes

- Safety: no real credentials; least privilege.
- Consistency: predictable labels and paths.
- Operability: fast retrieval and rotation.
- Auditability: tenant/user ownership and lifecycle notes.

# 1Password item schema

Create one **Login** item per user–tenant pair (9 items total).

**Item title**

`Auth0 CIC — <tenant_slug> — <user_alias>`

**Fields**

- `username` — text
- `password` — concealed/password
- `tenant_domain` — text, e.g. `<tenant>.auth0.com`
- `notes` — multiline text containing owner, purpose, created date, rotation/revoke status; never store extra secrets

# `op://` path examples

```text
op://<vault_name>/Auth0 CIC — <tenant_slug> — <user_alias>/username
op://<vault_name>/Auth0 CIC — <tenant_slug> — <user_alias>/password
op://<vault_name>/Auth0 CIC — <tenant_slug> — <user_alias>/tenant_domain
op://<vault_name>/Auth0 CIC — <tenant_slug> — <user_alias>/notes
```

Use placeholders such as `<vault_name>`, `<tenant_slug>`, and `<user_alias>` only.

# Rotation / revoke checklist

- Confirm target `<user_alias>` and `<tenant_slug>`.
- Revoke or disable the old Auth0 credential.
- Generate a replacement through the approved Auth0 workflow.
- Update `username`, `password`, and `notes`; preserve no old secret.
- Validate retrieval using the relevant `op://` paths.
- Record rotation timestamp and operator in `notes`.
- Revoke immediately on departure, compromise, tenant removal, or failed ownership review.
- Verify revoked credentials no longer authenticate; document completion.

