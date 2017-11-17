import React,{Component} from 'react';

export default class Recebimentos extends Component {
    render(){
        return(
            <header className="main-header">
                <a className="logo">
                <span className="logo-lg">Contas a receber</span>
                </a>
                <nav className="navbar navbar-static-top">
                <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                    <span className="sr-only">Toggle navigation</span>
                </a>
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                    <li className="dropdown user user-menu">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <img src="dist/img/user2-160x160.jpg" className="user-image" alt="User Image"/>
                        <span className="hidden-xs">David Vitor Antonio</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" data-toggle="control-sidebar"><i className="fa fa-sign-out"></i></a>
                    </li>
                    </ul>
                </div>
                </nav>
            </header>
        );
    }
}