import React, { useState } from 'react';
import axios from 'axios';

export interface Student {
  "2": number;
  nombre: string;
  carrera: string;
  ci_lugar: string;
  direccion: {};
  fecha_nac: string;
  registro: number;
  sexo: string;
  telefono: number;
  apellido_pri: string;
  apellido_seg: string;
  carr: string;
  carr_cod: number;
  celular: number;
  ci: number;
  ubicacion: string;
  fullName: string;
}

const SearchAndResult: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Student[]>([]); // Use the User model
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get<[Student]>(
        `https://qifhnyrk4f.execute-api.us-east-1.amazonaws.com/search?name=${searchTerm}`
      );
      setResults(response.data); // Set the results using the User model
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Results or Placeholder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-md">
              <h3 className="text-xl font-bold mb-2">{result.fullName}</h3>
              <p><strong>Carrera:</strong> {result.carrera}</p>
              <p><strong>Registro:</strong> {result.registro}</p>
              <p><strong>CI:</strong> {result.ci}</p>
              <p><strong>Fecha de Nacimiento:</strong> {result.fecha_nac}</p>
              <p><strong>Teléfono:</strong> {result.telefono}</p>
              <p><strong>Ubicacion:</strong> {result.ubicacion}</p>
            </div>
          ))
        ) : (
          // Placeholder cards
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-md">
              <h3 className="text-xl font-bold mb-2">Placeholder Card {index + 1}</h3>
              <p><strong>Carrera:</strong> Placeholder Carrera</p>
              <p><strong>CI:</strong> Placeholder CI</p>
              <p><strong>Fecha de Nacimiento:</strong> Placeholder Fecha</p>
              <p><strong>Teléfono:</strong> Placeholder Teléfono</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchAndResult;