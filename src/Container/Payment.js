import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function Payment(props) {
    const [activeKey, setActiveKey] = useState('0');

    const handleAccordionToggle = (eventKey) => {
        setActiveKey(eventKey === activeKey ? null : eventKey);
    };

    const accordionItems = [
        {
            eventKey: '0',
            header: 'Credit card / Debit card',
            body: (
                <div className="card-inputs_k">
                    <div className="input-row_k">
                        <input type="text" placeholder="Enter card number" className="full-width_k" />
                        <input type="text" placeholder="MM / YY" />
                        <input type="text" placeholder="CVV" />
                    </div>
                    <input type="text" placeholder="Enter card holder name" className="full-width_k" />
                    <div className="button-container_k">
                        <button className="pay-button_k">Pay</button>
                    </div>
                </div>
            )
        },
        {
            eventKey: '1',
            header: 'UPI',
            body: 'UPI payment content'
        },
        {
            eventKey: '2',
            header: 'Net Banking',
            body: 'Net Banking content'
        }
    ];
    return (
        <>
            <section className='k_Feature_bg_image p-5'>
                <div className="custom-accordion-container_k ">
                    <h2 className="payment-title_k">Payment Options</h2>
                    <Accordion activeKey={activeKey} onSelect={handleAccordionToggle} flush>
                        {accordionItems.map((item) => (
                            <Accordion.Item key={item.eventKey} eventKey={item.eventKey} className="accordion-item_k">
                                <Accordion.Header className="accordion-header_k">
                                    <span className="radio-circle_k"></span>
                                    {item.header}
                                </Accordion.Header>
                                <Accordion.Body className="accordion-body_k">{item.body}</Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
            </section>
        </>
    );
}

export default Payment;