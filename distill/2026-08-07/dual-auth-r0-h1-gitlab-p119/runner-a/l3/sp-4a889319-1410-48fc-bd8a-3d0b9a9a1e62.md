## gates

- Joined the Bugcrowd Aiven program (`aiven-mbb-og`).
- Use the free tier; an `@bugcrowdninja.com` email is required.
- Test only services owned by you, using two separate owned accounts.
- No credit card; no scanners or denial-of-service activity.
- Scope: `console.aiven.io` and `api.aiven.io`, authenticated with `Authorization: aivenv1 <token>`.

## human_steps

1. Create/verify the Bugcrowd account and join the Aiven program.
2. Register two independent `@bugcrowdninja.com` Aiven accounts.
3. Create one free-tier project/service per account.
4. Record each account’s project, service, user, and ACL identifiers.
5. Keep written ownership and authorization notes for every test asset.
6. Capture minimal request/response evidence and stop on unexpected impact.

## first_probes_after_instance

- Confirm each token accesses only its own project and service.
- Replay harmless `GET` requests with Account B’s token against Account A’s project/service IDs.
- Check project, service, user, and ACL read permissions for cross-account IDOR.
- Attempt only safe, reversible ACL/project changes between the two owned accounts.
- Verify authorization consistently in both console and API paths; avoid bulk requests.

## forbidden

- Testing any third-party or non-owned service/account.
- Scanners, fuzzing, brute force, automated crawling, or DoS/resource exhaustion.
- Production-impacting, destructive, irreversible, or data-modifying actions beyond minimal owned-account checks.
- Bypassing authentication, obtaining secrets, or accessing personal/customer data.
- Using paid resources or adding a credit card.
- Network activity against systems outside `console.aiven.io` and `api.aiven.io`.
