*** Settings ***
Library    SeleniumLibrary    timeout=10s
Library    String

*** Variables ***
${BROWSER}    chrome
${CALORIES}    xpath://label[normalize-space()='Max Calories per Slice']/preceding-sibling::input

*** Keywords ***
Open QuickPizza
    [Documentation]    Step 1. Open the customer page and check its heading.
    Open Browser    https://quickpizza.grafana.com    ${BROWSER}
    ...    service=executable_path=r'%{CHROMEDRIVER}'
    Set Window Size    1280    1600
    Wait Until Element Is Visible    css:h1
    Element Text Should Be    css:h1    Looking to break out of your pizza routine?
    Wait Until Page Contains Element    id:svelte-announcer

Show Advanced Fields
    [Documentation]    Step 2. Show the advanced form and wait for the tool options.
    Click Element    xpath://label[.//span[normalize-space()='Advanced']]
    Wait Until Page Contains Element    xpath://option[.='Knife']
    FOR    ${field}    IN    ${CALORIES}    css:select[multiple]    id:default-checkbox    css:input#pizza-name
        Element Should Be Visible    ${field}
    END

Enter Pizza Restrictions
    [Documentation]    Step 3. Enter and verify all four request values.
    [Arguments]    ${limit}    ${excluded_tool}    ${name}
    Input Text    ${CALORIES}    ${limit}
    Select From List By Label    css:select[multiple]    ${excluded_tool}
    Select Checkbox    id:default-checkbox
    Input Text    css:input#pizza-name    ${name}
    Textfield Value Should Be    ${CALORIES}    ${limit}
    List Selection Should Be    css:select[multiple]    ${excluded_tool}
    Checkbox Should Be Selected    id:default-checkbox
    Textfield Value Should Be    css:input#pizza-name    ${name}
    Press Keys    css:input#pizza-name    TAB

Request And Check Pizza
    [Documentation]    Step 4. Check the name, tool and calories on the recommendation.
    [Arguments]    ${name}    ${excluded_tool}    ${limit}
    Click Button    name:pizza-please
    Wait Until Element Contains    id:recommendations    Name: ${name}
    ${line}=    Get Text    xpath://p[starts-with(.,'Tool:')]
    ${tool}=    Remove String    ${line}    Tool:${SPACE}
    Should Not Be Empty    ${tool}
    Should Not Be Equal    ${tool}    ${excluded_tool}
    ${line}=    Get Text    xpath://p[starts-with(.,'Calories per slice:')]
    ${calories}=    Remove String    ${line}    Calories per slice:${SPACE}
    Should Be True    0 <= int($calories) <= int($limit)
    RETURN    ${tool}
