// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("generatePasswordHash", () => {
  // Caracteres permitidos na senha
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Função para gerar uma senha aleatória
  function generateRandomPassword(length, type) {
    let chars;
    let result = "";
    // Particiona a string de caracteres de acordo com a string type
    // Para atender aos requisitos de senha
    if (type == "number") {
      chars = characters.slice(-10);
    } else if (type == "char") {
      chars = characters.slice(0, -10);
    } else {
      chars = characters;
    }
    const charactersLength = chars.length;
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Gerar uma senha aleatória com pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número
  let password =
    generateRandomPassword(1, "number") +
    generateRandomPassword(1, "char").toUpperCase() +
    generateRandomPassword(1, "char").toLowerCase() +
    generateRandomPassword(8, "any");

  // Usa cy.wrap para resolver a execução assíncrona
  cy.wrap(password);
});

// Recebe um seletor e retorna um resultado aleatório para o get desse seletor
Cypress.Commands.add("getRandomElement", (selector) => {
  return cy.get(selector).then((elements) => {
    const visibleElements = elements.filter(":visible");
    if (visibleElements.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * elements.length);
    return cy.wrap(elements[randomIndex]);
  });
});

// Realiza login e salva os cookies, localStorage e sessionStorage em uma session
// Utilizando o email e password como id
// Utilizar o cy.session() está provocando o carrinho não ser carregado normalmente
// Fazer login novamente carrega o carrinho como esperado
Cypress.Commands.add("login", (email, password) => {
  // cy.session([email,password], () => {
  cy.visit("/");

  // Certifica se a página foi carregada buscando a logo da empresa
  cy.get("header").find("img").should("be.visible");

  // Preenche os campos de login
  cy.contains("Sign In").click();
  cy.get("#email").type(email);
  cy.get('[title="Password"]').type(password);
  cy.get("button").contains("Sign In").click();

  // Certifica que o login foi bem sucedido
  cy.get("header").should("contain", "Welcome, ");
  // })
});
