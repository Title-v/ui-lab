# ITCS386 UI testing lab

The lab tests the Selenium web form and follows a QuickPizza recommendation from the customer page to the admin list. [Manual test, run evidence and seven reflection answers](RESULTS.md)

| Part and folder | What it contains | Run all tests from that folder |
|---|---|---|
| Part 3 · [Robot Framework](robot/) | Three tests cover the form title, form submission and QuickPizza scenario QP-01. The shared keywords are in `resources/`, and `results/` holds both QP-01 reports and their screenshots. | `robot -v BROWSER:headlesschrome .` |
| Part 4 · [Cypress](cypress/) | Two specs cover the web form and QP-01, including a comparison of the pizza API response with the screen. The folder also holds the admin sign-in command, screenshots and videos. | `npm test` |

## Setup

- **Robot Framework** — From `robot/`, activate a Python 3.10+ virtual environment and run `python -m pip install -r requirements.txt`. Set `CHROMEDRIVER` to the absolute path of the ChromeDriver executable matching your installed Chrome.
- **Cypress** — With Node.js 24 and Chrome installed, run `npm ci` once from `cypress/`.
