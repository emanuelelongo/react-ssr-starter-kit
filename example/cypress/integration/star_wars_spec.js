describe('Star Wars Test', function() {
  const baseUrl = Cypress.config().baseUrl;

  it('Successfully loads home page', function() {
    cy.visit("/");
    cy.get('h2').should('contain', 'Star Wars')
  })

  it('Navigate to the Planets page', function() {
    cy.get('a').click();
    cy.url().should('eq', `${baseUrl}/planets`);
  })

  it('Server-side and Client-side rendered content match for planets list', function() {
    cy.wait(2000)
    cy.document().then((doc) => {
      cy.request('/planets').its('body').stripHtmlComments().should('include', doc.body.innerHTML);
    });
  })

  it('Open planet details', function() {
    cy.get('a:first').click();
    cy.url().should('eq', `${baseUrl}/planets/2`);
  })

  it('Server-side and Client-side rendered content match for planets details', function() {
    cy.wait(2000)
    cy.document().then((doc) => {
      cy.request('/planets/2').its('body').stripHtmlComments().should('include', doc.body.innerHTML);
    });
  })
})