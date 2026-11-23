*** Settings ***
Library    SeleniumLibrary    timeout=10s

*** Variables ***
${BROWSER}    chrome

*** Keywords ***
Open QuickPizza
    [Documentation]    Step 1. Open the customer page and check its heading.
    Open Browser    https://quickpizza.grafana.com    ${BROWSER}
    ...    service=executable_path=r'%{CHROMEDRIVER}'
    Set Window Size    1280    1600
    Wait Until Element Is Visible    css:h1
    Element Text Should Be    css:h1    Looking to break out of your pizza routine?
    Wait Until Page Contains Element    id:svelte-announcer
