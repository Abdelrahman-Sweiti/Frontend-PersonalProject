// src/Components/CardSearch.js
import React, { useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';

const CardSearch = () => {
  const [cardName, setCardName] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://localhost:7014/api/cards?cardName=${encodeURIComponent(cardName)}`);
      const responseData = await response.json();

      if (responseData && responseData.data) {
        setSearchResult(responseData.data);
      } else {
        setSearchResult([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (

    
    <Container className="mt-5">
      <p>Use "Fallen of albaz" to test the external Api</p>
      <h2>Card Search</h2>
      <Form>
        <Row>
          <Col xs={8}>
            <Form.Control
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Enter card name"
            />
          </Col>
          <Col xs={4}>
            <Button variant="primary" onClick={handleSearch}>Search</Button>
          </Col>
        </Row>
      </Form>
      {searchResult.length > 0 && (
        <div className="mt-3">
          <h3>Search Results:</h3>
          <ListGroup>
            {searchResult.map((card) => (
              <ListGroup.Item key={card.id}>
                <strong>Name:</strong> {card.name}, <strong>Type:</strong> {card.type}, <strong>Description:</strong> {card.desc}
                <br />
                <strong>Attributes:</strong> {card.attribute}, <strong>Level:</strong> {card.level}, <strong>Race:</strong> {card.race}
                <br />
                <strong>Attack/Defense:</strong> {card.atk}/{card.def}, <strong>Frame Type:</strong> {card.frameType}
                <br />
                <strong>Sets:</strong>
                <ul>
                  {card.cardSets && card.cardSets.map((set) => (
                    <li key={set.setCode}>
                      {set.setName} ({set.setRarity})
                    </li>
                  ))}
                </ul>
                <strong>Card Prices:</strong>
                <ul>
                  {card.cardPrices && card.cardPrices.map((price) => (
                    <li key={price.cardmarketPrice}>
                      <strong>Cardmarket:</strong> {price.cardmarketPrice}, <strong>TCGPlayer:</strong> {price.tcgplayerPrice}, <strong>Ebay:</strong> {price.ebayPrice}
                    </li>
                  ))}
                </ul>
                {card.cardImages && card.cardImages.length > 0 && (
                  <div>
                    <strong>Card Images:</strong>
                    <ul>
                      {card.cardImages.map((image) => (
                        <li key={image.id}>
                          <img src={image.imageUrl} alt={`Card ${card.name}`} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Log the entire card data to the console */}
                {console.log('Card Data:', card)}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </Container>
  );
};

export default CardSearch;
