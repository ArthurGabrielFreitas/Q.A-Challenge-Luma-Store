**Análise das ferramentas de teste**

Para dar início à avaliação, é necessário selecionar a ferramenta de teste apropriada. Após uma análise das opções mais amplamente utilizadas, uma escolha foi tomada considerando tanto a eficácia intrínseca da ferramenta quanto a familiaridade pessoal com a mesma para a produção de código.

1. **Ghost Inspector:**
   - *Vantagens:*
     - Interface amigável e fácil de usar, especialmente para quem não tem muita experiência em programação.
     - Suporte para testes visuais, permitindo capturar e comparar screenshots.
   - *Desvantagens:*
     - Pode ser menos flexível para casos de teste mais complexos, pois depende de uma interface gráfica.
     - Limitado em termos de personalização e extensibilidade. Não suporta bem sites sujeitos a mudança com frequência.
     - Ferramenta paga, mas oferece 14 dias para teste.

2. **Selenium:**
   - *Vantagens:*
     - Gratuito e Open Source.
     - Independente de linguagens de programação.
     - Suporte a diversos navegadores e Sistemas Operacionais.
     - Comunidade grande e ativa para dar suporte à ferramenta.
   - *Desvantagens:*
     - Requer um conhecimento significativo de programação para implementação eficaz.
     - Algumas flutuações na estabilidade e confiabilidade, especialmente em relação às atualizações do navegador.
     - Necessário implementar manualmente esperas para os elementos da página carregarem.

3. **Cypress:**
   - *Vantagens:*
     - Execução rápida de testes devido à execução direta no navegador.
     - Sintaxe JavaScript simples e fácil de usar.
     - Interface gráfica robusta para visualização e depuração de testes.
      - Automaticamente aguarda elemento específico da página web carregar antes de continuar o código.
      - Particularmente mais familiar. Ferramenta escolhida para o desafio.
   - *Desvantagens:*
     - Limitado a navegadores que suportam a execução de JavaScript, o que pode ser uma restrição para alguns casos de uso.
     - Menos suporte para testes em paralelo quando comparado a outras ferramentas.
     - Necessário pacotes de terceiros para gerar relatórios.

4. **Robot Framework:**
   - *Vantagens:*
     - Gratuito e Open Source.
     - Linguagem de fácil leitura chamada "Keyword-Driven" facilita a compreensão dos casos de teste.
     - Suporte a várias bibliotecas e extensões.
   - *Desvantagens:*
     - Curva de aprendizado inicial pode ser íngreme para iniciantes.
     - Pode não ser tão flexível quanto linguagens de programação tradicionais para cenários de teste mais complexos.

5. **Cucumber:**
   - *Vantagens:*
     - Facilita a colaboração entre desenvolvedores e profissionais de testes por meio de especificações legíveis.
     - Suporte a várias linguagens, como Java, JavaScript, Ruby, etc.
   - *Desvantagens:*
     - A criação de scripts pode ser mais complexa para iniciantes.
     - A execução pode ser mais lenta em comparação com algumas ferramentas mais leves.
