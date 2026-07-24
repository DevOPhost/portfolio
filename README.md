# Leonardo Farias Martins | Portfolio

Personal portfolio and professional services presentation for Leonardo Farias Martins, a Systems Analyst and Developer with a degree in Computer Science.

The website serves two audiences: clients looking for digital products and application security support, and recruiters interested in professional experience, projects and education. Portuguese is the default language, with an English version available from the language selector.

## Pages

The project uses a Vite multi-page application structure with six real HTML entry points:

- **Home**: value proposition, featured services, selected projects and main calls to action.
- **Services**: websites, web systems, responsive mobile experiences, automation, integrations and application security consulting.
- **Projects**: product showcases based on real project interfaces.
- **About**: professional profile, work approach, technologies and differentiators.
- **Career**: experience, education, supervised internships, certificates, events, resume and supporting documents.
- **Contact**: separate paths for clients and recruiters.

Each page has its own canonical URL, title, description and social sharing metadata.

## Tech stack

- React
- TypeScript
- Vite
- CSS
- Lucide React
- Simple Icons
- GitHub Pages

## Project structure

```text
.
├── index.html
├── servicos/index.html
├── projetos/index.html
├── sobre/index.html
├── carreira/index.html
├── contato/index.html
├── src/
├── public/
├── scripts/
├── vite.config.ts
└── .github/workflows/deploy.yml
```

The six HTML files share the same React application. Vite builds each one as an independent page while reusing the application bundle and public assets.

## Running locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run the TypeScript check:

```bash
npm run lint
```

## GitHub Pages deployment

The repository includes a deployment workflow at [deploy.yml](.github/workflows/deploy.yml). The workflow runs `npm run build:github`, which sets `/portfolio/` as the base path. The build produces the six page directories inside `dist`, which allows direct access and page refreshes on GitHub Pages.

Recommended setup:

1. Push the repository to `https://github.com/DevOPhost/portfolio.git`.
2. Open **Settings > Pages** on GitHub.
3. Select **GitHub Actions** as the publishing source.
4. Push to the `main` branch or run the workflow manually.

## Cloudflare Pages deployment

The default `npm run build` uses `/` as the base path and is intended for Cloudflare Pages. Use the React (Vite) preset, `npm run build` as the build command, `dist` as the output directory, an empty root directory, and `main` as the production branch.

Do not commit `node_modules` or `dist`. Both are generated locally and already covered by `.gitignore`.

## Contact channels

- Portfolio: https://devophost.github.io/portfolio/
- Email: [leonardofarias.tech@gmail.com](mailto:leonardofarias.tech@gmail.com)
- GitHub: https://github.com/DevOPhost
- LinkedIn: https://www.linkedin.com/in/leonardo-farias-martins-160340215/
- Project inquiries: use the **Request a project** WhatsApp CTA available on the website.

## Note

This is a personal portfolio. Academic documents and certificates are available as supporting material in the Career page and are not part of the main commercial journey.

---

# Leonardo Farias Martins | Portfólio

Portfólio pessoal e apresentação de serviços profissionais de Leonardo Farias Martins, Analista de Sistemas e Desenvolvedor formado em Ciência da Computação.

O site atende a dois públicos: clientes que procuram produtos digitais e apoio em segurança de aplicações, e recrutadores interessados em experiência, projetos e formação. Português é o idioma padrão, com versão em inglês disponível pelo seletor de idioma.

## Páginas

O projeto usa uma estrutura multi-page application do Vite com seis entradas HTML reais:

- **Início**: proposta de valor, serviços em destaque, projetos selecionados e principais chamadas para ação.
- **Serviços**: sites, sistemas web, experiências mobile responsivas, automações, integrações e consultoria em segurança de aplicações.
- **Projetos**: showcases de produto baseados nas interfaces reais dos projetos.
- **Sobre**: perfil profissional, forma de trabalho, tecnologias e diferenciais.
- **Carreira**: experiência, formação, estágios supervisionados, certificados, eventos, currículo e documentos de apoio.
- **Contato**: caminhos separados para clientes e recrutadores.

Cada página possui URL canônica, título, descrição e metadados próprios para compartilhamento.

## Tecnologias

- React
- TypeScript
- Vite
- CSS
- Lucide React
- Simple Icons
- GitHub Pages

## Estrutura do projeto

```text
.
├── index.html
├── servicos/index.html
├── projetos/index.html
├── sobre/index.html
├── carreira/index.html
├── contato/index.html
├── src/
├── public/
├── scripts/
├── vite.config.ts
└── .github/workflows/deploy.yml
```

Os seis arquivos HTML usam a mesma aplicação React. O Vite gera cada entrada como uma página independente, reaproveitando o bundle da aplicação e os assets públicos.

## Como rodar localmente

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Gere o build de produção:

```bash
npm run build
```

Visualize o build de produção:

```bash
npm run preview
```

Execute a verificação do TypeScript:

```bash
npm run lint
```

## Publicação no GitHub Pages

O repositório inclui o workflow de publicação em [deploy.yml](.github/workflows/deploy.yml). O workflow executa `npm run build:github`, que define `/portfolio/` como caminho-base. O build gera os seis diretórios de páginas dentro de `dist`, permitindo acesso direto e atualização da página no GitHub Pages.

Configuração recomendada:

1. Envie o repositório para `https://github.com/DevOPhost/portfolio.git`.
2. No GitHub, abra **Settings > Pages**.
3. Selecione **GitHub Actions** como origem da publicação.
4. Faça push para a branch `main` ou execute o workflow manualmente.

## Publicação no Cloudflare Pages

O comando padrão `npm run build` usa `/` como caminho-base e é destinado ao Cloudflare Pages. Use o preset React (Vite), `npm run build` como comando de build, `dist` como diretório de saída, diretório raiz vazio e `main` como branch de produção.

Não versione `node_modules` ou `dist`. Ambos são gerados localmente e já estão cobertos pelo `.gitignore`.

## Canais de contato

- Portfólio: https://devophost.github.io/portfolio/
- E-mail: [leonardofarias.tech@gmail.com](mailto:leonardofarias.tech@gmail.com)
- GitHub: https://github.com/DevOPhost
- LinkedIn: https://www.linkedin.com/in/leonardo-farias-martins-160340215/
- Solicitações de projeto: use o CTA **Solicitar projeto** do WhatsApp disponível no site.

## Observação

Este é um portfólio pessoal. Documentos acadêmicos e certificados ficam disponíveis como material de apoio na página Carreira e não fazem parte da jornada comercial principal.
