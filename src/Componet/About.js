import { Container, Row, Col, Button } from 'react-bootstrap';
import myimg from '../image/logo.svg';
import { FaSearch } from "react-icons/fa";
import { FaCartShopping, FaLocationArrow } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoArrowRedo } from "react-icons/io5";
import { useParams } from 'react-router-dom';


function About() {

    const {id} = useParams();

    const [home1, sethome1] = useState({ images: [] });
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${id}`)
            .then(function (response) {
                sethome1(response.data);
                // console.log(response.data);
                setSelectedImage(response.data.images[0] || null);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <>

            <div className="back">
                <Container fluid>
                    <Row>
                        <Col>
                            <img src={myimg} className='logoimg'></img>
                        </Col>
                        <Col>
                            <div className='d-flex searchh'>
                                <input type='text' className='' placeholder='Search for Product, Brand and More...' size={40}></input>
                                <p className='searchicon'><FaSearch></FaSearch></p>
                            </div>
                        </Col>
                        <Col>
                            <div className='d-flex text-white cart'>
                                <p className='ms-5 me-3 mt-1 fs-4'><FaCartShopping></FaCartShopping></p>
                                <h2>Cart</h2>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container>
                <Row>
                    <Col lg={1}> 
                        <div className='allimg'>
                        {
                            home1.images.map((ele, ind) => (
                                <ul key={ind} onClick={() => handleImageClick(ele)}>
                                    <li><img src={ele} alt={`Image ${ind + 1}`} /></li>
                                </ul>
                            ))}
                        </div>
                    </Col>
                    <Col lg={4}>
                    { selectedImage && (
                            <div className='selected mt-2'>
                                <img src={selectedImage} alt="Selected Image" />
                            </div>
                        )}
                        <div className='d-flex ms-2'>
                            <button className='btn2'>BUY NOW</button>
                        </div>
                    </Col>
                    <Col lh={6}>
                        <div className='m-3'>
                            <p>Egate i9 Pro-Max (4500 lm / 1 Speaker / Remote Controller) 1080p Native Full HD, (300 ANSI) LED 4k support with 210" (534 cm) Screen, Widescreen LTPS | 3W Speaker | AV, VGA, HDMI, SD Card, USB, Audio Out, Bluetooth Projector...</p>
                            <img src={require('../image/dummy.png')} className='logo2'></img>
                            {/* {
                                home1.map((ele,ind)=>{
                                return(
                                <> */}
                                    <ul className='mt-3 abouticon'>
                                        <li >
                                            <h5>{home1.description}</h5>
                                            <p className='fst-italic fs-3'>{home1.title}</p>
                                        <div className='d-flex'>
                                            <img src={require('../image/Capture.jpg')}></img>
                                            <p className='m-2 fw-bold text-secondary'>{home1.rating} Rating  && </p>
                                            <p className='m-2 fw-bold text-secondary'>Brand: {home1.brand} </p>
                                        </div>
                                        <div className='d-flex'>
                                            <h1 className='mt-3'>₹{home1.price}</h1>
                                            <p className='fw-medium mt-4 ms-3 fs-5 text-success'>{home1.discountPercentage}% off</p>
                                        </div>
                                        <a href='' className='text-black'><p className='font-monospace fs-4'>Category:{home1.category}</p></a>
                                        </li>
                                        <sapn className='d-flex'>
                                            <p className='fs-4 text-success'><IoArrowRedo ></IoArrowRedo ></p>
                                            <p className='ms-2 mt-2'>Bank Offer10% off on Axis Bank Credit Card Transactions, up to ₹1,250 on orders of ₹5,000.</p>
                                        </sapn>
                                        <sapn className='d-flex'>
                                            <p className='fs-4 text-success'><IoArrowRedo ></IoArrowRedo ></p>
                                            <p className='ms-2 mt-2'>Bank Offer10% off on HDFC Bank Credit Card Transactions, up to ₹1,250 on orders of ₹5,000</p>
                                        </sapn>
                                        <sapn className='d-flex'>
                                            <p className='fs-4 text-success'><IoArrowRedo ></IoArrowRedo ></p>
                                            <p className='ms-2 mt-2'>Bank Offer10% off on HDFC Bank Credit Card Transactions, up to ₹1,250 on orders of ₹5,000</p>
                                        </sapn>
                                        <sapn className='d-flex'>
                                            <p className='fs-4 text-success'><IoArrowRedo ></IoArrowRedo ></p>
                                            <p className='ms-2 mt-2'>Special PriceGet extra 61% off (price inclusive of cashback/coupon).</p>
                                        </sapn>
                                    </ul>
                            {/* </>
                            )
                        })
                    } */}
                        </div>
                    </Col>

                </Row>
            </Container>

        </>
    )
}
export default About;