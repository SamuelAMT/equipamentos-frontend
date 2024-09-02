import React, { useState } from 'react';
import EquipamentoFormStyle from '../styles/equipamentos_form.module.css';
import ButtonStyle from '../styles/buttons.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EquipamentoFormProps {
  onSubmit: (data: EquipamentoFormData) => void;
}

export interface EquipamentoFormData {
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

const EquipamentoForm: React.FC<EquipamentoFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<EquipamentoFormData>({
    nome: '',
    tipo: '',
    fabricante: '',
    modelo: '',
    numero_serie: '',
    status: 'Em Estoque',
    data_compra: new Date().toISOString().split('T')[0],
    valor_compra: 0,
    data_ultima_manutencao: new Date().toISOString().split('T')[0],
    data_proxima_manutencao: new Date().toISOString().split('T')[0],
    descricao: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = value.replace(/[^0-9,]/g, '');
    const floatValue = numericValue.replace(',', '.');

    if (numericValue === '') {
      setFormData({ ...formData, valor_compra: 0 });
      return;
    }

    const parsedValue = parseFloat(floatValue);
    setFormData({ ...formData, valor_compra: parsedValue });
  };

  const handleDateChange = (date: Date, field: keyof EquipamentoFormData) => {
    setFormData({
      ...formData,
      [field]: date.toISOString().split('T')[0],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.tipo || !formData.fabricante || !formData.modelo || !formData.numero_serie) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    onSubmit(formData);
    toast.success('Equipamento cadastrado com sucesso!');
  };

  return (
    <div className={EquipamentoFormStyle["form-container"]}>
      <h2 className={EquipamentoFormStyle["form-title"]}>Cadastro de Equipamentos</h2>
      <form onSubmit={handleSubmit} className={EquipamentoFormStyle["equipamento-form"]}>
        <div className={EquipamentoFormStyle["form-group"]}>
          <label className={EquipamentoFormStyle["label"]}>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className={EquipamentoFormStyle["input"]}
          />
        </div>
        <div className={EquipamentoFormStyle["form-group"]}>
          <label className={EquipamentoFormStyle["label"]}>Tipo:</label>
          <input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className={EquipamentoFormStyle["input"]}
          />
        </div>
        <div className={EquipamentoFormStyle["form-group"]}>
          <label className={EquipamentoFormStyle["label"]}>Fabricante:</label>
          <input
            type="text"
            name="fabricante"
            value={formData.fabricante}
            onChange={handleChange}
            className={EquipamentoFormStyle["input"]}
          />
        </div>
        <div className={EquipamentoFormStyle["form-group"]}>
          <label className={EquipamentoFormStyle["label"]}>Modelo:</label>
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            className={EquipamentoFormStyle["input"]}
          />
        </div>
        <div className={EquipamentoFormStyle["form-group"]}>
          <label className={EquipamentoFormStyle["label"]}>Número de Série:</label>
          <input
            type="text"
            name="numero_serie"
            value={formData.numero_serie}
            onChange={handleChange}
            className={EquipamentoFormStyle["input"]}
          />
        </div>
        <div className={EquipamentoFormStyle["form-group"]}>
          <label className={EquipamentoFormStyle["label"]}>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={EquipamentoFormStyle["select"]}
          >
            <option value="Em Uso">Em Uso</option>
            <option value="Em Estoque">Em Estoque</option>
            <option value="Manutenção">Em Manutenção</option>
            <option value="Não Funcional">Não Funcional</option>
          </select>
        </div>
        <div className={EquipamentoFormStyle.dateInputContainer}>
        <div className={EquipamentoFormStyle["form-group"]}>
          <label className={EquipamentoFormStyle["label"]}>Data de Compra:</label>
          <DatePicker
            selected={new Date(formData.data_compra)}
            onChange={(date) => handleDateChange(date as Date, 'data_compra')}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            className={EquipamentoFormStyle["dateInput"]}
          />
        </div>
        <div className={EquipamentoFormStyle["form-group"]}>
          <label className={EquipamentoFormStyle["label"]}>Data da Última Manutenção:</label>
          <DatePicker
            selected={new Date(formData.data_ultima_manutencao!)}
            onChange={(date) => handleDateChange(date as Date, 'data_ultima_manutencao')}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            className={EquipamentoFormStyle["dateInput"]}
          />
        </div>
        <div className={EquipamentoFormStyle["form-group"]}>
          <label className={EquipamentoFormStyle["label"]}>Data da Próxima Manutenção:</label>
          <DatePicker
            selected={new Date(formData.data_proxima_manutencao!)}
            onChange={(date) => handleDateChange(date as Date, 'data_proxima_manutencao')}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            className={EquipamentoFormStyle["dateInput"]}
          />
        </div>
        </div>
        <div className={EquipamentoFormStyle["form-group"]}>
          <label className={EquipamentoFormStyle["label"]}>Valor de Compra:</label>
          <input
            type="text"
            name="valor_compra"
            value={formData.valor_compra.toFixed(2).replace('.', ',')}
            onChange={handleValueChange}
            className={EquipamentoFormStyle["input"]}
            placeholder="0,00"
          />
        </div>
        <div className={EquipamentoFormStyle["form-group"]}>
          <label className={EquipamentoFormStyle["label"]}>Descrição:</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className={EquipamentoFormStyle["textarea"]}
          />
        </div>
        <div className={EquipamentoFormStyle["button-container"]}>
          <button type="submit" className={`${ButtonStyle["saveButton"]} ${EquipamentoFormStyle["submit-button"]}`}>
            Cadastrar Equipamento
          </button>
        </div>
      </form>
    </div>
  );
};

export default EquipamentoForm;
