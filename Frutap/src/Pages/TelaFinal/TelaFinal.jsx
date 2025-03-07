import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import "./TelaFinal.css";

const TelaFinal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/"); // Volta para a tela de descanso após 10 segundos
    }, 10000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return <Box className="tela-final-container"></Box>; // Apenas o fundo sem mensagem
};

export default TelaFinal;
