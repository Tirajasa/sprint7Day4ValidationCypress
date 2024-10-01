import { errorMessages } from "../../src/components/Register";

describe('Register Page', () => {
  beforeEach(()=>{
    //Arrange
    cy.visit('http://localhost:5173');
  })
  describe('Error Messages', () => {
    it('Name input errors for less than 3 chars.', () => {
    
      //Act
      cy.get('[data-cy="name-input"]').type("ek");
      //Assert
      cy.contains(errorMessages.name);

    });
    it('Lastname input errors for less than 3 chars.', () => {
     
      //Act
      cy.get('[data-cy="lastname-input"]').type("er");
      //Assert
      cy.contains(errorMessages.lastname);

    });
    it('Email input errors if it is not validated such as:uekineraydin@gmail.',()=>{
     
        //Act
        cy.get('[data-cy="email-input"]').type("uekineraydin@gmail.");
        //Assert
        cy.contains(errorMessages.email);
    });
    it('Password input errors if it is not strong like 1234',()=>{
     
      //Act
      cy.get('[data-cy="password-input"]').type("1234");
      //Assert
      cy.get('[data-cy="error-message"]').should("have.length",1)
      cy.get('[data-cy="error-message"]').should("have.text",errorMessages.password);
  }); 
  it('Button is disabled while inputs are invalidated',()=>{
 

    //Act
    cy.get('[data-cy="name-input"]').type("ek");

    cy.get('[data-cy="lastname-input"]').type("er");

    cy.get('[data-cy="email-input"]').type("uekineraydin@gmail.");

    cy.get('[data-cy="password-input"]').type("1234");

    //Assert
    cy.get('[data-cy="submit-button"]').should('be.disabled');
});
  })
  describe('Inputs are validated', () => {
    it('Button is enabled when all inputs are validated', () => {
    
      //Act
      cy.get('[data-cy="name-input"]').type("ekin");
      cy.get('[data-cy="lastname-input"]').type("eraydin");
      cy.get('[data-cy="email-input"]').type("uekineraydin@gmail.com");
      cy.get('[data-cy="password-input"]').type("1234AS!d");
      //Assert
      cy.get('[data-cy="submit-button"]').should('be.enabled');

    });
    it('Id is visible when all inputs are validated and button is clicked ', () => {
 
        //Act
      cy.get('[data-cy="name-input"]').type("ekin");
      cy.get('[data-cy="lastname-input"]').type("eraydin");
      cy.get('[data-cy="email-input"]').type("uekineraydin@gmail.com");
      cy.get('[data-cy="password-input"]').type("1234AS!d");
      cy.get('[data-cy="submit-button"]').click();
   //Assert
     cy.get('[data-cy="id-output"]').should("be.visible");

    });
  }); 
  
})