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
import { formatCurrencyInput } from '../utils/formatValue';

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
  descricao?: string;
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
    const formattedValue = formatCurrencyInput(e.target.value);
    const numericValue = formattedValue.replace(',', '.');
    const parsedValue = parseFloat(numericValue);

    setFormData({ ...formData, valor_compra: parsedValue });
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
          <path fill="#244d5b" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
        </svg>
      </button>
      <form onSubmit={handleSubmit} className={EquipamentoEditModalStyle.form}>
        {[
          { label: 'Nome:', name: 'nome', type: 'text' },
          { label: 'Tipo:', name: 'tipo', type: 'text' },
          { label: 'Fabricante:', name: 'fabricante', type: 'text' },
          { label: 'Modelo:', name: 'modelo', type: 'text' },
          { label: 'Número de Série:', name: 'numero_serie', type: 'text' },
        ].map((field) => (
          <div key={field.name} className={EquipamentoEditModalStyle.formGroup}>
            <label className={EquipamentoEditModalStyle.label}>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name as keyof EquipamentoFormData]}
              onChange={handleChange}
              className={InputModalStyle.input}
            />
          </div>
        ))}

        <div className={EquipamentoEditModalStyle.formGroup}>
          <label className={EquipamentoEditModalStyle.label}>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={InputModalStyle.optionsInput}
          >
            <option value="Em Uso">Em Uso</option>
            <option value="Em Estoque">Em Estoque</option>
            <option value="Manutenção">Em Manutenção</option>
            <option value="Não Funcional">Não Funcional</option>
          </select>
        </div>

        <div className={EquipamentoEditModalStyle.smallInputsContainerUp}>
          <div className={EquipamentoEditModalStyle.formGroup}>
            <label className={EquipamentoEditModalStyle.label}>Data de Compra:</label>
            <DatePicker
              selected={new Date(formData.data_compra)}
              onChange={(date) => handleDateChange(date as Date, 'data_compra')}
              dateFormat="dd/MM/yyyy"
              locale={ptBR}
              className={InputModalStyle.dateInput}
            />
          </div>

          <div className={EquipamentoEditModalStyle.formGroup}>
            <label className={EquipamentoEditModalStyle.label}>Valor de Compra:</label>
            <input
              type="text"
              name="valor_compra"
              value={
                typeof formData.valor_compra === 'number' && !isNaN(formData.valor_compra)
                  ? formData.valor_compra.toFixed(2).replace('.', ',')
                  : ''
              }
              onChange={handleValueChange}
              className={InputModalStyle.moneyInput}
              placeholder="0,00"
            />
          </div>
        </div>

        <div className={EquipamentoEditModalStyle.smallInputsContainerDown}>
          <div className={EquipamentoEditModalStyle.formGroup}>
            <label className={EquipamentoEditModalStyle.label}>Data da Última Manutenção:</label>
            <DatePicker
              selected={new Date(formData.data_ultima_manutencao!)}
              onChange={(date) => handleDateChange(date as Date, 'data_ultima_manutencao')}
              dateFormat="dd/MM/yyyy"
              locale={ptBR}
              className={InputModalStyle.dateInput}
            />
          </div>

          <div className={EquipamentoEditModalStyle.formGroup}>
            <label className={EquipamentoEditModalStyle.label}>Data da Próxima Manutenção:</label>
            <DatePicker
              selected={new Date(formData.data_proxima_manutencao!)}
              onChange={(date) => handleDateChange(date as Date, 'data_proxima_manutencao')}
              dateFormat="dd/MM/yyyy"
              locale={ptBR}
              className={InputModalStyle.dateInput}
            />
          </div>
        </div>
        <div className={EquipamentoEditModalStyle["form-group"]}>
          <label className={EquipamentoEditModalStyle["label"]}>Descrição:</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className={EquipamentoEditModalStyle["textarea"]}
          />
        </div>

        <div className={EquipamentoEditModalStyle.buttonContainer}>
          <button type="submit" className={ButtonStyle["saveButton"]}>Salvar</button>
        </div>
      </form>
    </Modal>
  );
};

export default EquipamentoEditModal;