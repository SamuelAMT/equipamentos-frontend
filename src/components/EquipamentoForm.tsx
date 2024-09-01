import React, { useState } from 'react';
import styles from '../styles/equipamentos_form.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';

interface EquipamentoFormProps {
  onSubmit: (data: EquipamentoFormData) => void;
}

export interface EquipamentoFormData {
  nome: string;
  descricao?: string;
  status: string;
  tipo: string;
  fabricante: string;
  modelo: string;
  numero_serie: string;
  data_compra: string;
  valor_compra: number;
  data_ultima_manutencao?: string;
  data_proxima_manutencao?: string;
}

const EquipamentoForm: React.FC<EquipamentoFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<EquipamentoFormData>({
    nome: '',
    descricao: '',
    status: 'Em Estoque',
    tipo: '',
    fabricante: '',
    modelo: '',
    numero_serie: '',
    data_compra: new Date().toISOString().split('T')[0],
    valor_compra: 0,
    data_ultima_manutencao: new Date().toISOString().split('T')[0],
    data_proxima_manutencao: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles["form-container"]}>  
      <h2 className={styles["form-title"]}>Cadastro de Equipamentos</h2>
      <form onSubmit={handleSubmit} className={styles["equipamento-form"]}>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className={styles["input"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Descrição:</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className={styles["textarea"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className={styles["select"]}
          >
            <option value="Em Uso">Em Uso</option>
            <option value="Em Estoque">Em Estoque</option>
            <option value="Manutenção">Em Manutenção</option>
            <option value="Não Funcional">Não Funcional</option>
          </select>
        </div>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Tipo:</label>
          <input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
            className={styles["input"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Fabricante:</label>
          <input
            type="text"
            name="fabricante"
            value={formData.fabricante}
            onChange={handleChange}
            required
            className={styles["input"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Modelo:</label>
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
            className={styles["input"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Número de Série:</label>
          <input
            type="text"
            name="numero_serie"
            value={formData.numero_serie}
            onChange={handleChange}
            required
            className={styles["input"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Data de Compra:</label>
          <DatePicker
            selected={new Date(formData.data_compra)}
            onChange={(date) => handleDateChange(date as Date, 'data_compra')}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            className={styles["input"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Valor de Compra:</label>
          <input
            type="text"
            name="valor_compra"
            value={formData.valor_compra.toString().replace('.', ',')}
            onChange={handleValueChange}
            required
            className={styles["input"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Data da Última Manutenção:</label>
          <DatePicker
            selected={new Date(formData.data_ultima_manutencao!)}
            onChange={(date) => handleDateChange(date as Date, 'data_ultima_manutencao')}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            className={styles["input"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>Data da Próxima Manutenção:</label>
          <DatePicker
            selected={new Date(formData.data_proxima_manutencao!)}
            onChange={(date) => handleDateChange(date as Date, 'data_proxima_manutencao')}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            className={styles["input"]}
          />
        </div>
        <button type="submit" className={styles["submit-button"]}>Cadastrar Equipamento</button>
      </form>
    </div>
  );
};

export default EquipamentoForm;
