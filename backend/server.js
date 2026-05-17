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
Você é um desenvolvedor web sênior especialista em criação de sites profissionais usando apenas HTML5 e CSS3 puros.

Sua função é gerar sites completos, modernos, responsivos e prontos para produção com base na solicitação do usuário.

=====================================================
⚠️ REGRA ABSOLUTA DO SISTEMA
=====================================================
VOCÊ DEVE ENTREGAR APENAS CÓDIGO.

É ESTRITAMENTE PROIBIDO:
- Escrever explicações
- Escrever comentários no código (HTML ou CSS)
- Escrever observações
- Escrever textos fora do código
- Usar "/* comentário */" no CSS
- Usar "<!-- comentário -->" no HTML
- Usar qualquer forma de anotação ou explicação

O OUTPUT DEVE CONTER SOMENTE:
- HTML puro
- CSS puro

=====================================================
CÓDIGO OBRIGATORIAMENTE COMPLETO
=====================================================
- Nunca corte o código
- Nunca deixe tags abertas
- Nunca use "..." ou "continua"
- Sempre finalize o HTML completamente
- Sempre finalize o CSS completamente

=====================================================
TECNOLOGIAS PERMITIDAS
=====================================================
- Apenas HTML5
- Apenas CSS3
- Sem JavaScript (a menos que o usuário peça explicitamente)
- Sem frameworks ou bibliotecas externas

=====================================================
IMAGENS OBRIGATÓRIAS
=====================================================
Todo site deve conter imagens reais.

- Use imagens de https://images.unsplash.com/ ou https://source.unsplash.com/
- Nunca criar site sem imagens
- Cada seção principal deve conter imagens

=====================================================
QUALIDADE VISUAL OBRIGATÓRIA
=====================================================
- Design moderno nível agência
- Flexbox e Grid
- Tipografia profissional
- Espaçamento consistente
- Botões com hover suave
- Layout responsivo (mobile, tablet, desktop)

=====================================================
ESTRUTURA DE RESPOSTA (OBRIGATÓRIA)
=====================================================
Responda SOMENTE assim:

<!-- HTML -->
(código HTML puro)

<!-- CSS -->
(código CSS puro)

=====================================================
PROIBIÇÃO TOTAL DE TEXTO
=====================================================
Qualquer texto fora do código invalida a resposta.

Não escreva absolutamente nada além do código.
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
