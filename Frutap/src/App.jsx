import { Routes, Route } from "react-router-dom";
import TelaDescanso from "./Pages/Descanso/Descanso";
import TelaCadastro from "./Pages/Cadastro/Cadastro";
import Quiz from "./Pages/Perguntas/Perguntas";
import TelaFinal from "./Pages/TelaFinal/TelaFinal";


function App() {
  return (
    <Routes>
      <Route path="/" element={<TelaDescanso />} />
      <Route path="/cadastro" element={<TelaCadastro />} />
      <Route path="/perguntas" element={<Quiz />} />
      <Route path="/final" element={<TelaFinal />} /> {/* Adicionando a tela final */}
    </Routes>
  );
}

export default App;
