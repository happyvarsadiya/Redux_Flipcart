import 'bootstrap/dist/css/bootstrap.min.css';
import myimg from '../image/logo.svg';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { cartdata } from '../App/Reducer/CartSlice';

function Home() {

    const dispatch = useDispatch()

    const [home1, sethome1] = useState([]);
    const [item, setitem] = useState([]);

    let [reset, setreset] = useState([]);
    let [search, setsearch] = useState("");

    useEffect(() => {
        axios.get("https://dummyjson.com/products/categories")
            .then(function (response) {
                sethome1(response.data);
                // console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("https://dummyjson.com/products")
            .then(function (response) {
                setitem(response.data.products);
                setreset(response.data.products)
                // console.log(response.data.products);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const combtn = (ele) => {
        let completebtn = reset.filter((item, index) => {
            return item.category == ele;
        })
        setitem(completebtn);
    };

    const Clickbtn = async () => {
        try{
            const response = await axios.get(`https://dummyjson.com/products/search?q=${search}`);
            setitem(response.data.products);
        }catch(error){
            setitem("error",error);
        }
        setsearch('');
        // var data = reset.filter((item, index) => {
        //     return item.title == search;
        // })
        // setitem(data);
        // setsearch("");
    };

    const addcart = (item) =>{
        // alert();
        console.log(item);
        dispatch(cartdata(item));
    }

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
                                <input type='text' className='' placeholder='Search for Product, Brand and More...' size={40}
                                    onChange={(e) => setsearch(e.target.value)}></input>
                                <p className='searchicon'><FaSearch></FaSearch></p>
                                <input type='button' className='searchbtn' value={"Click"} onClick={Clickbtn}></input>
                            </div>
                        </Col>
                        <Col>
                            <div className='d-flex text-white cart'>
                            <Link to="cart"><p className='ms-5 me-3 mt-1 fs-4'><FaCartShopping></FaCartShopping><button className='increbtn'></button></p>
                            </Link><h2>Cart</h2>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/*  */}
            <div className='secpart'>
                <Container>
                    <Row>
                        <Col lg={3}>
                            <div className='filter m-3 p-3'>
                                <h3 className='ms-3 text-black'>Filter....!</h3>
                                <p className='ms-3 text-black fs-4'>CATEGORIES::</p>
                                <div className='color'>
                                    {
                                        home1.map((ele, ind) => {
                                            return (
                                                <>
                                                    <ul key={ind}>
                                                        <li><button className='catbtn' onClick={() => { combtn(ele) }}>{ele}</button></li>
                                                    </ul>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col lg={9}>
                            <div className='allitem'>
                                <p className='mt-3 p-3 text-center'>A printer is an important electronic device and a vital component of a computer. For the uninitiated, a printing machine is equipment that transfers information available in text and image form to paper. It converts the soft copy of a document to a hard copy. It is an external device that is connected to the computer to get the required printouts. You can print anything and everything through it, be it an image, text, charts, graphs, or other data. With the advancement in technology, the device has evolved over time. Depending on the technologies, these are of different types, including Inkjet, Laser, Ink Tank, etc. If you are searching for a printer ...
                                </p>
                            </div>
                            <div className='allitem'>
                                <div className='item d-flex flex-wrap'>
                                    {
                                        item.map((ele, ind) => {
                                            return (
                                                <>
                                                    <div className='itemm' key={ind}>
                                                        <div className='first'>
                                                        <Link to={`/About/${ele.id}`} target='_blank' ><img src={ele.images[0]} ></img></Link> 
                                                        </div>
                                                        <div className='sec'>
                                                            <span className='ms-3'>
                                                                {/* <h6 className='fs-6'>"Id:"{ele.id}</h6> */}
                                                                <h2 className='fst-italic'>{ele.title}</h2>
                                                            </span>
                                                            <p className='text text-secondary'>"Description:"  {ele.description}</p>
                                                            <span className='d-flex'>
                                                                <h2>₹ {ele.price}</h2>
                                                                <h6 className='ms-3 mt-2 text-success'>{ele.discountPercentage} % (off)</h6>
                                                            </span>
                                                            <span className='d-flex'>
                                                                <button className='ratbtn'>{ele.rating} * </button>
                                                                <p className='m-2 text-secondary'>Rating</p>
                                                            </span>
                                                            <h6 className='font-monospace'>"Stock:" {ele.stock}</h6>
                                                            <h6 className='font-monospace'>"Brand:" {ele.brand}</h6>
                                                            <h6 className='font-monospace'>"category:"{ele.category}</h6>
                                                            <Button variant="primary" className='mt-2'><a href={ele.thumbnail} className="text-white" src="">Show Here</a></Button>
                                                            <button className='addbtn'
                                                             onClick={() => addcart(ele)}
                                                             ><FaCartShopping></FaCartShopping> ADD TO CART</button>
                                                        </div>

                                                    </div>
                                                </>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default Home;