import axios from 'axios';

interface Equipamento {
  id?: number;
  nome: string;
tipo: string;
  fabricante: string;
  modelo: string;
  numero_serie: string;
  data_compra: string;
  valor_compra: string;
  data_ultima_manutencao?: string;
  data_proxima_manutencao?: string;
}

const API_URL = 'http://localhost:8000/api/equipamentos/';

export const fetchEquipamentos = async (): Promise<Equipamento[]> => {
  const response = await axios.get<Equipamento[]>(API_URL);
  return response.data;
};

export const addEquipamentos = async (equipamento: Equipamento): Promise<Equipamento> => {
  const response = await axios.post<Equipamento>(API_URL, equipamento);
  return response.data;
};

export const deleteEquipamentos = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}${id}/`);
};