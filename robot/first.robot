*** Settings ***
Library    SeleniumLibrary
Test Teardown    Close Browser

*** Variables ***
${BROWSER}    chrome

*** Test Cases ***
The Web Form Opens
    [Documentation]    Check the title of the Selenium practice form.
    Open Browser    https://www.selenium.dev/selenium/web/web-form.html    ${BROWSER}
    ...    service=executable_path=r'%{CHROMEDRIVER}'
    Title Should Be    Web form
