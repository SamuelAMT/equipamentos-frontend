import React, { useState } from 'react';
import Modal from 'react-modal';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { EquipamentoFormData } from './EquipamentoForm';
import EquipamentoEditModal from './EquipamentoEditModal';
import EquipamentoListStyle from '../styles/equipamentos_list.module.css';

const API_URL = 'http://localhost:8000/api/equipamentos';

interface Equipamento {
  id: number;
  nome: string;
  tipo: string;
  fabricante: string;
  modelo: string;
  numero_serie: string;
  status: string;
  data_compra: string;
  valor_compra: number;
  data_ultima_manutencao?: string;
  data_proxima_manutencao?: string;
  descricao?: string;
}

interface EquipamentoListProps {
  equipamentos: Equipamento[];
  onEdit: (equipamento: Equipamento) => void;
  onDelete: (equipamento: Equipamento) => void;
}

const EquipamentoList: React.FC<EquipamentoListProps> = ({ equipamentos, onEdit, onDelete }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedEquipamento, setSelectedEquipamento] = useState<Equipamento | null>(null);

  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const handleEdit = (equipamento: Equipamento) => {
    setSelectedEquipamento(equipamento);
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedEquipamento(null);
  };

  const handleEditSubmit = async (updatedEquipamento: EquipamentoFormData) => {
    try {
      if (selectedEquipamento) {
        await axios.put(`${API_URL}/${selectedEquipamento.id}/`, updatedEquipamento, {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });
        
        toast.success('Equipamento atualizado com sucesso!');
        handleModalClose();
        
        const updatedEquipamentoWithId: Equipamento = {
          ...selectedEquipamento,
          ...updatedEquipamento
        };
  
        onEdit(updatedEquipamentoWithId);
      }
    } catch (error) {
      toast.error('Erro ao atualizar o equipamento.');
      console.error('Erro ao atualizar o equipamento:', error);
    }
  };

  return (
    <>
      <table className={EquipamentoListStyle.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Fabricante</th>
            <th>Modelo</th>
            <th>Número de Série</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipamentos.map((equipamento) => (
            <tr key={equipamento.id}>
              <td>{equipamento.nome}</td>
              <td>{equipamento.tipo}</td>
              <td>{equipamento.fabricante}</td>
              <td>{equipamento.modelo}</td>
              <td>{equipamento.numero_serie}</td>
              <td>{equipamento.status}</td>
              <td className={EquipamentoListStyle.actions}>
                <button onClick={() => handleEdit(equipamento)} className={EquipamentoListStyle.editButton}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" /></svg>
                </button>
                <button onClick={() => onDelete(equipamento)} className={EquipamentoListStyle.deleteButton}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEquipamento && (
        <EquipamentoEditModal
          isOpen={isEditModalOpen}
          onRequestClose={handleModalClose}
          onSubmit={handleEditSubmit}
          initialData={selectedEquipamento}
        />
      )}
    </>
  );
};

export default EquipamentoList;