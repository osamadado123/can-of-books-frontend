import React from 'react';
import axios from 'axios';
// import Header from './Header';
//  import Footer from './Footer';
//  import BestBooks from './BestBooks';
 import 'bootstrap/dist/css/bootstrap.min.css';
//  import {
//    BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";
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
axios.get(`https://serverapp7.herokuapp.com/books`).then(result => {
console.log(result.data)
this.setState({
  booksArr : result.data
})
}).catch(err =>{

  console.log(err)
}) 
 }

 addBook = (event) =>{
  event.preventDefault();
  
  const obj = {
    bookTitle : event.target.bookTitle.value,
    BookDescription : event.target.BookDescription.value,
    bookStatus : event.target.bookStatus.value
  }
  axios
  .post(`https://serverapp7.herokuapp.com/books`, obj)
  .then(result =>{
    this.setState({
      booksArr : result.data
    })
  })
  .catch(err=>{
    console.log(err);
  })
}
deleteBook= (id) => {
  axios
  .delete(`https://serverapp7.herokuapp.com/books/${id}`) 
  .then(result =>{
    this.setState({
      booksArr : result.data
    })
  })
  .catch(err=>{
    console.log(err);
  })
}
  
  render() {
    return (
<div>
        <h1 className='header'>Books App</h1>
        <form onSubmit={this.addBook}>
          <input type="text" name="bookTitle" placeholder='Book Name' />
          <input type="text" name="BookDescription" placeholder='Book Description' />
          <input type="text" name ="bookStatus" placeholder ='Book Status'></input>
          <button type='submit'>Add Book</button>

        </form>
        {this.state.booksArr.length?(<Carousel className='car'>{
        
        this.state.booksArr.map(item =>{
          return(
            
            
      <Carousel.Item>
      <img
        className="d-block"
        src="https://images.wallpaperscraft.com/image/single/books_dark_shelf_159441_2560x1080.jpg"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3 className='h3'>{item.title}</h3>
        <p className='p1'>{item.description}</p>
        <p className='p1'> {item.status} </p>
        <button onClick={() => this.deleteBook(item._id)}>Delete Book</button>
      </Carousel.Caption>
    </Carousel.Item>
          )})}
    </Carousel>):(<h2>No Books Found</h2>)
    }
            
            
          
          
        
        
      </div>



    )
  }
}

export default App;
