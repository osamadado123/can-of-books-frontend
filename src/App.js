import React from 'react';
import axios from 'axios';
import UpdateForm from './UpdateForm';
 import Header from './Header';
 import { withAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';
import { Link } from "react-router-dom";

//  import Footer from './Footer';
//  import BestBooks from './BestBooks';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import {
   BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import './App.css' 
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

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
    bookTitle : event.target.title.value,
    BookDescription : event.target.description.value,
    bookStatus : event.target.status.value
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
    .put(`https://serverapp7.herokuapp.com/books/${id}`, obj)
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
    const { isAuthenticated } = this.props.auth0;

    return (
      
      <>
      <h1 className='header'>Books App</h1>
     
      <LoginButton/>
      {isAuthenticated &&
      <div>
        
        
        <LogoutButton/>
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

    }

<div>
<Router>
  <Routes>
  <Route 
              exact path="/Profile"
              element={isAuthenticated && <Profile />}
            >
            </Route>

  </Routes>
</Router>
</div>
</>
    )
  }
}

export default withAuth0(App);
