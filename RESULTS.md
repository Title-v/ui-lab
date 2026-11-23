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

### Step 0.5 — QP-01, a custom pizza reaches the admin list

I used the site controls in a fresh Google Chrome Incognito window, starting signed out. The goal was to check the recommendation, the guest rating message and the matching entry for the demo admin. The run created **Lab Pizza 20261122-195512**, with **Scissors** and **325 calories per slice**.

| Step and action | Expected result | Actual result | Outcome |
|---|---|---|---|
| 1. Open QuickPizza | The home heading appears. | “Looking to break out of your pizza routine?” appeared. | Pass |
| 2. Turn on Advanced | All four request controls appear. | Max Calories per Slice, Excluded tools, Must be vegetarian and Custom Pizza Name appeared. | Pass |
| 3. Enter the restrictions and name | The form keeps all four values. | The limit showed 600, Knife was selected for exclusion, vegetarian was checked and the name showed `Lab Pizza 20261122-195512`. | Pass |
| 4. Click Pizza, Please! | The name matches, the tool is allowed and calories are at most 600. | The recommendation showed the same name, Scissors and 325 calories per slice. | Pass |
| 5. Click Love it! as a guest | The site asks the guest to log in. | “Please log in first.” appeared. | Pass |
| 6. Open `/admin` and sign in with the prefilled demo credentials (both `admin`) | The recommendations list opens. | “Latest pizza recommendations” appeared. | Pass |
| 7. Find the pizza by name | Its admin entry shows the same tool as step 4. | The last row read `Lab Pizza 20261122-195512 (tool=Scissors, ingredients_number=6)`. | Pass |

[Manual Chrome screenshot of the admin list](qp01-manual-admin.png)

## Part 3 — Robot Framework

**Step 3.1.** `robot --version` reported `Robot Framework 7.5.1 (Python 3.15.2 on darwin)`.

**Step 3.2.** The deliberate wrong-title test reported `Title should have been 'Web Form' but was 'Web form'.` After restoring the expected title, both Selenium web-form tests passed.
