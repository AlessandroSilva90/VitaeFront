import { useState } from "react";
import type { ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";
import { api } from "../services/api";
import pencil from "../assets/pencil.png"
import "../App.scss"

interface ModalBaseProps {
  children?: ReactNode;
  id?: number | string;
  titulo?: string;
  onOpen?: () => Promise<any> | void;
  buttonText?: string;
  buttonVariant?: string;
  // buttonIcon?: string;
  rotaUpdate?: string;
  rotaGet?: string;
  modalSize?: "sm" | "lg" | "xl";
  confirmText?: string;
  cancelText?: string;
  showFooter?: boolean;
  onGetDataSuccess?: (data: any) => void;
  dadosParaAtualizar?: any;
  onUpdateSuccess?: () => void;
  fnc1?: () => Promise<any> | void;
}

export default function EditModal({
  children,
  id,
  titulo = "Editar",
  buttonText = "Abrir",
  buttonVariant = "primary",
  // buttonIcon,
  rotaUpdate,
  rotaGet,
  modalSize = "lg",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  showFooter = true,
  onGetDataSuccess,
  dadosParaAtualizar,
  onUpdateSuccess,
  fnc1,
}: ModalBaseProps) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setData] = useState<any>();

  const handleShow = async () => {
    setShow(true);
    setLoading(true);

    try {
      if (rotaGet && id) {
        const response = await api.get(`${rotaGet}/${id}`);
        const dadosCarregados = response.data;
        setData(dadosCarregados);

        if (onGetDataSuccess) {
          onGetDataSuccess(dadosCarregados);
        }
      }

      if (fnc1) {
        fnc1();
      }
    }catch (err: any) {
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

  const handleClose = () => {
    setShow(false);
    setData(null);
  };

  const handleConfirm = async () => {
    if (!dadosParaAtualizar) {
      console.error("Nenhum dado para atualizar");
      return;
    }

    setLoading(true);

    console.log(dadosParaAtualizar);

    try {
      const response = await api.patch(
        `${rotaUpdate}/${id}`,
        dadosParaAtualizar,
      );

      console.log("Resposta da API:", response.data);
      alert("Registro ATUALIZADO com sucesso!");

      if (onUpdateSuccess) {
        onUpdateSuccess();
      }

      handleClose();
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
      {pencil ? (
        <img
          src={pencil}
          onClick={handleShow}
          style={{ cursor: "pointer", width: "24px", height: "24px",display:"inline-block"}}
          alt="Abrir"
          className="icon-btn-fnc"
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
            children
          )}
        </Modal.Body>

        {showFooter && (
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={loading}
            >
              {cancelText}
            </Button>
            <Button
              variant={buttonVariant}
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? "Salvando..." : confirmText}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
