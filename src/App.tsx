import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import EquipamentoList from './components/EquipamentoList';
import EquipamentoForm, { EquipamentoFormData } from './components/EquipamentoForm';
import Header from './components/Header';
import EquipamentoFormStyle from './styles/equipamentos_form.module.css';

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
}

const App: React.FC = () => {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);

  useEffect(() => {
    fetchEquipamentos();
  }, []);

  const fetchEquipamentos = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/equipamentos/');
      if (!response.ok) {
        toast.error('Erro ao cadastrar o equipamento.');
        throw new Error('Erro ao listar os equipamentos');
      }
      const data = await response.json();
      setEquipamentos(data);
    } catch (error) {
      toast.error('Erro ao listar os equipamentos.');
      console.error('Erro ao listar os equipamentos:', error);
    }
  };

  const handleFormSubmit = async (data: EquipamentoFormData) => {
    try {
      const response = await fetch('http://localhost:8000/api/equipamentos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('A Resposta de rede não foi Ok');
      }
      console.log('Equipamento cadastrado com sucesso!');
    fetchEquipamentos();
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
};

  const handleEdit = (equipamento: Equipamento) => {
    console.log('Edição:', equipamento);
  };

  const handleDelete = async (equipamento: Equipamento) => {
    try {
      const response = await fetch(`http://localhost:8000/api/equipamentos/${equipamento.id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        toast.error('Erro ao deletar o equipamento.');
        throw new Error('Erro ao deletar o equipamento');
      }
      toast.success('Equipamento deletado com sucesso!');
      console.log('Equipamento deletado com sucesso!');
      fetchEquipamentos();
    } catch (error) {
      toast.error('Erro ao deletar o equipamento.');
      console.error('Erro ao deletar o equipamento:', error);
    }
  };

  return (
    <Router>
      <div className={EquipamentoFormStyle["app-container"]}>
        <Header />
        <ToastContainer />
        <nav className={EquipamentoFormStyle["nav-tabs"]}>
          <NavLink to="/" className={({ isActive }) => isActive ? `${EquipamentoFormStyle["nav-link"]} ${EquipamentoFormStyle["active"]}` : EquipamentoFormStyle["nav-link"]}>
            Listagem de Equipamentos
          </NavLink>
          <NavLink to="/registrar" className={({ isActive }) => isActive ? `${EquipamentoFormStyle["nav-link"]} ${EquipamentoFormStyle["active"]}` : EquipamentoFormStyle["nav-link"]}>
            Registrar Equipamento
          </NavLink>
        </nav>
        <div className={EquipamentoFormStyle["content"]}>
          <Routes>
            <Route
              path="/"
              element={
                <EquipamentoList
                  equipamentos={equipamentos}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              }
            />
            <Route path="/registrar" element={<EquipamentoForm onSubmit={handleFormSubmit} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
