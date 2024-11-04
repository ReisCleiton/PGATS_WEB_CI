class Login {
    fazerLogin (usuario , senha) {
        cy.get('[data-qa="login-email"]').type(usuario)
        cy.get('[data-qa="login-password"]').type(senha)
        cy.get('[data-qa="login-button"]').click()
    }
}

export default new Login()