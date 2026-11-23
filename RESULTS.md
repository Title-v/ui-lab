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

**Step 3.8.** Each headless Chrome run below tested QP-01 on its own. The elapsed times come from the HTML report summary. Each log includes the four screenshots for steps 3, 4, 5 and 7.

| Run | Result | Report elapsed time | Pizza name | Evidence |
|---|---|---:|---|---|
| 1 | 1 passed, 0 failed | 00:00:10.828 | Lab Pizza 20261122-195911 | [Report](robot/results/run1/report.html) · [Step log](robot/results/run1/log.html) |
| 2 | 1 passed, 0 failed | 00:00:09.269 | Lab Pizza 20261122-195921 | [Report](robot/results/run2/report.html) · [Step log](robot/results/run2/log.html) |

## Part 4 — Cypress

**Step 4.1.** Node.js reported `v24.16.0` and npm reported `11.13.0`. The Cypress package and binary both reported `16.3.0`.

**Step 4.3.** Changing only the capital F in the expected title produced this failure. Both full runs below use the corrected title.

```text
Timed out retrying after 10000ms
+ expected - actual

-'Web form'
+'Web Form'
```

**Step 4.6.** In Chrome run 2, `POST /api/pizza` returned HTTP 200, Scissors and 600 calories per slice. The recommendation on screen showed both returned values. [API values](cypress/runs/run2/recommendation.json) · [Full-page screenshot](cypress/runs/run2/screenshots/pizza-scenario.cy.js/qp01-step4-recommendation.png)

**Step 4.7.** The admin row in that run read `Lab Pizza 20261122-130004 (tool=Scissors, ingredients_number=8) (newest)`. [Admin screenshot](cypress/runs/run2/screenshots/pizza-scenario.cy.js/qp01-step7-admin-list.png)

**Step 4.8.** Each Chrome run included both specs. Durations come from the final Cypress summary.

| Run | Result | Total duration | Pizza name | Evidence |
|---|---|---:|---|---|
| 1 | 2 passed, 0 failed | 13 s | Lab Pizza 20261122-125938 | [Terminal](cypress/runs/run1/terminal.txt) · [QP-01 video](cypress/runs/run1/videos/pizza-scenario.cy.js.mp4) |
| 2 | 2 passed, 0 failed | 11 s | Lab Pizza 20261122-130004 | [Terminal](cypress/runs/run2/terminal.txt) · [QP-01 video](cypress/runs/run2/videos/pizza-scenario.cy.js.mp4) |

**Step 4.9 (optional).** Both specs also passed in Microsoft Edge 157.0.4341.46 in 11 seconds. [Edge run summary](cypress/runs/edge/terminal.txt)

## Part B — Reflection

1. **Why use the calories label?** In Chrome, `#floating_filled` matched three number fields. The XPath for the input beside “Max Calories per Slice” matched just one. Giving that input a unique ID such as `max-calories` and linking its label with `for="max-calories"` would let a tester select the right field directly.

2. **What kind of oracle checks the admin tool?** Step 7 is a consistency check between two views of the same pizza. In the manual run, the recommendation and the last admin row both showed Scissors. If the admin page displayed another pizza’s tool, such as Knife, this check would catch the mismatch.

3. **How could the test verify a vegetarian pizza?** The manual run showed the vegetarian box checked and listed mozzarella and spinach in the result. I would check the dough and every ingredient against a trusted catalog that gives each item’s vegetarian status. An item marked nonvegetarian or missing from the catalog would fail the check.

4. **How did Robot and Cypress compare?** Robot took more setup because I wrote explicit waits, including one for the Knife option. In its HTML log I could expand each keyword and open the four screenshots. Cypress was quicker to write because assertions retried automatically and `cy.wait('@pizza')` waited for the response. The video made the transition from guest rating to admin sign-in easy to follow.

5. **Which tool would I use for Project 2?** I would use Cypress for two reasons. In Chrome run 2, one test checked that the API and the page both showed Scissors and exactly 600 calories. Its recording also let me review the customer and admin screens in one place.

6. **Where would I fix the Robot calories locator?** I would update `${CALORIES}` in `robot/resources/quickpizza.resource`. `Show Advanced Fields` uses it to find the box, and `Enter Pizza Restrictions` uses it to enter and verify 600. The scenario calls those keywords, so the same test steps pick up the new locator.

7. **Why keep QP-01 in one Cypress test?** QuickPizza uses a cookie to keep the browser on the server that created its pizza. Cypress clears cookies and aliases before each test. If steps 6 and 7 started a second test, the admin could sign in on a different server whose list did not contain that pizza. Keeping one test also preserved the pizza name and `@tool` for the comparison in step 7.
