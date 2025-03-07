import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./Cadastro.css";

const TelaCadastro = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [inputFocado, setInputFocado] = useState("nome");
  const [layoutName, setLayoutName] = useState("default");
  const navigate = useNavigate();

  useEffect(() => {
    let timeout = setTimeout(() => {
      navigate("/");
    }, 10000);

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => navigate("/"), 10000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      clearTimeout(timeout);
    };
  }, [navigate]);

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .replace(/(\d{3})(\d{2})$/, "$1-$2")
      .slice(0, 14);
  };

  const handleKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    } else if (button === "{bksp}") {
      if (inputFocado === "nome") setNome((prev) => prev.slice(0, -1));
      else setCpf((prev) => formatCPF(cpf.slice(0, -1)));
    } else if (button === "{space}") {
      if (inputFocado === "nome") setNome((prev) => prev + " ");
    } else if (button === "{enter}") {
      handleSubmit();
    } else {
      if (inputFocado === "nome") setNome((prev) => prev + button);
      else setCpf((prev) => formatCPF(cpf + button));
    }
  };

  const handleSubmit = () => {
    if (!nome.trim() || !cpf.match(/^\d{3}-\d{3}-\d{3}-\d{2}$/)) {
      alert("Por favor, insira um nome válido e um CPF no formato XXX-XXX-XXX-XX.");
      return;
    }

    const fileName = "dados_usuarios.xlsx";
    let workbook, worksheet;

    try {
      const storedFile = localStorage.getItem(fileName);
      if (storedFile) {
        const data = new Uint8Array(atob(storedFile).split("").map((c) => c.charCodeAt(0)));
        workbook = XLSX.read(data, { type: "array" });
      } else {
        workbook = XLSX.utils.book_new();
      }

      if (workbook.SheetNames.includes("Usuarios")) {
        worksheet = workbook.Sheets["Usuarios"];
      } else {
        worksheet = XLSX.utils.aoa_to_sheet([["Nome", "CPF"]]);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
      }
    } catch {
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.aoa_to_sheet([["Nome", "CPF"]]);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
    }

    XLSX.utils.sheet_add_aoa(worksheet, [[nome, cpf]], { origin: -1 });

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    saveAs(data, fileName);

    localStorage.setItem(fileName, btoa(String.fromCharCode.apply(null, new Uint8Array(excelBuffer))));

    setNome("");
    setCpf("");

    navigate("/perguntas");
  };

  return (
    <Box className="cadastro-container">
      <Typography variant="h4" className="mensagem">
        DIGITE O SEU NOME E CPF
      </Typography>

      {/* Campo Nome com Texto Branco e suporte ao teclado virtual */}
      <TextField
        label="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        onFocus={() => setInputFocado("nome")}
        fullWidth
        className="input-field"
        InputProps={{
          style: { color: "white" }, // TEXTO DIGITADO FICA BRANCO
        }}
      />

      {/* Campo CPF com Texto Branco e suporte ao teclado virtual */}
      <TextField
        label="CPF"
        value={cpf}
        onChange={(e) => setCpf(formatCPF(e.target.value))}
        onFocus={() => setInputFocado("cpf")}
        fullWidth
        className="input-field"
        InputProps={{
          style: { color: "white" }, // TEXTO DIGITADO FICA BRANCO
        }}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit} className="botao-salvar">
        SALVAR
      </Button>

      {/* Teclado Virtual corrigido */}
      <Box className="keyboard-container">
        <Keyboard
          layoutName={layoutName}
          onKeyPress={(button) => handleKeyPress(button)}
          className="teclado-virtual"
          display={{
            "{bksp}": "←",
            "{enter}": "Enter",
            "{space}": "Espaço",
            "{shift}": "Shift",
            "{lock}": "Caps",
          }}
        />
      </Box>
    </Box>
  );
};

export default TelaCadastro;
