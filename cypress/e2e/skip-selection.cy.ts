describe('Skip Selection Page', () => {
  beforeEach(() => {
    // Stub the API response for skips
    cy.intercept('GET', '**/skips/by-location*', { fixture: 'skips.json' }).as(
      'getSkips',
    );

    // Visit the skip selection page directly
    cy.visit('/order/select-skip');

    // Wait for the API call to complete
    cy.wait('@getSkips');
  });

  it('displays skip selection page with options', () => {
    // Verify that the page title displays correctly
    cy.contains('h2', 'Choose Your Skip Size').should('be.visible');
    cy.contains('p', 'Select the skip size that best suits your needs').should(
      'be.visible',
    );

    // Verify skips are loaded and displayed
    cy.get('[data-testid="skip-card"]').should('have.length.at.least', 1);

    // Verify required skip sizes are present
    cy.contains('4 Yard').should('be.visible');
    cy.contains('6 Yard').should('be.visible');
    cy.contains('8 Yard').should('be.visible');
  });

  it('displays feature badges on skips', () => {
    // Check for the recommended badge on the 8-yard skip
    cy.contains('8 Yard')
      .parent()
      .find('[data-testid="recommended-badge"]')
      .should('exist');

    // Check for the popular badge on the 6-yard skip
    cy.contains('6 Yard')
      .parent()
      .find('[data-testid="popular-badge"]')
      .should('exist');
  });

  it('allows selecting a skip', () => {
    // Click on the first skip
    cy.get('[data-testid="skip-card"]').first().click();

    // Verify that the skip is selected (shows visual indication)
    cy.get('[data-testid="skip-card"]')
      .first()
      .should('have.class', 'border-primary');

    // Check that the continue button or bottom bar shows the selection
    cy.get('[data-testid="bottom-bar"]').should('be.visible');
    cy.get('[data-testid="bottom-bar"]').should('contain', 'Yard Skip');
  });

  it('shows different presentation for unavailable skips', () => {
    // Find unavailable skips
    cy.get('[data-testid="skip-card"][data-unavailable="true"]').should(
      'exist',
    );

    // Verify they have the correct styling and messaging
    cy.get('[data-testid="skip-card"][data-unavailable="true"]')
      .should('have.css', 'opacity')
      .and('not.equal', '1');
  });

  it('handles error states appropriately', () => {
    // Override the initial stub to simulate an error
    cy.intercept('GET', '**/skips/by-location*', {
      statusCode: 500,
      body: { error: 'Server error' },
    }).as('getSkipsError');

    // Reload the page to trigger the error
    cy.reload();
    cy.wait('@getSkipsError');

    // Verify error message is displayed
    cy.contains('Failed to load skips.', { timeout: 10000 }).should(
      'be.visible',
    );
  });
});
