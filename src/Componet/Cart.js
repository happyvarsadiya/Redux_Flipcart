import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { decrement, increment, removeItem } from '../App/Reducer/CartSlice';
import { useDispatch } from 'react-redux';

function Cart() {

    const arr = useSelector((state) => state.counter.value);
    const dispatch = useDispatch()

    const handleincrement = (id) => {
        dispatch(increment({ id }));
    }
    const handledecrement = (id) => {
        dispatch(decrement({ id }))
    }
    const price = (price, qut) => {
        return price * qut;
    }
    const totalbill = arr.reduce((total, item) => total + item.price * item.qut, 0);
    const discount = totalbill * 0.12;
    const Totalafter = totalbill - discount;
    const gst = Totalafter * 0.18;
    const finaltotal = Totalafter + gst;

    const handleRemove = (id) => {
        dispatch(removeItem({ id }));
    };

    return (
        <>
            <Container>
                <Row>
                    <Col lg={8}>
                        <div className='gray'>
                            {
                                arr.map((ele) => {
                                    return (
                                        <>
                                            <div className='d-flex borderbox'>
                                                <div className=''>
                                                    <p className='cartimg'><img src={ele.thumbnail}></img></p>
                                                </div>
                                                <div className='decpart ms-5 mt-3'>
                                                    <h6 className='me-3'>{ele.id}.{ele.description}</h6>
                                                    <p class="fw-normal">{ele.brand}</p>
                                                    <div className='d-flex'>
                                                        <p className='fs-5 fw-bolder'> ₹ {ele.price}</p>
                                                        <p className='ms-2 fw-semibold text-success text-decoration-line-through'>{ele.discountPercentage}</p>
                                                    </div>
                                                    <Button variant="light" className='m-2' onClick={() => handleincrement(ele.id)}>+</Button> {ele.qut}  <Button variant="light" onClick={() => handledecrement(ele.id)}> - </Button>
                                                    <div>
                                                        <Button className='m-2 btn-warning  text-light' onClick={() => handleRemove(ele.id)}>Remove</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='part2 m-4 p-3'>
                            <p className='text-secondary fs-5 text-underline'>PRICE DETAILS:</p>
                            <p className='font-monospace'>Total Price: ₹{totalbill}</p>
                            <p className='font-monospace text-success'>Discount: -₹{discount.toFixed(0)}</p>
                            <p className='font-monospace'>TotalAfterDiscount:{Totalafter.toFixed(0)}</p>
                            <p className='font-monospace'>Gst:{gst.toFixed(0)}</p>
                            <p className='font-monospace fs-4'>finalTotalAmount: ₹{finaltotal.toFixed(0)}</p>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}
export default Cart;
