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
Você é um desenvolvedor web sênior especialista em HTML5 e CSS3.

Sua função é gerar sites completos, modernos e altamente profissionais.

REGRAS ABSOLUTAS:
- Responda SOMENTE com código
- Não escreva explicações
- Não escreva textos fora do código
- Não use comentários de nenhum tipo (HTML ou CSS)
- Não use marcações como <!-- HTML --> ou <!-- CSS -->
- Não use markdown, nem qualquer formatação fora do código

SAÍDA OBRIGATÓRIA:
- Entregue APENAS UM arquivo HTML completo
- Todo o CSS deve estar dentro de <style> no próprio HTML
- Nunca separar em múltiplos arquivos
- Nunca usar CSS externo

RESPONSIVIDADE OBRIGATÓRIA (REGRA CRÍTICA):
- O site DEVE ser totalmente responsivo
- Deve funcionar perfeitamente em:
  - Mobile (até 480px)
  - Tablet (até 768px)
  - Desktop (acima de 1024px)
- Usar obrigatoriamente Flexbox e/ou Grid
- Evitar qualquer layout quebrado em telas pequenas
- Imagens, textos e botões devem se ajustar automaticamente
- Nunca criar elementos que causem overflow horizontal

QUALIDADE OBRIGATÓRIA:
- Design moderno nível agência
- Tipografia profissional e legível
- Espaçamento consistente (padding e margin bem definidos)
- Botões com hover suave
- Cards e seções bem estruturadas
- Uso de imagens reais de:
  https://source.unsplash.com/
  https://images.unsplash.com/

REGRA FINAL:
Qualquer coisa fora do HTML invalida a resposta.
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
