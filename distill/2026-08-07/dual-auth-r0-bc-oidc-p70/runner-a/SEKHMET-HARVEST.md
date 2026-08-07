# Sekhmet dual-pool harvest (runner-a)

Both wrappers used: `sekhmet-luna.sh` + `sekhmet-spark.sh` (`--timeout 180 --no-keep`).

`--no-keep` deleted runtime trees after ok; evidence = swarm logs + l3/*.md checklists.


## Auth-ready swarm (5 tasks × 2 pools)

- `sp-b8ac28b8-cf39-4947-922f-92a5e3c6250e` pool=luna status=ok model=gpt-5.6-luna tokens=8317 ms=11914
- `sp-fc5c85da-38b7-40a6-bae8-234159619ea0` pool=luna status=ok model=gpt-5.6-luna tokens=10119 ms=17170
- `sp-a2c40094-a832-4ac8-a5a4-a1784700e4b6` pool=luna status=ok model=gpt-5.6-luna tokens=5321 ms=22275
- `sp-d5ce7cf1-26e3-490c-84f0-4267c1b73d3a` pool=luna status=ok model=gpt-5.6-luna tokens=6760 ms=24778
- `sp-4b6dd3de-92b0-4b73-ad65-492e1a4528fd` pool=luna status=ok model=gpt-5.6-luna tokens=16109 ms=31537
- `sp-1f3f6e44-e21e-4da4-91ac-8f804cb163ff` pool=spark status=ok model=gpt-5.6-luna tokens=4373 ms=9362
- `sp-0cfc871d-b746-4507-a73c-7532eca715b8` pool=spark status=ok model=gpt-5.6-luna tokens=7602 ms=15970
- `sp-eb07f0e8-1c32-4bc7-8319-a02320281bd9` pool=spark status=ok model=gpt-5.6-luna tokens=6011 ms=17122
- `sp-06c71d6c-855f-4fbd-92ba-e3f3b920e43a` pool=spark status=ok model=gpt-5.6-luna tokens=9538 ms=18273
- `sp-689d7da6-9240-4cda-90d7-e8c2f0a91071` pool=spark status=ok model=gpt-5.6-luna tokens=10145 ms=23380

## Prior L3 checklist swarm (l3/)

- `sp-4a889319-1410-48fc-bd8a-3d0b9a9a1e62` pool=luna artifact=`l3/sp-4a889319-1410-48fc-bd8a-3d0b9a9a1e62.md` or checklist_*
- `sp-87b44661-fa17-4335-80cb-db91ebef4ec5` pool=luna artifact=`l3/sp-87b44661-fa17-4335-80cb-db91ebef4ec5.md` or checklist_*
- `sp-b5d2237b-932b-4406-ab64-0ab2caf6428b` pool=spark artifact=`l3/sp-b5d2237b-932b-4406-ab64-0ab2caf6428b.md` or checklist_*
- `sp-d32f7b5e-8ad3-43cc-bf9e-17ed79835282` pool=spark artifact=`l3/sp-d32f7b5e-8ad3-43cc-bf9e-17ed79835282.md` or checklist_*
