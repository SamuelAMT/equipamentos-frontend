import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import EquipamentoList from './components/EquipamentoList';
import EquipamentoForm, { EquipamentoFormData } from './components/EquipamentoForm';
import Header from './components/Header';
import styles from './styles/equipamentos_form.module.css';

interface Equipamento {
  id: number;
  nome: string;
  tipo: string;
  fabricante: string;
  modelo: string;
  numero_serie: string;
  status: string;
}

const App: React.FC = () => {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);

  useEffect(() => {
    // Fetch the list of equipamentos when the component mounts
    fetchEquipamentos();
  }, []);

  const fetchEquipamentos = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/equipamentos/');
      if (!response.ok) {
        throw new Error('Failed to fetch equipamentos');
      }
      const data = await response.json();
      setEquipamentos(data);
    } catch (error) {
      console.error('Error fetching equipamentos:', error);
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
        throw new Error('Network response was not ok');
      }
      console.log('Equipamento cadastrado com sucesso!');
      fetchEquipamentos(); // Refresh the list after adding a new equipamento
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleEdit = (equipamento: Equipamento) => {
    // Implement the edit functionality here
    console.log('Edit:', equipamento);
  };

  const handleDelete = async (equipamento: Equipamento) => {
    try {
      const response = await fetch(`http://localhost:8000/api/equipamentos/${equipamento.id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete equipamento');
      }
      console.log('Equipamento deleted successfully');
      fetchEquipamentos(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting equipamento:', error);
    }
  };

  return (
    <Router>
      <div className={styles["app-container"]}>
        <Header />
        <nav className={styles["nav-tabs"]}>
          <NavLink to="/" className={({ isActive }) => isActive ? `${styles["nav-link"]} ${styles["active"]}` : styles["nav-link"]}>
            Listagem de Equipamentos
          </NavLink>
          <NavLink to="/registrar" className={({ isActive }) => isActive ? `${styles["nav-link"]} ${styles["active"]}` : styles["nav-link"]}>
            Registrar Equipamento
          </NavLink>
        </nav>
        <div className={styles["content"]}>
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
