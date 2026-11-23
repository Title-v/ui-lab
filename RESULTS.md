# UI lab results

Selected tools are Robot Framework (Part 3) and Cypress (Part 4).

## Part 0 — Browser and manual test

**Steps 0.1–0.3.** Google Chrome and ChromeDriver both reported `157.0.8103.80` on macOS arm64. The Robot tests read the driver path from `CHROMEDRIVER`.

**Step 0.4.** With Advanced open, each of these CSS locators matched exactly one element in Chrome.

| Control | CSS locator | Matches |
|---|---|---:|
| Pizza, Please! | `button[name="pizza-please"]` | 1 |
| Excluded tools | `select[multiple]` | 1 |
| Must be vegetarian | `#default-checkbox` | 1 |
| Custom Pizza Name | `input#pizza-name` | 1 |
