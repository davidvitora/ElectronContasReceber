import React,{Component} from 'react';
import { BrowserRouter as Router , Route, Link } from 'react-router-dom';
import Boletos from '../view/Boletos';
import Clientes from '../view/Clientes';
import ContasFinanceiras from '../view/ContasFinanceiras';
import ContasReceber from '../view/ContasReceber';
import GerarBoleto from '../view/GerarBoleto';
import Pedidos from '../view/Pedidos';
import NotasFiscais from '../view/NotasFiscais';
import Produtos from '../view/Produtos';
import RelatorioPedidos from '../view/RelatorioPedidos';
import SaldoContas from '../view/SaldoContas';

export default class Content extends Component {
    render(){
        return(
            <div className="content-wrapper">
                <Route exact path="/boletos" component={Boletos}>
                </Route>
                <Route exact path="/clientes" component={Clientes}>
                </Route>
                <Route exact path="/contasreceber" component={ContasReceber}>
                </Route>
                <Route exact path="/contasfinanceiras" component={ContasFinanceiras}>
                </Route>
                <Route exact path="/gerarboleto" component={GerarBoleto}>
                </Route>
                <Route exact path="/pedidos" component={Pedidos}>
                </Route>
                <Route exact path="/produtos" component={Produtos}>
                </Route>
                <Route exact path="/relatoriopedidos" component={RelatorioPedidos}>
                </Route>
                <Route exact path="/saldocontas" component={SaldoContas}>
                </Route>
                <Route exact path="/notasfiscais" component={NotasFiscais}>
                </Route>
            </div>
        );
    }
}