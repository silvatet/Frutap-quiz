import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import "./Perguntas.css";

const perguntas = [
  {
    pergunta: "Qual é a técnica amaldiçoada principal de Gojo Satoru?",
    respostas: [
      "Expansão de Domínio: Santuário Sombrio",
      "Técnica das Dez Sombras",
      "Ilimitado e Seis Olhos",
      "Expansão de Domínio: Cozinha das Chamas",
    ],
    correta: 2,
  },
  {
    pergunta: "Qual é o nome do Pai de Megumi Fushiguro?",
    respostas: ["Noritoshi Kamo", "Toji Fushiguro", "Choso Kamo", "Hajime Kashimo"],
    correta: 1,
  },
  {
    pergunta: "Quem foi o primeiro portador conhecido do Sukuna?",
    respostas: ["Kenjaku", "Yuta Okkotsu", "Itadori Yuji", "Hajime Kashimo"],
    correta: 2,
  },
];

const Quiz = () => {
  const [indice, setIndice] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [correcao, setCorrecao] = useState(null);
  const navigate = useNavigate();

  const handleResposta = (index) => {
    setRespostaSelecionada(index);
    if (index === perguntas[indice].correta) {
      setCorrecao("correto");
    } else {
      setCorrecao("errado");
    }
  };

  const proximaPergunta = () => {
    if (indice < perguntas.length - 1) {
      setIndice(indice + 1);
      setRespostaSelecionada(null);
      setCorrecao(null);
    } else {
      navigate("/final");
    }
  };

  return (
    <Box className="quiz-container">
      {/* Bloco da pergunta */}
      <Box className="pergunta-bloco">
        <Typography variant="h5" className="pergunta-texto">
          {perguntas[indice].pergunta}
        </Typography>
      </Box>

      {/* Opções de resposta */}
      {perguntas[indice].respostas.map((resposta, index) => (
        <Button
          key={index}
          className={`resposta ${respostaSelecionada !== null ? (index === perguntas[indice].correta ? "correto" : index === respostaSelecionada ? "errado" : "") : ""}`}
          onClick={() => handleResposta(index)}
          disabled={respostaSelecionada !== null}
        >
          <span className="letra">{String.fromCharCode(65 + index)}</span> {resposta}
          {respostaSelecionada !== null && index === perguntas[indice].correta && <span className="icone-correto">✔</span>}
          {respostaSelecionada !== null && index === respostaSelecionada && index !== perguntas[indice].correta && <span className="icone-errado">✖</span>}
        </Button>
      ))}

      {/* Feedback de acerto/erro */}
      {correcao && (
        <Box className="feedback-container">
          <Typography className={`feedback ${correcao}`}>{correcao === "correto" ? "✔ CORRETO!" : "✖ VOCÊ ERROU!"}</Typography>
          <Button className="botao-proximo" onClick={proximaPergunta}>
            PRÓXIMO
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Quiz;
