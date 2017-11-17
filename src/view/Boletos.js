import React,{Component} from 'react';

export default class Boletos extends Component {
    render(){
        return(
            <div>
                <section className="content-header">
                    <h1>
                        Cadastro
                        <small>Boletos</small>
                    </h1>
                    <ol className="breadcrumb">
                    <li><a><i className="fa fa-dashboard"></i> Painel</a></li>
                    <li className="active">Contas a receber</li>
                    </ol>
                </section>
                <section className="content">
                </section>
            </div>
        );
    }
}