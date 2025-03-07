import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import telaFundo from "../../assets/tela-1.jpg"; // Importa a imagem corretamente
import "./Descanso.css";

const TelaDescanso = () => {
  const navigate = useNavigate();

 
  return (
    <Box
      className="tela-container"
      onClick={() => navigate("/cadastro")} // Redireciona ao clicar na tela
    >
      <img src={telaFundo} alt="Tela de Descanso" className="tela-fundo" />
    </Box>
  );
};

export default TelaDescanso;
