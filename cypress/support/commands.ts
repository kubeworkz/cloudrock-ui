/* eslint-disable no-redeclare */
// Must be declared global to be detected by typescript (allows import/export)
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mockUser(userName?: string): Chainable;
      mockCustomer(): Chainable;
      mockChecklists(): Chainable;
      mockConfigs(): Chainable;
      fillAndSubmitLoginForm(username?: string, password?: string): Chainable;
      setToken(): Chainable;
      openDropdownByLabel(value: string): Chainable;
      openDropdownByLabelForce(value: string): Chainable;
      openWorkspaceSelector(): Chainable;
      selectTheFirstOptionOfDropdown(): Chainable;
      selectDate(): Chainable;
      openSelectDialog(selectId: string, option: string): Chainable;
      buttonShouldBeDisabled(btnClass: string): Chainable;
      waitForSpinner(): Chainable;
    }
  }
}

import '../integration/openstack/instance/commands';

Cypress.Commands.add('setToken', () => {
  window.localStorage.setItem('AUTH_TOKEN', 'valid');
});

// Fill and sumbit login form
Cypress.Commands.add('fillAndSubmitLoginForm', (username, password) => {
  username = username || 'staff';
  password = password || 'secret';

  cy
    // Fill and submit the form
    .log('fill and submit login form')

    // Type username
    .get('input[placeholder="Username"]', { log: false })
    .type(username, { log: false })

    // Type password
    .get('input[placeholder="Password"]', { log: false })
    .type(password, { log: false })

    // Press button to submit login form
    .get('button[type="submit"]', { log: false })
    .click({ log: false });
});

Cypress.Commands.add('waitForSpinner', () => {
  cy.get('.fa-spinner.fa-spin').should('not.exist');
});

Cypress.Commands.add('openDropdownByLabel', (label) => {
  cy.get('label')
    .contains(label)
    .next()
    .find('div[class$="placeholder"]') // select classnames which end with "placeholder"
    .click({ force: true });
});

Cypress.Commands.add('openDropdownByLabelForce', (label) => {
  cy.openDropdownByLabel(label).openDropdownByLabel(label);
});

Cypress.Commands.add('selectTheFirstOptionOfDropdown', () => {
  cy.get('*div[id^="react-select"]').first().click({ force: true }); // get ids which start with "react-select"
});

Cypress.Commands.add('selectDate', () => {
  cy.get("input[placeholder='YYYY-MM-DD']")
    .click()
    .get(
      '.date-picker-popover .popover-content tbody tr:last-child td:first-child',
    )
    .click();
});

Cypress.Commands.add('openWorkspaceSelector', () => {
  cy.waitForSpinner()
    // Workspace selector indicates user workspace
    .get('.select-workspace-toggle.btn-info')

    // Open workspace selector by clicking on button
    .contains('Select workspace')
    .click()

    // Modal dialog should be displayed
    .get('.modal-content')
    .should('be.visible')

    // Wait until dialog is loaded
    .waitForSpinner();
});

Cypress.Commands.add('mockConfigs', () => {
  cy.intercept('GET', '/api/configuration/', {
    fixture: 'configuration.json',
  })
    .intercept('GET', '/api/customer-permissions/', [])
    .intercept('GET', '/api/project-permissions/', [])
    .intercept('GET', '/api/events/', []);
});

Cypress.Commands.add('mockUser', (userName) => {
  const userData = userName === 'admin' ? 'admin.json' : 'alice.json';

  const userConfiguration =
    userName === 'admin' ? 'configuration-admin.json' : 'configuration.json';

  cy.intercept('GET', '/api/configuration/', {
    fixture: userConfiguration,
  })
    .intercept('POST', '/api-auth/password/', { token: 'valid' })
    .intercept('GET', '/api/users/me/', {
      fixture: `users/${userData}`,
    })
    .intercept('GET', '/api/customer-permissions/', [])
    .intercept('GET', '/api/project-permissions/', [])
    .intercept('GET', '/api/events/', []);
});

Cypress.Commands.add('mockCustomer', () => {
  cy.intercept(
    'GET',
    '/api/customers/bf6d515c9e6e445f9c339021b30fc96b/counters/',
    {},
  )
    .intercept('GET', '/api/customers/bf6d515c9e6e445f9c339021b30fc96b/', {
      fixture: 'customers/alice.json',
    })
    .intercept('GET', '/api/invoices/', [])
    .intercept('GET', '/api/projects/', [])
    .intercept('GET', '/api/marketplace-orders/', []);
});

Cypress.Commands.add('mockChecklists', () => {
  cy.intercept('HEAD', '/api/marketplace-checklists/', {
    headers: {
      'x-result-count': '1',
    },
  }).intercept('GET', '/api/marketplace-checklists-categories/', {
    fixture: 'marketplace/checklists_categories.json',
  });
});
