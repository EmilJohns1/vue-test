describe('Form Validation', () => {
  it('Disables submit button when form is invalid', () => {
    cy.visit('/contactform');
    
    cy.get('#name').type(' ');
    cy.get('#email').type('invalidemail');
    cy.get('#message').type(' ');
    
    cy.get('button[type="submit"]').should('be.disabled');
  });
});
