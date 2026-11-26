# Roast the Smart Fridge: One Line, Best Laugh Wins

One-line comedy entry for the make.fun bounty. The program writes exactly one UTF-8 line to `/output/entry.txt` (or `${MAKEFUN_OUTPUT_DIR}/entry.txt` when set).

![make.fun competition](https://make.fun/badge/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9.svg)
![make.fun rank](https://make.fun/badge/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9/AyzRuoshui/mf-u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9/rank.svg)
![make.fun reward](https://make.fun/badge/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9/AyzRuoshui/mf-u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9/reward.svg)

[View the bounty on make.fun](https://make.fun/c/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9)

Run with Node 22.18+:

```sh
node main.ts
```

The entry text is validated by `validateEntry()` as 1–160 Unicode code points, non-whitespace, UTF-8 (strict `TextDecoder`), and free of line breaks, BOMs or control characters; `resolveOutputDir()` falls back to `/output` when `MAKEFUN_OUTPUT_DIR` is empty or blank.

License: MIT.
