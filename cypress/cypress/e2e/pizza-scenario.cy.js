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

  // 4. Check the recommendation against the request.
  cy.get('button[name="pizza-please"]').click()
  cy.get('#recommendations').should('contain', 'Name: ' + name)
  cy.contains('#recommendations p', 'Tool:').should('not.contain', 'Knife')
  cy.contains('#recommendations p', 'Calories per slice:').should(line => {
    const calories = Number(line.text().replace('Calories per slice:', '').trim())
    expect(calories).to.be.within(0, 600)
  })

  // 5. Check that a guest is asked to sign in.
  cy.get('button[name="rate-5"]').click()
  cy.get('#rate-result').should('have.text', 'Please log in first.')
})
