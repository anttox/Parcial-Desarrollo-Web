import React, { useState, useEffect, useMemo, useCallback, useReducer, useRef, useContext } from 'react';

//Simulamos datos en tiempo real
const generateRandomData = () => ({
  id: Math.random(),
  value: Math.floor(Math.random() * 100),
  timestamp: new Date().toLocaleTimeString(),
});

//Se agrega el contexto global que usara React
const DataContext = React.createContext();

//Reducer para manejar el estado global en React
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'Añadir_DATA':
      return [...state, action.payload];
    case 'Limpiar_DATA':
      return [];
    default:
      return state;
  }
};

//Se da un intento de Hook personalizado para manejar los datos en tiempo real
const useRealTimeData = () => {
  const [data, setData] = useState(generateRandomData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
    }, 2000); //Actualizamos cada 2 segundos

    return () => clearInterval(interval); //Limpieza
  }, []);

  return data;
};

//Componente principal donde se trabajara
const Dashboard = () => {
  const [filter, setFilter] = useState('');
  const dataContext = useContext(DataContext);
  const inputRef = useRef();

  //Manejamos los datos en tiempo real con useRealTimeData
  const newData = useRealTimeData();

  //Usamos useReducer para manejar la acciones relacionadas con el estado global
  const [state, dispatch] = useReducer(dataReducer, []);

  //Usamos useEffect para agregar estos nuevos datos secundarios al estado global
  useEffect(() => {
    dispatch({ type: 'Añadir_DATA', payload: newData });
    console.log('EL nuevo dato ha sido añadido:', newData);
  }, [newData]);

  //Usamos useMemo para optimizar el rendimiento del filtrado
  const filteredData = useMemo(() => {
    return state.filter((item) => item.value.toString().includes(filter));
  }, [filter, state]);

  //Usamos useCallback para evitar recrear innecesariamente funciones
  const handleFilterChange = useCallback(() => {
    setFilter(inputRef.current.value);
  }, []);

  return (
    <div>
      <h1>Tablero en tiempo real</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Filtrado por valor"
        onChange={handleFilterChange}
      />
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>
            {item.value} - {item.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

//Componente de la App
const App = () => {
  const [state, dispatch] = useReducer(dataReducer, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      <Dashboard />
    </DataContext.Provider>
  );
};

export default App;