import React,{Component} from 'react';

export default class Sidebar extends Component {

    render(){
        return(
            <aside className="main-sidebar">
                <section className="sidebar">
                <ul className="sidebar-menu" data-widget="tree">
                    <li className="treeview">
                        <a href="#">
                            <i className="fa fa-dashboard"></i> <span>Cadastros</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li><a onClick={()=>{this.props.history.push("/clientes")}} ><i className="fa fa-circle-o"></i> Clientes</a></li>
                            <li><a onClick={()=>{this.props.history.push("/contasfinanceiras")}}><i className="fa fa-circle-o"></i> Contas Financeiras</a></li>
                            <li><a onClick={()=>{this.props.history.push("/pedidos")}}><i className="fa fa-circle-o"></i> Pedidos</a></li>
                            <li><a onClick={()=>{this.props.history.push("/produtos")}}><i className="fa fa-circle-o"></i> Produtos</a></li>
                        </ul>
                    </li>
                </ul>
                <ul className="sidebar-menu" data-widget="tree">
                    <li className="treeview">
                        <a href="#">
                            <i className="fa fa-dashboard"></i> <span>Movimentos</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li><a onClick={()=>{this.props.history.push("/notasfiscais")}} ><i className="fa fa-circle-o"></i> Consultar Notas Fiscais</a></li>
                            <li><a onClick={()=>{this.props.history.push("/contasreceber")}}><i className="fa fa-circle-o"></i> Contas a receber</a></li>                            
                        </ul>
                    </li>
                </ul>
                <ul className="sidebar-menu" data-widget="tree">
                    <li className="treeview">
                        <a href="#">
                            <i className="fa fa-dashboard"></i> <span>Relatórios</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li><a><i className="fa fa-circle-o"></i> Saldos de contas</a></li>
                            <li><a><i className="fa fa-circle-o"></i> Pedidos</a></li>
                        </ul>
                    </li>
                </ul>
                </section>
            </aside>
        );
    }
}