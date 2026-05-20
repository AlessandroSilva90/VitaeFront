import { useState } from "react";
import type { ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";
import { api } from "../services/api";
import trash from "../assets/trash.png";

interface ModalBaseProps {
  children?: ReactNode; // Conteúdo do modal
  id?: number | string;
  titulo?: string;
  onOpen?: () => Promise<any> | void;
  buttonText?: string;
  buttonVariant?: string;
  // buttonIcon?: string;
  rota?: string;
  modalSize?: "sm" | "lg" | "xl";
  onConfirm?: () => void; // Função para botão Confirmar
  confirmText?: string; // Texto do botão confirmar
  cancelText?: string; // Texto do botão cancelar
  showFooter?: boolean; // Mostrar rodapé?
  onDeleteSuccess?: () => void;
}

export default function DeleteModal({
  // children,
  id,
  titulo = "Excluir",
  onOpen,
  buttonText = "Abrir",
  buttonVariant = "primary",
  // buttonIcon,
  rota,
  modalSize = "lg",
  // onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  showFooter = true,
  onDeleteSuccess,
}: ModalBaseProps) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleShow = async () => {
    setShow(true);

    if (onOpen) {
      setLoading(true);
      try {
        const result = await onOpen();
        setData(result);
        console.log(data);
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
    try {
      await api.delete(`${rota}/${id}`);

      if (onDeleteSuccess) {
        onDeleteSuccess();
      }

      alert("Registro DELETADO com sucesso!");
    } catch (err: any) {
      console.error("Erro detalhado:", err);
      alert(err.response?.data?.message || "Erro ao cadastrar módulo");
    }

    handleClose();
  };

  return (
    <>
      {trash ? (
        <img
          src={trash}
          onClick={handleShow}
          style={{
            cursor: "pointer",
            width: "24px",
            height: "24px",
            display: "inline-block"
          }}
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
            <p>Deseja excluir esse registro ?</p>
          )}
        </Modal.Body>

        {showFooter && (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {cancelText}
            </Button>
            <Button variant={buttonVariant} onClick={handleConfirm}>
              {confirmText}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
