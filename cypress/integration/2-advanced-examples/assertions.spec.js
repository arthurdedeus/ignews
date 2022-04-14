/// <reference types="cypress" />

context('Assertions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Implicit Assertions', () => {
    it('Subscribe now button text', () => {
      // https://on.cypress.io/should
      cy.get('.styles_subscribeButton__XJVJx')
        .should('have.text', 'Subscribe now')
    })

    it('Subscription price', () => {
      // https://on.cypress.io/and
      cy.get('.home_hero__lhpWS')
        .find('p')
        .find('span')
        .should('have.text', 'for $9.90 month')
    })
  })

  describe('Explicit Assertions', () => {
    // https://on.cypress.io/assertions
    it('Sign in button text', () => {
      // We can use Chai's BDD style assertions
      cy.get('.styles_signInButton__Ykgb7')
        .should('have.text', 'Sign in with Github')
    })

    // it('pass your own callback function to should()', () => {
    //   // Pass a function to should that can have any number
    //   // of explicit assertions within it.
    //   // The ".should(cb)" function will be retried
    //   // automatically until it passes all your explicit assertions or times out.
    //   cy.get('.assertions-p')
    //     .find('p')
    //     .should(($p) => {
    //       // https://on.cypress.io/$
    //       // return an array of texts from all of the p's
    //       const texts = $p.map((i, el) => Cypress.$(el).text())

    //       // jquery map returns jquery object
    //       // and .get() convert this to simple array
    //       const paragraphs = texts.get()

    //       // array should have length of 3
    //       expect(paragraphs, 'has 3 paragraphs').to.have.length(3)

    //       // use second argument to expect(...) to provide clear
    //       // message with each assertion
    //       expect(paragraphs, 'has expected text in each paragraph').to.deep.eq([
    //         'Some text from first p',
    //         'More text from second p',
    //         'And even more text from third p',
    //       ])
    //     })
    // })

    // it('finds element by class name regex', () => {
    //   cy.get('.docs-header')
    //     .find('div')
    //     // .should(cb) callback function will be retried
    //     .should(($div) => {
    //       expect($div).to.have.length(1)

    //       const className = $div[0].className

    //       expect(className).to.match(/heading-/)
    //     })
    //     // .then(cb) callback is not retried,
    //     // it either passes or fails
    //     .then(($div) => {
    //       expect($div, 'text content').to.have.text('Introduction')
    //     })
    // })

    // it('can throw any error', () => {
    //   cy.get('.docs-header')
    //     .find('div')
    //     .should(($div) => {
    //       if ($div.length !== 1) {
    //         // you can throw your own errors
    //         throw new Error('Did not find 1 element')
    //       }

    //       const className = $div[0].className

    //       if (!className.match(/heading-/)) {
    //         throw new Error(`Could not find class "heading-" in ${className}`)
    //       }
    //     })
    // })

    // it('matches unknown text between two elements', () => {
    //   /**
    //    * Text from the first element.
    //    * @type {string}
    //   */
    //   let text

    //   /**
    //    * Normalizes passed text,
    //    * useful before comparing text with spaces and different capitalization.
    //    * @param {string} s Text to normalize
    //   */
    //   const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()

    //   cy.get('.two-elements')
    //     .find('.first')
    //     .then(($first) => {
    //       // save text from the first element
    //       text = normalizeText($first.text())
    //     })

    //   cy.get('.two-elements')
    //     .find('.second')
    //     .should(($div) => {
    //       // we can massage text before comparing
    //       const secondText = normalizeText($div.text())

    //       expect(secondText, 'second text').to.equal(text)
    //     })
    // })

    // it('assert - assert shape of an object', () => {
    //   const person = {
    //     name: 'Joe',
    //     age: 20,
    //   }

    //   assert.isObject(person, 'value is object')
    // })

    // it('retries the should callback until assertions pass', () => {
    //   cy.get('#random-number')
    //     .should(($div) => {
    //       const n = parseFloat($div.text())

    //       expect(n).to.be.gte(1).and.be.lte(10)
    //     })
    // })
  })
})
