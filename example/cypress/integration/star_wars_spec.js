describe('Star Wars Test', function() {
  const baseUrl = Cypress.config().baseUrl;

  it('Successfully loads home page', function() {
    cy.visit("/");
    cy.get('h2').should('contain', 'Star Wars')
  })

  it('Navigate to the Planets page', function() {
    cy.contains('Go to Planets List').click();
    cy.url().should('eq', `${baseUrl}/planets`);
  })

  it('Server-side and Client-side rendered content match for planets list', function() {
    cy.wait(2000)
    cy.document().then((doc) => {
      cy.request('/planets').its('body').shouldIncludeText(doc.body.innerHTML);
    });
  })

  it('Open planet details', function() {
    cy.contains('Alderaan').click();
    cy.url().should('eq', `${baseUrl}/planets/2`);
  })

  it('Server-side and Client-side rendered content match for planets details', function() {
    cy.wait(2000)
    cy.document().then((doc) => {
      cy.request('/planets/2').its('body').shouldIncludeText(doc.body.innerHTML);
    });
  })

  it('Successfully back to home page', function() {
    cy.contains('Star Wars').click();
    cy.get('h2').should('contain', 'Star Wars')
  })

  it('Make a people search', function() {
    cy.get('input').type('solo{enter}');
    cy.get('h2').should('contain', 'People');
    cy.get('table').find('tbody tr:last').find('td:first').should('have.text', 'Han Solo');
  })
})
