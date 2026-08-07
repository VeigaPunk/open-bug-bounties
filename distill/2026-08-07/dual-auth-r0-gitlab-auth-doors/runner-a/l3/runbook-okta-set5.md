# Policy-Safe Recon Runbook

## Axes

- **Coverage:** map reachable SPA routes and launcher/admin tiles.
- **Safety:** human-mediated authentication; no credential, cookie, or token collection.
- **Reproducibility:** record URLs, status codes, timestamps, and visible labels only.
- **Session integrity:** use one browser profile; do not export or persist session material.

## Known probe signals

- `https://bugcrowd-pam-5335.oktapreview.com` returns `302` to `/app/UserHome?session_hint=AUTHENTICATED`, followed by a ~6.3 KB SPA shell (`200`).
- Administrative host: `https://bugcrowd-pam-5335-admin.oktapreview.com`.
- End-user experience is an `enduser-v2` SPA; primary JavaScript is served by `oktacdn`.
- Unauthenticated/headless requests clear `sid` and `xids` (`Max-Age=0`); `AUTHENTICATED` is therefore not a durable headless session.
- Observed cookie names: `sid`, `xids`, `JSESSIONID`, `t`, `DT`. Never record values.

## Human click-path login

1. Open the Okta preview URL in the designated browser profile.
2. Launch **1Password desktop** manually and unlock it locally.
3. Use the saved entry to fill the login form through the browser integration.
4. Complete any human-required MFA or approval.
5. Confirm the browser reaches `/app/UserHome` and the SPA renders.
6. Keep the session confined to this browser profile; do not copy cookies, tokens, or storage entries.

## Headless limits

- Do not attempt headless login, credential replay, cookie replay, or session fixation.
- Treat `session_hint=AUTHENTICATED` as a routing/UI signal only.
- A `302` followed by the SPA shell does not prove an authenticated API session.
- Do not use or retain `sid`, `xids`, `JSESSIONID`, `t`, or `DT` values.
- Stop automation at the login boundary and hand off to a human-operated browser.

## SPA mapping after the human session

Record only visible navigation and response metadata:

1. **App launcher:** open the launcher and list displayed application names and links.
2. **UserHome:** record tiles, labels, route paths, and whether each opens successfully.
3. **Admin:** navigate only via the visible admin tile or the approved admin host; record displayed sections and route paths.
4. For each tile, capture:
   - visible name;
   - destination hostname/path;
   - HTTP status observed in the browser;
   - access result (`loaded`, `denied`, or `redirected`);
   - timestamp.
5. Avoid form submission, data changes, privileged actions, and API enumeration.

## Session storage policy

- Use one dedicated browser profile for this operation.
- Permit the browser to manage cookies and web storage in place.
- Do not export, print, sync, inspect, or transmit cookie/storage values.
- Do not place browser-profile files in project directories or source control.
- When finished, close the browser and lock 1Password; retain only the route/status/label notes.
- If operational policy requires cleanup, clear the dedicated profile through the browser UI after recording non-sensitive observations.
