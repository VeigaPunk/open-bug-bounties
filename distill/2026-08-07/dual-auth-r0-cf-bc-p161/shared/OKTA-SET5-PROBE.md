# Okta Set5 probe — 2026-08-07T14:04:31Z
URL: https://bugcrowd-pam-5335.oktapreview.com
HTTP: 200
final_url: https://bugcrowd-pam-5335.oktapreview.com/app/UserHome?iss=https%3A%2F%2Fbugcrowd-pam-5335.oktapreview.com&session_hint=AUTHENTICATED
bytes: 6375
AUTHENTICATOR
okta
OKTA
PASSWORD

## Judge note
`session_hint=AUTHENTICATED` on UserHome — browser/cookie path may already hold a live Okta preview session.
Next: map apps on UserHome (no credential dump); wire BC PAM engagement access.
