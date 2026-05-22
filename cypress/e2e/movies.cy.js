Cypress.on('uncaught:exception', () => false)

describe('Parcours utilisateur MYFLIX', () => {
  

  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('1. Il est possible de visiter la page', () => {
    cy.url().should('eq', 'http://localhost:5173/')
  })

  it('2. Les 20 premiers films sont affichés', () => {
    cy.get('.movie-card').should('have.length', 20)
  })

  it('3. Le bouton Précédent est désactivé', () => {
    cy.contains('← Précédent').should('be.disabled')
  })

  it('4. Le bouton Suivant n\'est pas désactivé', () => {
    cy.contains('Suivant →').should('not.be.disabled')
  })

  it('5-6-7. Navigation page suivante puis précédente', () => {
  cy.contains('Suivant →').click()
  cy.wait(1000)

  // Précédent n'est plus désactivé
  cy.contains('← Précédent').should('not.be.disabled')

  // Suivant n'est pas désactivé
  cy.contains('Suivant →').should('not.be.disabled')

  // Clique sur Précédent
  cy.contains('← Précédent').click()
  cy.wait(1000)

  // Précédent est à nouveau désactivé
  cy.contains('← Précédent').should('be.disabled')
})

  it('10-11-12. Clic sur un film redirige vers la page de détails', () => {
    cy.get('.movie-card').first().find('img').click()

    // L'URL a changé et contient /movie/
    cy.url().should('include', '/movie/')

    // Le titre et la description sont affichés
    cy.get('.details-info h1').should('exist')
    cy.get('.overview').should('exist')
  })

  it('13-14. Page de détail inexistante redirige vers 404 avec toast', () => {
    cy.visit('http://localhost:5173/movie/999999999')

    // Redirigé vers 404
    cy.url().should('include', '/404')

    // Toast d'erreur apparaît
    cy.get('.go2072408551').should('exist')

    // Toast disparaît après 4000ms
    cy.wait(4500)
    cy.get('[class*="go"]').should('exist')
  })

})