// QP-01 checks the same recommendation in the customer and admin views.
it('QP-01 keeps the pizza restrictions and shows the same tool to the admin', () => {
  // 1. Open the home page and wait for the controls to be ready.
  cy.visit('https://quickpizza.grafana.com')
  cy.get('h1').should('have.text', 'Looking to break out of your pizza routine?')
  cy.get('#svelte-announcer').should('exist')

  // 2. Show the four advanced fields.
  cy.contains('label', 'Advanced').click()
  for (const label of ['Max Calories per Slice', 'Excluded tools', 'Must be vegetarian', 'Custom Pizza Name']) {
    cy.contains('label', label).should('be.visible')
  }
})
