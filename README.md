# Lumina

Tela de cadastro responsiva desenvolvida com React, TypeScript e Vite.

## Sobre o projeto

O Lumina é uma interface de criação de conta com duas áreas principais: uma ilustração acompanhada de uma breve apresentação visual e um formulário de cadastro.

O projeto começou como um exercício de front-end e foi aprimorado com uma estrutura mais atual, mantendo a ideia e a identidade visual originais. A interface foi pensada para funcionar em telas grandes, tablets e celulares sem depender de bibliotecas de componentes.

## Funcionalidades

O formulário possui:

- Campo de nome e sobrenome.
- E-mail com mensagens específicas para ausência de `@` ou `.com`.
- Celular obrigatório, aceitando somente números.
- Senha e confirmação de senha.
- Controle para mostrar ou ocultar a senha.
- Seleção opcional de gênero.
- Mensagens de erro acessíveis e feedback de sucesso.
- Estado de carregamento durante o envio.

As validações acontecem no navegador. O cadastro é apenas uma simulação neste momento: os dados não são armazenados e não são enviados para uma API.

## Tecnologias

- React para a interface e o comportamento da tela.
- TypeScript para tipagem dos dados e estados do formulário.
- Vite para desenvolvimento e build da aplicação.
- HTML semântico para estruturar o formulário.
- CSS para o visual, estados de interação e responsividade.

As dependências foram mantidas no mínimo necessário para o funcionamento do projeto.

## Requisitos

- Node.js 18 ou superior.
- npm.

## Como executar

Instale as dependências do projeto:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente `http://localhost:5173`.

Para verificar a compilação e gerar os arquivos de produção:

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

## Estrutura do projeto

```text
src/
	App.tsx        # Tela e lógica do formulário
	main.tsx       # Entrada da aplicação React
	styles.css     # Estilos e regras responsivas
	vite-env.d.ts  # Tipos dos assets usados pelo Vite

imagens/
	*.jpg          # Ilustração da área visual

index.html       # Documento HTML principal
package.json     # Scripts e dependências
vite.config.ts   # Configuração do Vite
```

## Próximos passos

O próximo avanço natural é conectar o formulário a um back-end. A partir disso, o projeto poderá receber autenticação, persistência dos usuários, uma tela de login real e testes automatizados.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

Desenvolvido por **Joice Alves**.
