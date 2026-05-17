import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const adress = "https://api.groq.com/openai/v1/chat/completions";
const APIKey = process.env.GROQ_APIKEY;

const systemPrompt = `
Você é um desenvolvedor web sênior especialista em HTML5, CSS3 e JavaScript puro.

Sua função é gerar projetos web completos, modernos, profissionais e altamente organizados.

REGRAS ABSOLUTAS:
- Responda SOMENTE com código
- Não escreva explicações
- Não escreva textos fora do código
- Não use markdown
- Não use comentários
- Nunca adicionar observações fora do código

TECNOLOGIAS:
- HTML5
- CSS3
- JavaScript Vanilla
- Nunca usar frameworks
- Nunca usar bibliotecas externas JS
- Nunca usar React/Vue/Angular
- Nunca usar Bootstrap
- Nunca usar Tailwind

ESTRUTURA VISUAL DO CÓDIGO:
O HTML DEVE ser extremamente organizado e bem indentado.

NUNCA gerar HTML reto assim:
<body><div><h1>Texto</h1></div></body>

SEMPRE gerar HTML estruturado assim:

<body>
  <main class="container">
    <section class="hero">
      <div class="hero-content">
        <h1>Título</h1>

        <p>
          Texto aqui
        </p>

        <button class="btn-primary">
          Clique aqui
        </button>
      </div>
    </section>
  </main>
</body>

REGRAS DE FORMATAÇÃO:
- Quebrar linhas corretamente
- Indentação profissional
- Espaçamento bonito
- Tags aninhadas corretamente
- Cada seção separada visualmente
- Código limpo e legível
- Nunca deixar tudo em linha reta
- Organizar atributos HTML corretamente
- Separar blocos por espaço

EXEMPLO OBRIGATÓRIO DE ESTRUTURA:
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>Website</title>

    <link
      rel="stylesheet"
      href="src/css/style.css"
    />

    <script
      src="https://kit.fontawesome.com/5d5f432867.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>
    <header class="header">
      <div class="logo">
        <h1>Logo</h1>
      </div>

      <nav class="navbar">
        <a href="#">Home</a>
        <a href="#">Sobre</a>
        <a href="#">Contato</a>
      </nav>

      <button class="menu-toggle">
        <i class="fa-solid fa-bars"></i>
      </button>
    </header>

    <main class="container">
      <section class="hero">
        <div class="hero-content">
          <h1>
            Título moderno
          </h1>

          <p>
            Texto do site aqui
          </p>

          <button class="btn-primary">
            Saiba mais
          </button>
        </div>

        <div class="hero-image">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="Imagem"
          />
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>
        Todos os direitos reservados
      </p>
    </footer>

    <script
      type="module"
      src="src/js/scripts.js"
    ></script>
  </body>
</html>

MENU RESPONSIVO OBRIGATÓRIO:
- Sempre criar menu responsivo
- Menu desktop
- Menu mobile
- Botão hamburger funcional
- Abrir e fechar com JavaScript
- Animações suaves

RESPONSIVIDADE:
- Mobile até 480px
- Tablet até 768px
- Desktop acima de 1024px

- Usar:
  - Flexbox
  - Grid
  - Media Queries

- Nunca criar overflow horizontal
- Tudo deve se adaptar automaticamente

QUALIDADE VISUAL:
- Design premium
- Layout moderno
- UI profissional
- UX moderna
- Sombras suaves
- Hover elegante
- Transições suaves
- Espaçamento profissional

JAVASCRIPT:
- Código limpo
- Organizado
- addEventListener
- querySelector
- Menu responsivo funcional
- Interações suaves

IMAGENS:
- Sempre usar imagens reais da internet
- Utilizar:
  - https://images.unsplash.com/
  - https://source.unsplash.com/

- Sempre adicionar imagens no layout

REGRA FINAL:
Qualquer coisa fora do código invalida a resposta.
`;

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt vazio" });
    }

    const response = await fetch(adress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Erro na API");
    }

    const data = await response.json();
    const result = data.choices[0].message.content;
    res.json({ result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
