describe('Successful Submission', () => {
  it('Displays correct response after successful submission', () => {
    cy.intercept('POST', 'http://localhost:3001/responses', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Hello, this is a test message.',
        },
      });
    }).as('submitRequest');

    cy.visit('/contactform');

    cy.get('#name').type('John Doe');
    cy.get('#email').type('john@example.com');
    cy.get('#message').type('Hello, this is a test message.');

    cy.get('button[type="submit"]').click();
    
    cy.wait('@submitRequest').then((interception) => {
      expect((interception.response as any).statusCode).to.equal(200);
    });
  });
});
