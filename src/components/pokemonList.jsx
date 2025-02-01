import axios from 'axios';
import { useEffect } from 'react';

const PokemonList = () => {

  useEffect(() => {
    const getPokemonList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/v1/pokemon');
      
            if (response.data) {
              console.log('Login successful', response.data);
            }
          } catch (err) {
            console.log('Invalid credentials, please try again.');
          }
    };
    getPokemonList();
  }, []);
  return <></>;
};

export default PokemonList;
