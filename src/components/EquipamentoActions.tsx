  import axios from 'axios';

  interface Equipamento {
    id?: number;
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

  const API_URL = 'http://localhost:8000/api/equipamentos/';

  export const fetchEquipamentos = async (): Promise<Equipamento[]> => {
    const response = await axios.get<Equipamento[]>(API_URL);
    return response.data;
  };

  export const addEquipamento = async (equipamento: Equipamento): Promise<Equipamento> => {
    const response = await axios.post<Equipamento>(API_URL, equipamento);
    return response.data;
  };

  export const deleteEquipamento = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}${id}/`);
  };