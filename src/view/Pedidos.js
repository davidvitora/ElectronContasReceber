import React,{Component} from 'react';
import ObjectDAO from '../db/dao/Pedido';
import ClienteDAO from '../db/dao/Cliente';
import ProdutoDAO from '../db/dao/Produto';
import NotaFiscalDAO from '../db/dao/NotaFiscal';
import CrudNavegator from '../component/CrudNavegator';

export default class Pedidos extends Component {
    constructor(){
        super();
        this.state = {idList : [], 
            idObj: 0,  
            objectData: {id: 0, valor: 0, id_cliente: 0},
            pedidoItens: [],
            pedidoItensDelete: [],
            objectDAO : new ObjectDAO(this),
            notaFiscalDAO : new NotaFiscalDAO(this),
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

    calcular(){
        this.state.objectData.valor = 0;
        this.state.pedidoItens.forEach((item)=>{
            this.state.objectData.valor += item.valor;
        }, this)
        this.forceUpdate();
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
                    alert("Cadastro vazio, entrando no modo de inclusão")
                    this.setState({idObj : 0, objectData: {id: 0, valor: 0, id_cliente: ""}, pedidoItens: []});
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

    deleteObject(){
        if(this.state.objectData.id != 0){
            this.state.objectDAO.deleteObject( this.state.objectData.id , (err, result)=>{
                if(err){
                    alert(err);
                } else {
                    this.getFirstId()
                    this.updateIdList()
                }
            });
        }else{
            alert("Não é possivel excluir o cadastro que ainda não foi salvo")
        }
    }

    cancelar(){
        if(this.state.idObj == 0){
            alert("Cancelada inclusão de cadastro")
            this.getFirstId()
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
            }
        });
    }

    newObjectSet(){
        this.setState({idObj : 0, objectData: {id: 0, valor: 0, id_cliente: 0}, pedidoItens: []});
        this.updateClientesList();
    }

    saveBtn(){
        this.calcular();
        if(this.state.objectData.id != 0){
            this.state.objectDAO.save(this.state.objectData, (err, result)=>{
                this.state.pedidoItens.forEach(function(Item) {
                    if(Item.id != 0){
                        this.state.objectDAO.saveItem(Item, (err, result)=>{
                            if(err){
                                console.log("erro salvando itens existentes")
                                alert(err);
                            }
                        })
                    } else {
                        Item.id_pedido = this.state.objectData.id;
                        this.state.objectDAO.insertItem(Item, (err, result)=>{
                            if(err){
                                console.log("erro incluindo itens de pedido ja existente")
                                alert(err);
                            }
                        })
                    }
                }, this);
                this.state.pedidoItensDelete.forEach(function(Item) {
                    this.state.objectDAO.deleteItem(Item.id, (err, result)=>{
                        if(err){
                            console.log("erro deletando itens")
                            alert(err);
                        }
                    })
                }, this);
                this.state.pedidoItensDelete = []
                this.readObject(this.state.objectData.id);
            });
        } else {
            this.state.objectDAO.insert(this.state.objectData, (err, result)=>{
                this.state.pedidoItens.forEach(function(Item) {
                    Item.id_pedido  = result.insertId;
                    this.state.objectDAO.insertItem(Item, (err, result)=>{
                        if(err){
                            console.log("Erro inserindo itens de novo cadastro")
                            alert(err);
                        }
                    })
                }, this);
                this.readObject(result.insertId);
                this.updateIdList()
                alert("Cadastro inserido com sucesso")
            });
        }
    }

    gerarNF(){
        if(this.state.objectData.id != 0){
            var objetoNota =  JSON.parse(JSON.stringify(this.state.objectData));
            objetoNota.numero_documento = Math.floor(Math.random() * (9999999 - 100000)) + 100000;
            objetoNota.id_pedido = this.state.objectData.id

            this.state.notaFiscalDAO.verificarSeTemNota(this.state.objectData.id, (err, result)=>{
                if(result[0] == undefined){
                    this.state.notaFiscalDAO.insert(objetoNota, (err, result)=>{
                        console.log("result da insersção de nota");
                        console.log(result);
                        this.state.pedidoItens.forEach(function(Item) {
                            Item.id_nota_fiscal  = result.insertId;
                            this.state.notaFiscalDAO.insertItem(Item, (err, result)=>{
                                if(err){
                                    console.log("Erro inserindo itens de nota")
                                    alert(err);
                                }
                            })
                        }, this);
                        alert("Nota fiscal gerada com sucesso")
                    });
                } else {
                    alert("Nota fiscal Valida já está gerada para este pedido")
                }
            });
        } else {
            alert("Não é possivel gerar nota fiscal de um pedido que não foi salvo")
        }
    }

    onChangeCliente(event){
        var obj = this.state.objectData;
        obj.id_cliente = event.target.value;
        this.setState({objectData: obj})
    }


    renderId(){
        if(this.state.idObj != 0){
            return this.state.idObj
        } else {
            return ""
        }
    }

    listartCliente(){
        return this.state.clientes.map((cliente)=>{
            return (
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
            )
        })
    }

    listarProdutos(){
        return this.state.produtos.map((produto)=>{
            return (
                <option key={produto.id} value={produto.id}>{produto.nome}</option>
            )
        })
    }

    calcularValorItem(Item){
        var index = this.state.produtos.findIndex((produto)=>{
            return produto.id == Item.id_produto 
        })
        var produto = this.state.produtos[index];
        Item.valor = Item.quantidade * produto.valor_unitario;
        this.calcular();
    }

    onChangeProduto(e, Item, comp){
        Item.id_produto = e.target.value;
        this.calcularValorItem(Item);
        comp.forceUpdate();
    }

    onChangeQuantidade(e, Item, comp){
        var pedidoItens = this.state.pedidoItens;
        var index = pedidoItens.indexOf(Item);
        Item.quantidade = e.target.value;
        this.calcularValorItem(Item);
        comp.forceUpdate();
    }

    listarItens(){
        return this.state.pedidoItens.map((Item)=>{
            this.state.itemKey += 1;
            return (
                <tr key={this.state.itemKey}>
                    <td>
                        <div className="form-group">
                            <select value={Item.id_produto} onChange={(e)=>{this.onChangeProduto(e, Item, this)}} className="form-control select2 select2-hidden-accessible" style={{ width: "100%" }} tabIndex="-1" aria-hidden="true">
                                { this.listarProdutos() }
                            </select>
                        </div>
                    </td>
                    <td>
                        <input type="text" 
                            className="form-control" 
                            id="valor" 
                            placeholder="Informe a quantidade de itens"
                            value={Item.quantidade}
                            onChange={(e)=>{this.onChangeQuantidade(e, Item, this)}}
                        />
                    </td>
                    <td>
                        { Item.valor }
                    </td>
                    <td>
                        <button onClick={()=>{this.excluirItem(Item, this)}} type="button" className="btn btn-default btn-sm">
                            <i className="fa fa-minus"></i>
                        </button>
                    </td> 
                </tr>
            )
        })
    }

    adicionarItem(){
        var pedidoItens = this.state.pedidoItens;
        pedidoItens.push({id: 0, id_produto: this.state.produtos[0].id , id_pedido: 0, quantidade: 0, valor: 0});
        this.setState({pedidoItens: pedidoItens});
    }

    excluirItem(Item, comp){
        var pedidoItensDelete = this.state.pedidoItensDelete;
        var pedidoItens = this.state.pedidoItens;
        var cp = JSON.parse(JSON.stringify(Item));
        pedidoItensDelete.push(cp);
        var index = pedidoItens.indexOf(Item);
        console.log(index);
        delete pedidoItens[index];
        this.setState({pedidoItensDelete: pedidoItensDelete });
        comp.forceUpdate()
        console.log("itens a excluir");
        console.log(this.state.pedidoItensDelete);
    }

    render(){
        return(
            <div>
                <section className="content-header">
                    <h1>
                        Cadastro
                        <small>Pedidos</small>
                    </h1>
                    <ol className="breadcrumb">
                    <li><a><i className="fa fa-dashboard"></i> Painel</a></li>
                    <li className="active">Cadastros</li>
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
                                        <button onClick={this.gerarNF.bind(this)} type="button" className="btn btn-default btn-sm">
                                            Gerar nota Fiscal
                                        </button>
                                        <div className="col-md-3 pull-right">
                                            <CrudNavegator crudComponent={this} idList={this.state.idList} idObj={this.state.idObj}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="form-group">
                                        <label htmlFor="nome">Valor: R$ </label>{ this.state.objectData.valor }
                                    </div>
                                    <div className="form-group">
                                        <label>Tipo</label>
                                        <select value={this.state.objectData.id_cliente} onChange={this.onChangeCliente.bind(this)} className="form-control select2 select2-hidden-accessible" style={{ width: "100%" }} tabIndex="-1" aria-hidden="true">
                                            { this.listartCliente() }
                                        </select>
                                    </div>
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th>Produto</th>
                                                <th style={{width: 60}}>Quantidade</th>
                                                <th style={{width: 20}}>Valor</th>
                                                <th style={{width: 20}}>Excluir</th>
                                            </tr>
                                            { this.listarItens() }
                                        </tbody>
                                    </table>
                                    <button onClick={this.adicionarItem.bind(this)} type="button" className="btn btn-default btn-sm">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                                <div className="box-footer">
                                    <button onClick={this.cancelar.bind(this)} type="submit" style={{marginRight : 10}} className="btn btn-default">Cancelar</button>                                
                                    <button onClick={this.newObjectSet.bind(this)} type="submit" style={{marginRight : 10}} className="btn btn-default">Novo</button>
                                    <button onClick={this.saveBtn.bind(this)} type="submit" style={{marginRight : 10}} className="btn btn-default">Salvar</button>
                                    <button onClick={this.deleteObject.bind(this)} type="submit" className="btn btn-default">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}