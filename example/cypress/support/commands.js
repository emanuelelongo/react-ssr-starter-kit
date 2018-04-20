const regex = /(<([^>]+)>)/ig;

Cypress.Commands.add('shouldIncludeText', {
  prevSubject: true
}, (subject, html) => {
  cy.wrap(subject).invoke('replace', regex, '').should('include', html.replace(regex, ''));
});