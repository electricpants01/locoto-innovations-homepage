import React, {useEffect, useState} from 'react';
import {getAllStudents} from "../lib/students";

// Define the type for a single data item
interface DataItem {
  _id: string; // MongoDB ObjectId
  nombre: string;
  telefono: string;
}

const SearchAndResults = () => {
  const [data, setData] = useState<DataItem[]>([]); // Full data fetched from MongoDB
  const [filteredResults, setFilteredResults] = useState<DataItem[]>([]); // Filtered data based on search
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search input value
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    console.log("hola")
    const fetchData = async () => {
      try {
        console.log("before fetching data");
        // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const response = await getAllStudents();
        console.log("after fetching data");
        const result: DataItem[] = await response.json();
        console.log(result);
        setData(result); // Populate the full dataset
        setFilteredResults(result); // Initially show all data
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    console.log("hola")
    fetchData().catch(console.error);
  }, []);

  // Handle search input changes
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    const term = event.target.value.toLowerCase();
    console.log(term)
    setSearchTerm(term);
    setFilteredResults(
      data.filter((item) =>
        item.nombre.toLowerCase().includes(term)
      )
    );
  };

  // Render a loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render an error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{maxWidth: '600px', margin: '0 auto', padding: '20px'}}>
      <h1>Search and Display</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          fontSize: '16px',
        }}
      />
      <div>
        {filteredResults.map((item) => (
          <div
            key={item._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '10px',
            }}
          >
            <h3>{item.nombre}</h3>
            <p>{item.telefono}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAndResults;
