class Cadastro {
    preencherForm() {
        const timestamp = new Date().getTime()                
        cy.get('a[href$=login]').click()
        //cy.contains('Signup').click()  // alternativa 2
        const signupName = 'The QA'
        Cypress.env('signupName', signupName)
        cy.get('[data-qa="signup-name"]').type(Cypress.env('signupName'))
        cy.get('[data-qa="signup-email"]').type(`QA${timestamp}@gmail.com`)
        cy.get('[data-qa="signup-button"]').click()
        cy.get('[id="id_gender1"]').check()        
        cy.get('[id="password"]').type('Mypass123', {log: false})
        cy.get('[data-qa="days"]').select('22')
        cy.get('[data-qa="months"]').select('2')
        cy.get('[data-qa="years"]').select('1997')
        cy.get('[id="first_name"]').type('Alameda')
        cy.get('[data-qa="last_name"]').type('Clover')
        cy.get('[data-qa="company"]').type('Zpp')
        cy.get('[data-qa="address"]').type('Zpp Parts')
        cy.get('[data-qa="address2"]').type('Street2')
        cy.get('[data-qa="country"]').select('Canada')  
        cy.get('[data-qa="state"]').type('Alberta')     
        cy.get('[data-qa="city"]').type('Edmonton')  
        cy.get('[data-qa="zipcode"]').type('T5K')
        cy.get('[data-qa="mobile_number"]').type('(49) 35664747')
        cy.get('[data-qa="create-account"]').click()
        cy.url().should('includes', 'account_created') 
        // ->https://automationexercise.com/account_created
        cy.get('[data-qa="account-created"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
        return this
    }

    iniciarCadastro(usuario) {
        cy.get('[data-qa="signup-name"]').type('The QA')
        cy.get('[data-qa="signup-email"]').type(usuario)
        cy.get('[data-qa="signup-button"]').click()
        return this
    }

    verificarSeCadastroFoiConcuido() {
        cy.contains(`Logged in as ${Cypress.env('signupName')}`)
        return this
    }
}

export default new Cadastro()