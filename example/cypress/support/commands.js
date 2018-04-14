Cypress.Commands.add('stripHtmlComments', {
  prevSubject: true
}, (subject) => {
  return cy.wrap(subject).invoke('replace', /<!-- -->/g, '');
});