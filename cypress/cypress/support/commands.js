Cypress.Commands.add('adminLogin', (username, password) => {
  cy.visit('https://quickpizza.grafana.com/admin')
  cy.get('#svelte-announcer').should('exist')
  cy.get('#username').clear().type(username)
  cy.get('#password').clear().type(password, { log: false })
  cy.get('button[type="submit"]').click()
})
