# REMEDIATION

User-facing guidance if a live OAuth callback URL was pasted:

1. **Assume the code may be compromised.** If login just completed, the code was likely already single-used by GitHub (good). If login was incomplete, do not open the URL from untrusted contexts.
2. **Session hygiene:** Sign out all GitHub sessions if unsure; review the Security log; enable 2FA; revoke third-party access if needed.
3. **Do not paste OAuth URLs** into chats, tickets, or LLM tools.
4. **Shared device:** Clear the browser history entry for that callback.
5. **Support:** Report to GitHub Support only if there is evidence of an unauthorized session after the paste — not for the normal code-in-URL design of the OAuth redirect.
6. **Developers building similar systems:** confidential client + PKCE + short TTL + one-time codes + Referrer-Policy + avoid analytics on `redirect_uri` + prefer `form_post` when possible.
