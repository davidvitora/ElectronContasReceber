import React,{Component} from 'react';
import ObjectDAO from '../db/dao/NotaFiscal';
import ClienteDAO from '../db/dao/Cliente';
import ProdutoDAO from '../db/dao/Produto';
import CrudNavegator from '../component/CrudNavegator';

export default class NotasFiscais extends Component {
    constructor(){
        super();
        this.state = {idList : [], 
            idObj: 0,  
            objectData: {id: 0, cancelada: false, numero_documento: '000000000', valor: 0, id_cliente: 0, cliente_nome: ""},
            pedidoItens: [],
            pedidoItensDelete: [],
            objectDAO : new ObjectDAO(this),
            clienteDAO : new ClienteDAO(this),
            produtoDAO : new ProdutoDAO(this),
            newObject: false,
            produtos: [],
            clientes: [],
            itemKey: 0
        };
    }

    componentWillMount(){
        this.getFirstId()
        this.updateIdList()
    }

    componentDidMount(){
        this.updateClientesList()
        this.updateProdutosList()
    }

    updateClientesList(){
        this.state.clienteDAO.getAll((err, result)=>{
            if(err){
                alert(err)
            } else {
                if(this.state.objectData.id_cliente == 0){
                    this.state.objectData.id_cliente = result[0].id;
                }
                this.setState({clientes: result}) 
            }
        })
    }

    updateProdutosList(){
        this.state.produtoDAO.getAll((err, result)=>{
            if(err){
                alert(err)
            } else {
                this.setState({produtos: result})
            }
        })
    }

    getFirstId(){
        this.state.objectDAO.getFirstId((err, result)=>{
            if(err){
                alert(err);
            } else {
                if(result != undefined){
                    this.setState({idObj : result.id});
                    this.readObject(result.id);
                } else {
                    alert("Nenhuma nota fiscal foi gerada")
                    this.setState({idObj : 0, objectData: {id: 0, cancelada: false, numero_documento: '000000000', valor: 0, id_cliente: "", cliente_nome: ""}, pedidoItens: []});
                    this.getCliente()
                }
            }
        });
    }

    updateIdList(){
        this.state.objectDAO.getIdList((err, result)=>{
            if(err){
                alert(err);
            } else {
                if(result.length != 0){
                    this.setState({idList : result});
                }
            }
        });
    }

    cancelarNF(){
        if(this.state.objectData.cancelada != true){
            this.state.objectData.cancelada = true;
            this.state.objectDAO.save(this.state.objectData, (err, result)=>{ 
                this.readObject(this.state.objectData.id);
            });
        }else{
            alert("Nf-e já cancelada");
        }
    }

    readObject(id){
        console.log("lendo");
        this.state.objectDAO.getObject( id , (err, result)=>{
            if(err){
                alert(err);
            } else {
                this.setState({ objectData: result }, ()=>{
                    console.log(this.state.objectData);
                })
                this.setState({idObj : result.id});
                this.state.objectDAO.getItens( id , (err, result)=>{
                    if(err){
                        alert(err);
                    } else {
                        console.log("get itens")
                        console.log(result)
                        this.setState({ pedidoItens: result })
                    }
                });
                this.getCliente()
            }
        });
    }

    renderId(){
        if(this.state.idObj != 0){
            return this.state.idObj
        } else {
            return ""
        }
    }

    getCliente(){
        if(this.state.objectData.id != 0){
            this.state.objectDAO.getClienteDaNota(this.state.objectData.id, (err, result)=>{
                if(err){
                    alert(err);
                } else {
                    this.state.objectData.cliente_nome = result.nome;
                    this.forceUpdate();
                }
            });
        }
    }

    listarProdutos(){
        return this.state.produtos.map((produto)=>{
            return (
                <option key={produto.id} value={produto.id}>{produto.nome}</option>
            )
        })
    }

    listarItens(){
        return this.state.pedidoItens.map((Item)=>{
            this.state.itemKey += 1;
            return (
                <tr key={this.state.itemKey}>
                    <td>{ Item.nome }</td>
                    <td>{Item.quantidade}</td>
                    <td>{ Item.valor }</td>
                </tr>
            )
        })
    }

    getSituacao(){
        if(this.state.objectData.cancelada == true){
            return "Cancelada"
        } else {
            return "Valida"
        }
    }

    render(){
        return(
            <div>
                <section className="content-header">
                    <h1>
                        Movimentos
                        <small>Consultar notas fiscais</small>
                    </h1>
                    <ol className="breadcrumb">
                    <li><a><i className="fa fa-dashboard"></i> Painel</a></li>
                    <li className="active">Movimentos</li>
                    </ol>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-default">
                                <div className="box-header">
                                    <div className="row">
                                        <div className="col-md-1">
                                            <h4><strong>Id:</strong>{ this.renderId() }</h4>
                                        </div>
                                        <button onClick={this.cancelarNF.bind(this)} type="button" className="btn btn-default btn-sm">
                                            Cancelar NF-e
                                        </button>
                                        <CrudNavegator crudComponent={this} idList={this.state.idList} idObj={this.state.idObj}/>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="form-group">
                                        <label htmlFor="nome">Valor: R$</label>{ this.state.objectData.valor }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nome">Numero documento:</label>{ this.state.objectData.numero_documento }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nome">Situação:</label>{ this.getSituacao() }
                                    </div>
                                    <div className="form-group">
                                        <label>Destinatario:</label>
                                        { this.state.objectData.cliente_nome }
                                    </div>
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th>Produto</th>
                                                <th style={{width: 60}}>Quantidade</th>
                                                <th style={{width: 20}}>Valor</th>
                                            </tr>
                                            { this.listarItens() }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="box-footer">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}