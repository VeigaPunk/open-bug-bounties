# Open Bug Bounties

Public **GitHub Pages** board for VeigaPunk tracked bounties / packages / staff handoffs.

| | |
|--|--|
| **Live** | https://veigapunk.github.io/open-bug-bounties/ |
| **Private ChatGPT site** | https://open-bug-bounties.jpveiga.chatgpt.site/ (auth) |
| **Data** | [`data/bounties.json`](data/bounties.json) |

## Essence

Dark, dense, filterable board — same intent as the ChatGPT site (bounty inventory + status), public and crawlable. No login wall.

## Godspeed + sekhmet

L3 workers (`sekhmet`) inject the short godspeed directive on **every** dispatch into `in/godspeed.md` + `in/task.md` head. See [xbrd-spark](https://github.com/VeigaPunk/xbrd-spark).

## Refresh data

Regenerate `data/bounties.json` from local orch inventory or a signed-in export of the ChatGPT site, then commit on `main`.

## License

MIT OR Apache-2.0
