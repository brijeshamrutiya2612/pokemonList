import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Button, Spinner, Alert, Form } from 'react-bootstrap';
import debounce from 'lodash.debounce'; 

const PokemonList = () => {
  const [fetchPokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');  

  const getPokemonList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/v1/pokemon`, {
        params: {
          page: page,
          q: searchQuery,  
          per_page: 10,
        },
      });

      if (response.data) {
        const newPokemonList = response?.data?.data;

        if (page === 1) {
          setPokemonList(newPokemonList);
        } else {
          setPokemonList(prevList => [...prevList, ...newPokemonList]);
        }

        setHasMore(newPokemonList.length > 0); 
      }
    } catch (err) {
      setError('Failed to fetch Pokémon data');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedGetPokemonList = debounce(getPokemonList, 500);

  useEffect(() => {
    debouncedGetPokemonList();
  }, [page, searchQuery]);  

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);  
    setPage(1);  
    setPokemonList([]);
  };

  if (loading && page === 1) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Pokémon List</h2>

      <Form.Control
        type="text"
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4"
      />

      <Row>
        {fetchPokemonList.map((pokemon, index) => (
          <Col sm={12} md={6} lg={4} key={index}>
            <Card className="mb-4">
              <Card.Img 
                variant="top" 
                src={pokemon?.image?.thumbnail || 'https://via.placeholder.com/150'} 
                alt={`${pokemon.name.english} image`} 
              />
              <Card.Body>
                <Card.Title>{pokemon.name.english}</Card.Title>
                <Card.Text>
                  <strong>Type:</strong> {pokemon?.type?.join(', ') || 'N/A'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
        
        {hasMore && !loading && fetchPokemonList.length > 0 && (
          <div className="text-center mt-4">
            <Button onClick={loadMore} variant="primary">Load More</Button>
          </div>
        )}

        {fetchPokemonList.length === 0 && !loading && (
          <div className="text-center mt-4">
            <Alert variant="info">No Pokémon found. Try searching again.</Alert>
          </div>
        )}
      </Row>
    </div>
  );
};

export default PokemonList;
