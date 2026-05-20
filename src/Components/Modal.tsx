import { useState } from "react";
import type { ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";
import { api } from "../services/api";

interface ModalBaseProps {
  children?: ReactNode; // Conteúdo do modal
  id?: number | string;
  titulo?: string;
  onOpen?: () => Promise<any> | void;
  buttonText?: string;
  buttonVariant?: string;
  buttonIcon?: string;
  modalSize?: "sm" | "lg" | "xl";
  onConfirm?: () => void; // Função para botão Confirmar
  confirmText?: string; // Texto do botão confirmar
  cancelText?: string; // Texto do botão cancelar
  showFooter?: boolean; // Mostrar rodapé?
  dadosParaInserir?: any; // pegar dados de form tradicional, useState, etc
  rota?: string;
  onGetFormData?: () => any; //Função para capturar dados do formulário react-hook
  onSuccess?: () => void;
}

export default function ModalBase({
  children,
  id,
  titulo = "Detalhes",
  onOpen,
  buttonText = "Abrir",
  buttonVariant = "primary",
  buttonIcon,
  modalSize = "lg",
  // onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  showFooter = true,
  dadosParaInserir,
  rota,
  onGetFormData,
  onSuccess,
}: ModalBaseProps) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setData] = useState<any>(null);

  const handleShow = async () => {
    setShow(true);

    if (onOpen) {
      setLoading(true);
      try {
        const result = await onOpen();
        setData(result);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setData(null);
  };

  const handleConfirm = async () => {
    setLoading(true);

    let dadosParaEnviar = dadosParaInserir;

    if (onGetFormData) {
      dadosParaEnviar = onGetFormData();

      // Validação básica: verifica se retornou dados
      if (!dadosParaEnviar) {
        alert("Preencha todos os campos obrigatórios!");
        setLoading(false);
        return;
      }
    }

    // console.log('INserir essa misera:' + dadosParaEnviar);
         // console.log(`Dados para enviar:` , dadosParaEnviar);
         
         try {
           if (id){
             let dados = {
               codigo: `${id}`,
               itens: dadosParaEnviar,
             };
             await api.post(`${rota}`, dados);
      }else{
          await api.post(`${rota}`, dadosParaEnviar);

      }

      
      alert("Registro INSERIDO com sucesso!");

      // if (onUpdateSuccess) {
      //   onUpdateSuccess();
      // }

      handleClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error("Erro detalhado:", err);

      // Verifica se existe resposta do servidor
      if (err.response) {
        // Acessa os dados do erro
        const errorData = err.response.data;

        console.log("Status:", err.response.status);
        console.log("Dados completos:", errorData);

        // Para erro de validação (400) com formato do .NET
        if (err.response.status === 400 && errorData.errors) {
          // Pega todas as mensagens de erro
          const errorMessages = Object.values(errorData.errors).flat();
          alert(errorMessages.join("\n"));
        }
        // Se for um erro com mensagem personalizada
        else if (errorData.message) {
          alert(errorData.message);
        }
        // Se for um erro de validação simples
        else if (errorData.title) {
          alert(`${errorData.title}: ${errorData.detail || ""}`);
        } else {
          alert("Erro ao ATUALIZAR registro");
        }
      } else {
        alert("Erro de conexão com o servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {buttonIcon ? (
        <img
          src={buttonIcon}
          onClick={handleShow}
          style={{ cursor: "pointer", width: "24px", height: "24px" }}
          alt="Abrir"
        />
      ) : (
        <Button variant={buttonVariant} onClick={handleShow}>
          {buttonText}
        </Button>
      )}

      <Modal show={show} onHide={handleClose} size={modalSize}>
        <Modal.Header closeButton>
          <Modal.Title>
            {titulo} {id && `#${id}`}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loading ? (
            <div className="text-center p-4">
              <div className="spinner-border" />
            </div>
          ) : (
            children || <p>Nenhum conteúdo</p>
          )}
        </Modal.Body>

        {showFooter && (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {cancelText}
            </Button>
            <input type="submit" value="" />
            <Button variant={buttonVariant} onClick={handleConfirm}>
              {confirmText}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
