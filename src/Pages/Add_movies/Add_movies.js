import React, { Component } from 'react';
import './Add_movies.css';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import ThirdForm from './ThirdForm';
import FourthForm from './FourthForm';
import FifthForm from './FifthForm';
import SixthForm from './SixthForm';
import SeventhForm from './SeventhForm';
import {Redirect,Link} from "react-router-dom";


export class Add_movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo : 1
        }
    }

    goToNextPage = () => {
        this.setState({
            pageNo : this.state.pageNo + 1
        })
    }

    goToPreviousPage = () => {
        this.setState({
            pageNo : this.state.pageNo - 1
        })        
    }

    componentDidMount = () => {
        let {id, num}= this.props.match.params;
        let no = (num) ? (parseInt(num) + 2) : 1
        let page = no;
        if(id){
            localStorage.setItem('movie_id', id);
        }
        console.log('www : ',localStorage.getItem('movie_id'));
        this.setState({
            pageNo : page
        })
    }
    

    render() {
        if(sessionStorage.getItem('auth')){
            let {num_master_id} = JSON.parse(sessionStorage.getItem('auth'));
            if(num_master_id !== '2'){
              //history.push("/producer");
              console.log("userpage");
              return  <Redirect to="/" />
            }
        }else{
            console.log("homepage");
         return   <Redirect to="/" />

        }
        const formPages = () =>{
            if(this.state.pageNo === 1){
                return <FirstForm next={this.goToNextPage} previous={this.goToPreviousPage}/>
            }else if(this.state.pageNo === 2){
                return <SecondForm next={this.goToNextPage} previous={this.goToPreviousPage}/>
            }else if(this.state.pageNo === 3){
                return <ThirdForm next={this.goToNextPage} previous={this.goToPreviousPage}/>
            } else if(this.state.pageNo === 4){
                return <FourthForm next={this.goToNextPage} previous={this.goToPreviousPage}/>
            } else if(this.state.pageNo === 5){
                return <FifthForm next={this.goToNextPage} previous={this.goToPreviousPage}/>
            } else if(this.state.pageNo === 6){
                return <SixthForm next={this.goToNextPage} previous={this.goToPreviousPage}/>
            } else{
                return <SeventhForm next={this.goToNextPage} previous={this.goToPreviousPage}/>
            } 
        }
        return (
            <div className="Add_movies">
                {formPages()}
            </div>
        )
    }
}

export default Add_movies;
