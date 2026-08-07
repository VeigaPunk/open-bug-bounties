# Bug Hunters Report — Residual Drive Access After Revocation

**GODSPEED**

- **Title:** Residual access to a Drive file after permission revocation
- **Product:** Google Drive
- **URL:** `[DRIVE_URL_PLACEHOLDER]`
- **File ID:** `REDACTED`

## Preconditions

- `[Account A]` owns or controls the file.
- `[Account B]` initially has `[ROLE_PLACEHOLDER]` access.
- Access is revoked from `[Account B]`.
- No real tokens or credentials are used.

## Steps to Reproduce

1. Share the file with `[Account B]`.
2. Verify that `[Account B]` can access the file.
3. Revoke `[Account B]`’s access.
4. Attempt to access the same file using the previously authorized session or link.
5. Record the resulting access behavior.

## Expected Result

`[Account B]` is denied access immediately after revocation.

## Actual Result

`[Account B]` retains access for `[DURATION_PLACEHOLDER]` through `[ACCESS_PATH_PLACEHOLDER]`.

## Impact

- **IT1:** `[Confidentiality/integrity impact description]`
- **IA:** `[Affected accounts, tenants, files, or authorization scope]`

## Mitigations Note

- Invalidate active sessions and cached authorization state after revocation.
- Enforce revocation checks on every file-access request.
- Document expected propagation delays, if any, and ensure they do not permit unauthorized access.
