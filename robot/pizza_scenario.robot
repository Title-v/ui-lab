*** Settings ***
Resource    resources/quickpizza.resource
Test Teardown    Close Browser

*** Test Cases ***
QP-01 A Custom Pizza Reaches The Admin List
    [Documentation]    Check the restrictions, guest rating and matching admin entry.
    Open QuickPizza
