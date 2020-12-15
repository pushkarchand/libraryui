import React,{useEffect, useRef, useContext} from 'react';
import {postApi} from '../services/apiservice';
import {stateContext} from '../context';
import {setPaymentOpen} from '../context/action'
import Notify, {AlertTypes} from '../services/notify';

export default function PayPal() {

    const paypal = useRef()
    const context = useContext(stateContext);

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, error) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: context.state.purchasedBook.BookName,
                            amount: {
                                currency_code: "SGD",
                                value: context.state.purchasedBook.Price * context.state.purchasedBook.Quantity
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                const orderResponse = await postApi('SaveOrder', context.state.purchasedBook);
                context.dispatch(setPaymentOpen(false));
                Notify.sendNotification('Successfully placed order', AlertTypes.success)
            },
            onError: (error) => {
                console.log(error);
            }
        }).render(paypal.current);
    }, [])
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}

