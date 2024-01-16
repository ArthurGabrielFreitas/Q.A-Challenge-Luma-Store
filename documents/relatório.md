# Relatório do Processo de Conclusão do Desafio

## Introdução

Ao iniciar o desafio, a primeira etapa consistiu na leitura detalhada do README do [desafio](./README-desafio.md). Posteriormente, conduzi uma [pesquisa sobre cada ferramenta sugerida](./análise-de-ferramentas.md), detalhando suas características positivas e negativas.

## Casos de Teste

Após compreender os requisitos do projeto, realizei estudos de caso manualmente para entender as funcionalidades do site, tomando notas sobre as ações necessárias para a automação.

## Processo de Automação

1. **Melhores Práticas Cypress:**

   - Adição de atributos `data-*` não sendo possível devido ao teste em um site de terceiros.
   - Utilização de `classe`, `tag` ou texto para capturar elementos, evitando uso de `id`.
   - Configuração do `baseurl` em `cypress.config` para garantir consistência.
   - Desativação do erro `Uncaught Exceptions` em `support/e2e.js`, pois isso deveria ser manipulado no backend.

2. **Login e Cache:**

   - Criação de um teste para criar um usuário, obtendo dados via API externa.
   - Implementação de método em `commands.js` para gerar senha forte aleatória.
   - Desenvolvimento de método para realizar login e salvar cache e cookies numa session.
   - Uso de `beforeEach` para realizar login antes de cada teste.

3. **Carrinho de Compras:**

   - Persistência de itens no carrinho por meio de verificação de carregamento de elemento na página.
   - Adição de item aleatório ao carrinho, selecionando tamanho e cor aleatórios.

4. **Finalização da Compra:**
   - Cadastramento de endereço do usuário pela página da conta do mesmo.

## Conclusão

O processo abordou desafios como persistência de dados entre testes e interações com elementos específicos de site de terceiros. Soluções foram implementadas para garantir uma execução robusta e eficiente dos testes.

Os testes finais incluíram a criação de conta, cadastro de endereço, pesquisa e adição de itens ao carrinho, adição de item aleatório do catálogo de moda masculina ao carrinho, comentário no último item adicionado e conclusão da compra com sucesso.
