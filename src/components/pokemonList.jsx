import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Spinner } from 'react-bootstrap';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPokemonList = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/v1/pokemon`);

        if (response.data) {
          setPokemonList(response.data.data);
        }
      } catch (err) {
        setError('Failed to fetch Pokémon data');
        console.log(err);
      } finally {
        setLoading(false); // Turn off loading state once the data is fetched
      }
    };

    getPokemonList();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Pokémon List</h2>
      <Row>
        {pokemonList.map((pokemon, index) => (
          <Col sm={12} md={6} lg={4} key={index}>
            <Card className="mb-4">
              <Card.Img variant="top" src={pokemon?.image || 'https://via.placeholder.com/150'} />
              <Card.Body>
                <Card.Title>{pokemon.name}</Card.Title>
                <Card.Text>
                  <strong>Type:</strong> {pokemon?.type}
                </Card.Text>
                <Card.Text>
                  <strong>Abilities:</strong> {pokemon?.abilities.join(', ')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
};

export default PokemonList;
