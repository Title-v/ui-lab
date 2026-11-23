*** Settings ***
Resource    resources/quickpizza.resource
Library    DateTime
Test Teardown    Close Browser

*** Test Cases ***
QP-01 A Custom Pizza Reaches The Admin List
    [Documentation]    Check the restrictions, guest rating and matching admin entry.
    Open QuickPizza
    Show Advanced Fields
    ${stamp}=    Get Current Date    result_format=%Y%m%d-%H%M%S
    ${name}=    Set Variable    Lab Pizza ${stamp}
    Enter Pizza Restrictions    600    Knife    ${name}
    Capture Page Screenshot    qp01-step3-fields.png
    ${tool}=    Request And Check Pizza    ${name}    Knife    600
    Capture Element Screenshot    id:recommendations    qp01-step4-pizza.png
    Rate As A Guest
    Capture Page Screenshot    qp01-step5-login-needed.png
    Open Admin List    admin    admin
    Check Admin Entry    ${name}    ${tool}
    Capture Page Screenshot    qp01-step7-admin-list.png
