const url = "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb";
let userTest;
let passwordTest;

describe("Criar conta para testes", () => {
  // Realiza um request para a RandomAPI para gerar um novo usuário aleatório
  // Não é possível utilizar um usuário fixo, pois não existe um botão para deletar usuário
  // Assim, o teste de criação teria sucesso na primeira vez, e falharia em todas as outras
  before(() => {
    cy.request(url).then((res) => {
      const objs = res.body.results[0];
      const rand = parseInt(Math.random() * objs.length);
      userTest = objs[rand];
      cy.generatePasswordHash().then((password) => {
        passwordTest = password;
      });
    });
    cy.visit("/");

    // Certifica se a página foi carregada buscando a logo da empresa
    cy.get("header").find("img").should("be.visible");
  });

  it("Criar conta na loja", () => {
    cy.contains("Create an Account").click();

    // Certifica que foi redirecionado para a página correta
    cy.get("h1").should("contain", "Create New Customer Account");

    // Preenche os campos com as informações do usuário
    cy.get("[name=firstname]").type(userTest.first);
    cy.get("[name=lastname]").type(userTest.last);
    cy.get("[name=email]").type(userTest.email);
    cy.get("[title=Password]").type(passwordTest);
    cy.get("[name=password_confirmation]").type(passwordTest);

    cy.get("main").contains("Create an Account").click();

    // Certifica de obter mensagem de sucesso
    cy.get("main").should(
      "contain",
      "Thank you for registering with Main Website Store."
    );
  });
});

describe("Realizar testes na loja", () => {
  // Realiza login antes de todos os testes
  // Necessário para manter informações do cache, como itens do carrinho
  beforeEach(() => {
    cy.login(userTest.email, passwordTest);
  });

  it("Cadastra um endereço", () => {
    // Encontra o menu toggle, clica em My Account e certifica de que foi redirecionado
    cy.get("header").find(".customer-welcome button").click();
    cy.contains("My Account").click();

    cy.get("h1").should("contain", "My Account");

    // Clica em Manage Addresses e certifica de que foi redirecionado
    cy.contains("Manage Addresses").click();

    cy.get("h1").should("contain", "Add New Address");

    // Preenche os campos para cadastrar um endereço
    cy.get("[name^=street]").first().type(userTest.address);
    cy.get('[name="city"]').type("TotallyRealCity");
    cy.get('[name="telephone"]').type("888-555-111");

    // Utiliza a função customizada para selecionar um país aleatório
    cy.getRandomElement('[name="country_id"] option')
      .invoke("val")
      .then((value) => {
        cy.get("[name='country_id']").select(value);
      });

    // Utiliza a função customizada para selecionar um país aleatório
    // Porém, se não forem encontradas as opções do menu dropdown, é escrito uma string de teste
    cy.getRandomElement('[name="region_id"] option').then((element) => {
      if (element && element.val) {
        cy.wrap(element)
          .invoke("val")
          .then((value) => {
            cy.get('[name="region_id"]').select(value);
          });
      } else {
        cy.get('[name="region"]').type("Região do usuário");
      }
    });

    cy.get('[name="postcode"]').type("66654");

    cy.get('[title="Save Address"]').click();

    // Certifica que o endereço foi salvo
    cy.get("main").should("contain", "You saved the address.");
  });

  it("Pesquisa e adiciona último item ao carrinho", () => {
    // Pesquisa por shirt no site
    cy.get("header input").type("shirt");
    cy.get("header form button").click();

    // Certifica que foi redirecionado
    cy.url().should("contain", "catalogsearch/result/?q=shirt");

    // Certifica que a lista de produtos não é vazia e clica no último item
    cy.get(".item.product.product-item").should("not.be.empty");
    cy.get(".item.product.product-item").last().click();

    cy.get(".message-success").should("not.exist");

    // Clica em um tamanho e uma cor aleatória na lista
    cy.getRandomElement(".swatch-option.text").click();
    cy.getRandomElement(".swatch-option.color").click();

    // Clica no botão para adicionar ao carrinho
    cy.get("#product-addtocart-button").click();

    // Verifica se o item foi adicionado ao carrinho com sucesso
    cy.get("main").should("contain", "to your shopping cart.");

    // Necessário aguardar este elemento ficar visível
    // Para salvar e carregar corretamente o conteúdo do carrinho
    cy.get(".counter.qty").should("exist");
    cy.get(".counter-number").should("be.visible");
  });

  it("Adiciona um item aleatório ao carrinho", () => {
    // Necessário aguardar este elemento ficar visível
    // Para salvar e carregar corretamente o conteúdo do carrinho
    cy.get(".counter.qty").should("exist");
    cy.get(".counter-number").should("be.visible");

    // Clica na categoria Men no elemento de navegação
    cy.get("#ui-id-5").click();
    // cy.get(".categories-menu").within(() => {
    // Clica numa categoria aleatória no menu
    cy.getRandomElement(".categories-menu a").click();
    // });

    // Clica num item aleatório do catálogo de produtos
    cy.getRandomElement(".item.product.product-item").click();

    // Clica em um tamanho e uma cor aleatória na lista
    cy.getRandomElement(".swatch-option.text").click();
    cy.getRandomElement(".swatch-option.color").click();

    // Clica no botão para adicionar ao carrinho
    cy.get("#product-addtocart-button").click();

    // Verifica se o item foi adicionado ao carrinho com sucesso
    cy.get("main").should("contain", "to your shopping cart.");

    // Necessário aguardar este elemento ficar visível
    // Para salvar e carregar corretamente o conteúdo do carrinho
    cy.get(".counter.qty").should("exist");
    cy.get(".counter-number").should("be.visible");
  });

  it("Deixa um comentário no primeiro item do carrinho", () => {
    // Necessário aguardar este elemento ficar visível
    // Para salvar e carregar corretamente o conteúdo do carrinho
    cy.get(".counter.qty").should("exist");
    cy.get(".counter-number").should("be.visible");

    // Clica no ícone do carrinho
    cy.contains("My Cart").click();

    // Clica no link do primeiro item do carrinho
    cy.get("header ol li strong a").first().click();

    // Clica na aba de reviews
    cy.get('#tab-label-reviews-title').click();

    // Dá uma nota e preenche os campos da review
    cy.get("#Rating_1_label").click();
    cy.get("#nickname_field").type(userTest.first);
    cy.get("#summary_field").type("Muito difícil de avaliar");
    cy.get("#review_field").type(
      "Eu até daria uma nota melhor pra fortalecer, mas foi difícil clicar na estrela."
    );

    // Envia a review
    cy.contains("Submit Review").click();

    // Verifica se a review foi enviada
    cy.get("main").should(
      "contain",
      "You submitted your review for moderation."
    );
  });

  it("FInaliza compra", () => {
    // Necessário aguardar este elemento ficar visível
    // Para salvar e carregar corretamente o conteúdo do carrinho
    cy.get(".counter.qty").should("exist");
    cy.get(".counter-number").should("be.visible");

    // Clica no ícone do carrinho
    cy.contains("My Cart").click();
    cy.get("[title='Proceed to Checkout']").click();

    // Certifica que foi redirecionado
    cy.url().should("contain", "/checkout/#shipping");

    // Preenche a opção de frete
    cy.get("[type=radio]").last().click();

    // Avança para pagamento
    cy.get("button").contains("Next").click();

    // Certifica que foi redirecionado
    cy.url().should("contain", "/checkout/#payment");

    // Finaliza a compra
    cy.get("button").contains("Place Order").click();

    // Certifica que a compra foi concluída
    cy.get("main").should("contain", "Thank you for your purchase!");

    // Certifica que o número da compra foi gerado
    cy.get("main").should("contain", "Your order number is:");
  });
});
