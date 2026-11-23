// QP-01 checks the same recommendation in the customer and admin views.
it('QP-01 keeps the pizza restrictions and shows the same tool to the admin', () => {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15)
  const name = 'Lab Pizza ' + stamp

  // 1. Open the home page and wait for the controls to be ready.
  cy.visit('https://quickpizza.grafana.com')
  cy.get('h1').should('have.text', 'Looking to break out of your pizza routine?')
  cy.get('#svelte-announcer').should('exist')

  // 2. Show the four advanced fields.
  cy.contains('label', 'Advanced').click()
  for (const label of ['Max Calories per Slice', 'Excluded tools', 'Must be vegetarian', 'Custom Pizza Name']) {
    cy.contains('label', label).should('be.visible')
  }

  // 3. Enter and verify the restrictions.
  cy.contains('label', 'Max Calories per Slice').siblings('input').clear().type('600').should('have.value', '600')
  cy.contains('option', 'Knife').should('exist')
  cy.get('select[multiple]').select('Knife')
  cy.contains('option', 'Knife').should('be.selected')
  cy.get('#default-checkbox').check().should('be.checked')
  cy.get('input#pizza-name').type(name).should('have.value', name)

  // 4. Compare the API response with the recommendation on screen.
  cy.intercept('POST', '/api/pizza').as('pizza')
  cy.get('button[name="pizza-please"]').click()
  cy.wait('@pizza').then(({ request, response }) => {
    expect(request.body.maxCaloriesPerSlice).to.equal(600)
    expect(response.statusCode).to.equal(200)
    const { pizza, calories } = response.body
    expect(pizza.tool).to.be.a('string').and.not.be.empty
    expect(pizza.tool).not.to.equal('Knife')
    expect(calories).to.be.within(0, 600)
    cy.get('#recommendations').should('contain', 'Name: ' + name)
    cy.contains('#recommendations p', 'Tool:').should('have.text', 'Tool: ' + pizza.tool)
    cy.contains('#recommendations p', 'Calories per slice:').should('have.text', 'Calories per slice: ' + calories)
    cy.writeFile('recommendation.json', { name, tool: pizza.tool, calories })
    cy.wrap(pizza.tool).as('tool')
  })
  cy.screenshot('qp01-step4-recommendation', { capture: 'fullPage' })

  // 5. Check that a guest is asked to sign in.
  cy.get('button[name="rate-5"]').click()
  cy.get('#rate-result').should('have.text', 'Please log in first.')
  cy.screenshot('qp01-step5-login-needed')

  // 6. Sign in on the admin page.
  cy.adminLogin('admin', 'admin')
  cy.contains('Latest pizza recommendations').should('be.visible')

  // 7. Match this run's pizza and tool in the same list item.
  cy.get('@tool').then(tool => {
    cy.contains('li', name).should('contain', '(tool=' + tool + ',').then(row => {
      cy.writeFile('evidence.json', { name, row: row.text().trim() })
    })
  })
  cy.screenshot('qp01-step7-admin-list')
})
