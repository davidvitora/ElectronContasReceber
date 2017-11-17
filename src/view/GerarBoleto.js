import React,{Component} from 'react';

export default class GerarBoleto extends Component {
    render(){
        return(
            <div>
                <section className="content-header">
                    <h1>
                        Movimentos
                        <small>Gerar Boleto</small>
                    </h1>
                    <ol className="breadcrumb">
                    <li><a><i className="fa fa-dashboard"></i> Painel</a></li>
                    <li className="active">Gerar Boleto</li>
                    </ol>
                </section>
                <section className="content">
                </section>
            </div>
        );
    }
}