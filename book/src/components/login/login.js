import React, { Component } from 'react'
import LoginService from './loginService'

export class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            showSuccess:false,
            showError:false,
            errorMessage:'',
            successMessage:''
        }
        this.LoginService = new LoginService();
    }
    changeText = (e) => {
        let nam = e.target.name;
        let val = e.target.value
        this.setState({[nam]:val })
    }
    onSubmit(e) {
        e.preventDefault();
    }
    login(e) {
        this.LoginService.login(this.state.username,this.state.password,this.LoginSuccess,this.LoginError)
        console.log('Login con username: ', this.state.username)
        console.log('Login con password: ', this.state.password)
    }
    LoginSuccess = (dataResult) =>{
        this.setState({
            showSuccess:true,
            successMessage:`Login effettuato con successo il tuo token è: ${dataResult.token} `,
            showError:false,
            errorMessage:''
        })
        this.props.history.push('/booklist')
    }
    LoginError = (errorData) => {
        this.setState({
            showSuccess: false,
            successMessage: '',
            showError: true,
            errorMessage: 'Login fallito per ' + errorData.error
        })
    }
    getSuccessMessage =()=>{
        if(this.state.showSuccess){
            return (
                <div style={{color:'green'}}>
                    {this.state.successMessage}
                </div>
            );
        }else {
            return (
                <div>
                </div>
            ); 
        }
    }
    getErrorMessage = () => {
        if (this.state.errorMessage) {
            return (
                <div style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </div>
            );
        } else {
            return (
                <div>
                </div>
            );
        }
    }
    render() {
        var successMessage = this.getSuccessMessage();
        var errorMessage = this.getErrorMessage();
        return (
            <div style={{ marginTop: "100px", minHeight: "70vh" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-6 mr-auto ml-auto">
                            <form onSubmit={this.onSubmit.bind(this)}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name='username'
                                        className="form-control"
                                        placeholder="username"
                                        value={this.state.username}
                                        onChange={this.changeText} />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name='password'
                                        className="form-control"
                                        placeholder="password"
                                        value={this.state.password}
                                        onChange={this.changeText} />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary pull-right"
                                    onClick={this.login.bind(this)}
                                >
                                    Invio
								</button>
                                {successMessage}
                                {errorMessage}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default login
