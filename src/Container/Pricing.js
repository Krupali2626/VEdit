import React, { useState } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
// import { CheckCircle } from 'react-bootstrap-icons';
import CheckIcon from '@mui/icons-material/Check';

function Pricing(props) {
    const [selectedCard, setSelectedCard] = useState(null);

    const cardData = [
        {
            price: '$19 WEEKLY',
            subtitle: 'Save up to 10% with this package.',
            features: [
                'All basic features',
                'Free effect and filters',
                'Easy video editing',
                'Lorem ipsum dolor sit amet, consectetur'
            ]
        },
        {
            price: '$29 WEEKLY',
            subtitle: 'Save up to 30% with this package.',
            features: [
                'Access to all tools',
                'Lorem ipsum do',
                'Lorem ipsum dolor sit amet, consectetur ',
                'Lorem ipsum dolor sit amet, consectetur',
                'Lorem ipsum dolor sit amet, consectetur'
            ]
        },
        {
            price: '$49 WEEKLY',
            subtitle: 'Get access to video editor pro features.',
            features: [
                'Full HD resolution',
                'Lorem ipsum do',
                'Lorem ipsum dolor sit amet, consectetur ',
                'Lorem ipsum dolor sit amet, consectetur',
                'Lorem ipsum dolor sit amet, consectetur'
            ]
        }
    ];


    return (
        <>
            <section className='k_Feature_bg_image  p-4'>
                <div className='text-center text-white p-3 k_pricing_txt'>
                    <h3>Great videos start with a plan</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className='db_container'>
                    <div className="row text-white k_top_bot">
                        {cardData.map((card, index) => (
                            <div key={index} className='col-lg-4 col-md-6 col-sm-6 child'>
                                <Card
                                    className={`mx-auto k_cards_pricing p-4 ${selectedCard === index ? 'selected-card' : ''}`}
                                    style={{ maxWidth: '80%', cursor: 'pointer' }}
                                    onClick={() => setSelectedCard(index)}
                                >
                                    <Card.Body>
                                        <Card.Title className="mb-3">
                                            <h3 className="fw-bold text-white">{card.price}</h3>
                                        </Card.Title>
                                        <Card.Subtitle className="mb-4 text-secondary">
                                            {card.subtitle}
                                        </Card.Subtitle>
                                        <ListGroup variant="flush" className='k_list_grp'>
                                            {card.features.map((item, featureIndex) => (
                                                <ListGroup.Item key={featureIndex} className="bg-transparent text-white border-0 p-0 mb-2">
                                                    <CheckIcon className="me-2 text-white" />
                                                    {item}
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                        <Button variant="light" className="w-100 mt-4 fw-bold">
                                            Get started
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Pricing;