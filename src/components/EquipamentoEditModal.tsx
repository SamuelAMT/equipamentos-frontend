import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EquipamentoEditModalStyle from '../styles/equipamentos_edit_modal.module.css';
import InputModalStyle from '../styles/input.modal.module.css';
import ButtonStyle from '../styles/buttons.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';

export interface EquipamentoFormData {
  nome: string;
  tipo: string;
  fabricante: string;
  modelo: string;
  numero_serie: string;
  data_compra: string;
  valor_compra: number;
  status: string;
  data_ultima_manutencao?: string;
  data_proxima_manutencao?: string;
}

interface EquipamentoEditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: EquipamentoFormData) => void;
  initialData: EquipamentoFormData;
}

const EquipamentoEditModal: React.FC<EquipamentoEditModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<EquipamentoFormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(',', '.')).toFixed(2);
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(value),
    });
  };

  const handleDateChange = (date: Date, field: keyof EquipamentoFormData) => {
    setFormData({
      ...formData,
      [field]: date.toISOString().split('T')[0],
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.nome || !formData.tipo || !formData.fabricante || !formData.modelo || !formData.numero_serie) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    onSubmit(formData);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={EquipamentoEditModalStyle.modal}
      overlayClassName={EquipamentoEditModalStyle.overlay}
    >
      <button onClick={onRequestClose} className={ButtonStyle.closeButton}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="#244d5b" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
        </svg>
      </button>
      <form onSubmit={handleSubmit} className={EquipamentoEditModalStyle.form}>
        <div className={EquipamentoEditModalStyle.formGroup}>
          <label className={EquipamentoEditModalStyle.label}>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className={InputModalStyle.input}
          />
        </div>
        <div className={EquipamentoEditModalStyle.formGroup}>
          <label className={EquipamentoEditModalStyle.label}>Tipo:</label>
          <input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
            className={InputModalStyle.input}
          />
        </div>
        <div className={EquipamentoEditModalStyle.formGroup}>
          <label className={EquipamentoEditModalStyle.label}>Fabricante:</label>
          <input
            type="text"
            name="fabricante"
            value={formData.fabricante}
            onChange={handleChange}
            required
            className={InputModalStyle.input}
          />
        </div>
        <div className={EquipamentoEditModalStyle.formGroup}>
          <label className={EquipamentoEditModalStyle.label}>Modelo:</label>
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
            className={InputModalStyle.input}
          />
        </div>
        <div className={EquipamentoEditModalStyle.formGroup}>
          <label className={EquipamentoEditModalStyle.label}>Número de Série:</label>
          <input
            type="text"
            name="numero_serie"
            value={formData.numero_serie}
            onChange={handleChange}
            required
            className={InputModalStyle.input}
          />
        </div>
        <div className={EquipamentoEditModalStyle.formGroup}>
          <label className={EquipamentoEditModalStyle.label}>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className={InputModalStyle.input}
          >
            <option value="Em Uso">Em Uso</option>
            <option value="Em Estoque">Em Estoque</option>
            <option value="Manutenção">Em Manutenção</option>
            <option value="Não Funcional">Não Funcional</option>
          </select>
        </div>
        <div className={EquipamentoEditModalStyle.formGroup}>
          <label className={EquipamentoEditModalStyle.label}>Data de Compra:</label>
          <DatePicker
            selected={new Date(formData.data_compra)}
            onChange={(date) => handleDateChange(date as Date, 'data_compra')}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            className={InputModalStyle.input}
          />
        </div>
        <div className={EquipamentoEditModalStyle.formGroup}>
          <label className={EquipamentoEditModalStyle.label}>Valor de Compra:</label>
          <input
            type="text"
            name="valor_compra"
            value={formData.valor_compra.toString().replace('.', ',')}
            onChange={handleValueChange}
            required
            className={InputModalStyle.input}
          />
        </div>
        <div className={EquipamentoEditModalStyle.formGroup}>
          <label className={EquipamentoEditModalStyle.label}>Data da Última Manutenção:</label>
          <DatePicker
            selected={new Date(formData.data_ultima_manutencao!)}
            onChange={(date) => handleDateChange(date as Date, 'data_ultima_manutencao')}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            className={InputModalStyle.input}
          />
        </div>
        <div className={EquipamentoEditModalStyle.formGroup}>
          <label className={EquipamentoEditModalStyle.label}>Data da Próxima Manutenção:</label>
          <DatePicker
            selected={new Date(formData.data_proxima_manutencao!)}
            onChange={(date) => handleDateChange(date as Date, 'data_proxima_manutencao')}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            className={InputModalStyle.input}
          />
        </div>
        <button type="submit" className={ButtonStyle.saveButton}>Salvar</button>
      </form>
    </Modal>
  );
};

export default EquipamentoEditModal;