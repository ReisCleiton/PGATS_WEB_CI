/// <reference types="cypress" />
import cadastro from '../pages/cadastro'
import login from '../pages/login'
import menu from '../pages/menu'
import { faker } from '@faker-js/faker';

describe('Automation Exercise', () => {
  beforeEach(() =>{
    cy.visit('/')
  })
    it('Test Case1: Register User', () => {
        cadastro.preencherForm().verificarSeCadastroFoiConcuido()
    });

    it('Test Case 02: Login User with correct email and password', () => {        
        menu.irParaLoginCadastro()
        login.fazerLogin('QA1723209973468@gmail.com', 'Mypass123')       
        cy.get('i.fa-user').parent().should('contain', 'The QA')        
    });

    it('Test Case 3: Login User with incorrect email and password', () => {
        menu.irParaLoginCadastro()
        login.fazerLogin('QA1455747@gmail.com', 'M1y2p3a4s5s123')        
        cy.get('.login-form form p').should('contain', 'Your email or password is incorrect!')
    });

    it('Test Case 4: Logout User', () => {        
        menu.irParaLoginCadastro()
        login.fazerLogin('QA1723209973468@gmail.com', 'Mypass123')
        cy.get('i.fa-user').parent().should('contain', 'The QA')
        cy.contains('Logout').click()
        cy.url().should('contain', 'login')
    });

    it('Test Case 5: Register User with existing email', () => {        
        menu.irParaLoginCadastro()        
        cadastro.iniciarCadastro(`QA1723209973468@gmail.com`)
        cy.get('.signup-form form p')
          .should('be.visible')
          .and('contain', 'Email Address already exist!')
    });

    it('Test Case 6: Contact Us Form', () => {
        cy.contains('Contact us').click()
        cy.get('.contact-form h2')
          .should('be.visible')
          .and('have.text', 'Get In Touch')
        cy.get('[data-qa="name"]').type('The QA')
        cy.get('[data-qa="email"]').type('theQAzito@gmail.com')
        cy.get('[data-qa="subject"]').type('Test Automation Exercise')
        cy.get('[data-qa="message"]').type('Learnig Test Automation.')
        cy.fixture('example.json').as('file')
        cy.get('input[name="upload_file"]').selectFile('@file')
        cy.get('[data-qa="submit-button"]').click()
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
    });

    it('Test Case 8: Verify All Products and product detail page', () => {
        menu.irParaProdutos()        
        cy.url().should('contains', 'products')        
        cy.get('.title').should('be.visible')
          .and('contain', 'All Products')
        cy.get('.single-products')
          .should('be.visible')
          .and('have.length.at.least', 1)
          .first()
          .parent()
          .contains('View Product')
          .click()           
          cy.get('.product-information > h2').should('be.visible')
          cy.get('.product-information p').should('be.visible').and('have.length', 4)
          cy.get('.product-information span span').should('be.visible')
    });

    it('Test Case 9: Search Product', () => {        
        menu.irParaProdutos()
        cy.url().should('contains', 'products')        
        cy.get('.title').should('be.visible')
          .and('contain', 'All Products')
        cy.get('[id="search_product"]').type('Shirt')
        cy.get('[id="submit_search"]').click()
        cy.get('.title').should('be.visible')
          .and('contain', 'Searched Products')
        cy.get('.single-products')
          .should('be.visible')
          .and('have.length.at.least', 1)
    });

    it('Test Case 10: Verify Subscription in home page', () => {
        const timestamp = new Date().getTime()
        cy.get('.single-widget h2').should('be.visible')
        cy.get('[id="susbscribe_email"]')
        .scrollIntoView()
          .type(`QA${timestamp}@gmail.com`)
        cy.get('[id="subscribe"]').click()
        cy.get('[class="alert-success alert"]')
          .and('contain', 'You have been successfully subscribed!')
          .should('be.visible')
    });

    it('Test Case 15: Place Order: Register before Checkout', () => {
        cadastro.preencherForm()        
        cy.get('i.fa-user').parent().should('contain', Cypress.env('signupName'))
        cy.contains('Products').click()
        cy.contains('Add to cart').click()
        cy.get('u').click()
        cy.get('.active').should('be.visible')
        cy.contains('Proceed To Checkout').click()
        cy.get(':nth-child(2) > .heading').should('be.visible')
        cy.get('[class="form-control"]').type('My first test automation')
        cy.get('[class="btn btn-default check_out"]').click()
        cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type('10')
        cy.get('[data-qa="expiry-year"]').type('2030')
        cy.get('[data-qa="pay-button"]').click()
        cy.get('[id="form"] p').should('contain', 'Congratulations! Your order has been confirmed!')
        cy.get(':nth-child(5) > a').click()
        cy.get('[data-qa="account-deleted"]').should('be.visible')
    });
}); 