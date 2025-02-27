import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o useNavigate para redirecionamento
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
  const navigate = useNavigate(); // Para redirecionamento

  const handleResposta = (index) => {
    setRespostaSelecionada(index);

    if (index === perguntas[indice].correta) {
      setCorrecao("correto");
    } else {
      setCorrecao("errado");
    }

    setTimeout(() => {
      if (indice < perguntas.length - 1) {
        setIndice(indice + 1);
        setRespostaSelecionada(null);
        setCorrecao(null);
      } else {
        navigate("/final"); // Redireciona para a tela final após a última pergunta
      }
    }, 2000);
  };

  return (
    <Box className="quiz-container">
      <Typography variant="h4" className="pergunta">
        {perguntas[indice].pergunta}
      </Typography>
      {perguntas[indice].respostas.map((resposta, index) => (
        <Button
          key={index}
          className={`resposta ${
            respostaSelecionada !== null
              ? index === perguntas[indice].correta
                ? "correto"
                : index === respostaSelecionada
                ? "errado"
                : ""
              : ""
          }`}
          onClick={() => handleResposta(index)}
          disabled={respostaSelecionada !== null}
        >
          {resposta}
        </Button>
      ))}
      {correcao && (
        <Typography className="feedback">
          {correcao === "correto" ? "Parabéns, você acertou!" : "Você errou!"}
        </Typography>
      )}
    </Box>
  );
};

export default Quiz;
