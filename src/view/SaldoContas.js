import React,{Component} from 'react';

export default class SaldoContas extends Component {
    render(){
        return(
            <div>
                <section className="content-header">
                    <h1>
                        Relatorios
                        <small>Relatório de saldo de contas</small>
                    </h1>
                    <ol className="breadcrumb">
                    <li><a><i className="fa fa-dashboard"></i> Painel</a></li>
                    <li className="active">Relatorios</li>
                    </ol>
                </section>
                <section className="content">
                </section>
            </div>
        );
    }
}