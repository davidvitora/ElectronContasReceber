import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router , Route, Link } from 'react-router-dom';
import Content from './faces/Content';
import Footer from './faces/Footer';
import Header from './faces/Header';
import Recebimentos from './faces/Recebimentos';
import Sidebar from './faces/Sidebar';

const login = (props) => {
    var cliente = new Cliente();
    console.log(cliente.testar())
    return (
        <div>
            <h1>login</h1>
            <button onClick={()=>{props.history.push("/teste")}}>Ir para teste</button>
        </div>
    );
}
const teste = (props) => {
    return (
        <div>
            <h1>teste</h1>
            <button onClick={()=>{props.history.push("/login")}}>Ir para teste</button>
        </div>
    );
}

/*class raiz extends Component{
    componentDidMount(){
        this.props.history.push("/login");
    }
    render(){ 
        return (
            <div>
                
            </div>
        )
    }
}*/

class raiz extends Component{
    componentDidMount(){
        this.props.history.push("/clientes");
    }
    render(){ 
        return (
            <div>
                <Header/>
                <Sidebar history={this.props.history} />
                <Content/>
                <Footer/>
            </div>
        )
    }
}
 
ReactDOM.render(
    <Router>
        <div>
            <Route path="/" component={raiz}>
            </Route>
        </div>
    </Router> , document.getElementById("root")
);