import React from 'react';
import axios from 'axios';
import Header from './Header';
 import Footer from './Footer';
 import BestBooks from './BestBooks';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import {
   BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import './App.css' 

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      booksArr : []
    }
  }
  
 componentDidMount = ()=> {
axios.get(`http://localhost:3010/books`).then(result => {

this.setState({
  booksArr : result.data
})
}).catch(err =>{

  console.log(err)
}) 
 }
  
  render() {
    return (
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block"
          src="https://thethinksync.com/wp-content/uploads/2021/05/annakarenina.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className='h3'>Anna Karenina</h3>
          <p className='p1'>Anna Karenina tells of the doomed love affair between the sensuous and rebellious Anna and the dashing officer, Count Vronsky. Tragedy unfolds as Anna rejects her passionless marriage</p>
          <p className='p1'> by Leo Tolstoy </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src="https://kbimages1-a.akamaihd.net/14d3b404-15a6-4f3a-a426-32a66c5c942e/353/569/90/False/madame-bovary-386.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 className='h3'>Madame Bovary</h3>
          <p className='p1'>For daring to peer into the heart of an adulteress and enumerate its contents with profound dispassion, the author of Madame Bovary was tried for offenses against morality</p>
          <p className='p1'> by Gustave Flaubert </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src="https://m.media-amazon.com/images/I/616FPBY+fZL.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3 className='h3'>The Great Gatsby</h3>
          <p className='p1'>
          The novel chronicles an era that Fitzgerald himself dubbed the Jazz Age. Following the shock and chaos of World War I, American society enjoyed unprecedented levels of prosperity

          </p>
          <p className='p1'> by F. Scott Fitzgerald </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      

    )
  }
}

export default App;
