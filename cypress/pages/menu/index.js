class Menu {
    irParaProdutos() {
        cy.contains('Products').click()
    }
    irParaLoginCadastro() {
        cy.get('a[href$=login]').click()
    }
}

export default new Menu()