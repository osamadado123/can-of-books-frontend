import React from 'react';
import axios from 'axios';
import UpdateForm from './UpdateForm';
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
      booksArr : [],
      // showFlag : false,
    currentBook : {}
    }
  }
  
 componentDidMount = ()=> {
axios.get(`http://localhost:3010/books`).then(result => {
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
    bookTitle : event.target.title.value,
    BookDescription : event.target.description.value,
    bookStatus : event.target.status.value
  }
  axios
  .post(`http://localhost:3010/books`, obj)
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
  .delete(`http://localhost:3010/books/${id}`) 
  .then(result =>{
    this.setState({
      booksArr : result.data
    })
  })
  .catch(err=>{
    console.log(err);
  })
}
 openForm = (item)=>{
  this.setState({
    showFlag : true,
    currentBook : item
  })
console.log(item);

 }
 
 handleClose = () =>{
  this.setState({
    showFlag : false
  })
}

updateBook = (event) => {
  event.preventDefault();
  
  let obj = {
    title: event.target.bookTitle.value,
    description: event.target.bookDescription.value,

  }
  const id = this.state.currentBook._id;
  axios
    .put(`https://localhost:3010/books/${id}`, obj)
    .then(result => {
      this.setState({
        booksArr: result.data
      })
      this.handleClose();
    })
    .catch(err => {
      console.log(err);
    })
    
}
  
  render() {
    return (
<div>
        <h1 className='header'>Books App</h1>
        <form onSubmit={this.addBook}>
          <input type="text" name="title" placeholder='Book Name' />
          <input type="text" name="description" placeholder='Book Description' />
          <input type="text" name ="status" placeholder ='Book Status'></input>
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
        <button onClick={()=> this.openForm(item)}>Update Book</button>
      </Carousel.Caption>
    </Carousel.Item>
          )})}
    </Carousel>):(<h2>No Books Found</h2>)
    }
            
            
         <UpdateForm
         show = {this.state.showFlag}
         handleClose = {this.handleClose}
         updateBook = {this.updateBook}
         currentBook = {this.state.currentBook}/>
          
        
        
      </div>



    )
  }
}

export default App;
