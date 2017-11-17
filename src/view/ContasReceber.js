import React,{Component} from 'react';
import ObjectDAO from '../db/dao/ContasReceber';
import ClienteDAO from '../db/dao/Cliente';
import ContasFinanceirasDAO from '../db/dao/ContasFinanceiras';
import CrudNavegator from '../component/CrudNavegator';

export default class ContasReceber extends Component {
    constructor(){
        super();
        this.state = {idList : [], 
            idObj: 0,  
            objectData: {id: 0, valor: 0, quantidade_parcelas: 0, id_contas_financeiras: 0, id_cliente: 0, nome_cliente: "", id_pedido: null, vencimento: "2017-01-05"},
            contaReceberParcelas: [],
            objectDAO : new ObjectDAO(this),
            clienteDAO : new ClienteDAO(this),
            contasFinanceirasDAO : new ContasFinanceirasDAO(this),
            newObject: false,
            clientes: [],
            contasFinanceiras: [],
            itemKey: 0,
            dataVencimento: "00/0000",
            dataRecebimento: "00/00/0000",
            recebimento: false,
            id_recebimento: null,
            Parcela: {}
        };
    }

    componentWillMount(){
        this.getFirstId()
        this.updateIdList()
    }

    componentDidMount(){
        this.updateClientesList()
        this.updateContasFinanceirasList()
    }

    updateClientesList(){
        this.state.clienteDAO.getAll((err, result)=>{
            if(err){
                alert(err)
            } else {
                if(this.state.objectData.id_contas_financeiras == 0){
                    this.state.objectData.id_contas_financeiras = result[0].id;
                }
                this.setState({clientes: result}) 
            }
        })
    }


    updateContasFinanceirasList(){
        this.state.contasFinanceirasDAO.getAll((err, result)=>{
            if(err){
                alert(err)
            } else {
                if(this.state.objectData.id_cliente == 0){
                    this.state.objectData.id_cliente = result[0].id;
                }
                this.setState({contasFinanceiras: result}) 
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
                    this.setState({idObj : 0, objectData: {id: 0, valor: 0, quantidade_parcelas: 0, id_contas_financeiras: 0, id_cliente: 0, nome_cliente: "", id_pedido: null, vencimento: "2017-01-05"}, 
                    contaReceberParcelas: []});
                    this.parseMesVencimento();
                    this.updateClientesList()
                    this.updateContasFinanceirasList()
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
        } else {
            alert("Revertendo alterações")
            this.readObject(this.state.objectData.id);
        }
    }

    readObject(id){
        this.state.contaReceberParcelas = [];
        this.state.objectDAO.getObject( id , (err, result)=>{
            if(err){
                alert(err);
            } else {
                this.setState({ 
                    objectData: result,
                    recebimento: false,
                    id_recebimento: null
                    })
                this.state.objectData.vencimento = this.state.objectData.vencimento.toISOString();
                this.setState({idObj : result.id});
                this.state.objectDAO.getParcelas( id , (err, result)=>{
                    if(err){
                        alert(err);
                    } else {
                        result.forEach((result)=>{
                            result.vencimento = result.vencimento.toISOString().substring(0,10);
                        })
                        this.setState({ contaReceberParcelas: result })
                    }
                });
                this.getCliente();
            }
            this.parseMesVencimento();
        });
    }

    getCliente(){
        this.state.clientes.forEach((cliente)=>{
            if(cliente.id == this.state.objectData.id_cliente){
                this.state.objectData.nome_cliente = cliente.nome;
                this.forceUpdate();
            }
        })
    }

    

    newObjectSet(){
        this.setState({idObj : 0, 
            objectData: {
                id: 0, 
                valor: 0, quantidade_parcelas: 0, 
                id_contas_financeiras: 0, 
                id_cliente: 0, 
                nome_cliente: "", 
                id_pedido: null, 
                vencimento: "2017-01-05"
            }, 
            contaReceberParcelas: [], 
            recebimento: false,
            id_recebimento: null
        });
        this.parseMesVencimento();
        this.updateClientesList()
        this.updateContasFinanceirasList()
    }

    saveBtn(){
        if(this.state.objectData.id != 0){
            this.state.objectDAO.save(this.state.objectData, (err, result)=>{
                this.state.contaReceberParcelas.forEach(function(Item) {
                    this.state.objectDAO.deleteParcelas(this.state.objectData.id, (err, result)=>{
                        if(err){
                            console.log("Erro inserindo itens de novo cadastro")
                            alert(err);
                        }
                    })
                }, this);
                this.state.contaReceberParcelas.forEach(function(Item) {
                    Item.id_contas_receber = this.state.objectData.id;
                    this.state.objectDAO.insertParcela(Item, (err, result)=>{
                        if(err){
                            console.log("erro incluindo parcelas")
                            alert(err);
                        }
                    })
                }, this);
                this.readObject(this.state.objectData.id);
            });
        } else {
            this.state.objectDAO.insert(this.state.objectData, (err, result)=>{
                this.state.contaReceberParcelas.forEach(function(Item) {
                    Item.id_contas_receber = result.insertId;
                    this.state.objectDAO.insertParcela(Item, (err, result)=>{
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

    onChangeCliente(event){
        var obj = this.state.objectData;
        obj.id_cliente = event.target.value;
        this.setState({objectData: obj})
    }

    onChangeContaFinanceira(event){
        var obj = this.state.objectData;
        obj.id_contas_financeiras = event.target.value;
        this.setState({objectData: obj})
    }

    onChangeValor(event){
        var obj = this.state.objectData;
        obj.valor = event.target.value;
        this.setState({objectData: obj})
    }


    renderId(){
        if(this.state.idObj != 0){
            return this.state.idObj
        } else {
            return ""
        }
    }

    listarCliente(){
        return this.state.clientes.map((cliente)=>{
            return (
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
            )
        })
    }

    listarContasFinanceiras(){
        return this.state.contasFinanceiras.map((conta)=>{
            return (
                <option key={conta.id} value={conta.id}>{conta.descricao}</option>
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

    gerarParcelas(){
        var quantidade = this.state.objectData.quantidade_parcelas;
        var valor =  this.state.objectData.valor / quantidade;
        var vencimento = new Date(this.state.objectData.vencimento);
        this.state.contaReceberParcelas = [];
        var contaReceberParcelas = this.state.contaReceberParcelas;
        for(var it = 1; it <= quantidade; it++){
            vencimento.setMonth(vencimento.getMonth() + 1);
            var vencimento_parcela = vencimento.getFullYear() + "-";
            if(vencimento.getMonth() == 0 ){
                vencimento_parcela += "12";
            } else {
                vencimento_parcela += vencimento.getMonth(); 
            }
            vencimento_parcela += "-05";
            contaReceberParcelas.push({id: it, numero_parcela: it, valor, valor_recebido: 0, vencimento: vencimento_parcela, juros: 0, id_contas_receber: 0, pago: false});            
        }
        this.forceUpdate();
    }

    onChangeQuantidadeParcelas(e){
        if(e.target.value > 200){
            alert("Numero de parcelas excede o limite");
            return;
        }
        if(this.state.objectData.valor > 0){
            var quantidade = e.target.value;
            this.state.objectData.quantidade_parcelas = quantidade;
            this.gerarParcelas();
        } else {
            alert("Informe um valor maior que 0")
        }
    }

    listarParcelas(){

        return this.state.contaReceberParcelas.map((Item)=>{
            this.state.itemKey += 1;

            const estornar = () =>{
                Item.pago = false;
                Item.data_recebimento = null
                this.state.objectDAO.saveParcela(Item, (err, result) =>{
                    if(err){
                        alert(err);
                    } else {
                        alert("Parcela Estornada com sucesso");
                        this.readObject(this.state.idObj);
                    }
                })
            }

            const getTextoRecebimento = () =>{
                if(Item.pago == true){
                    return (
                        <i onClick={()=>{
                            estornar()
                        }} className="fa fa-edit cursor-pointer">Estornar</i>
                    )
                } else {
                    return (
                        <i onClick={()=>{
                            this.state.Parcela = JSON.parse(JSON.stringify(Item));
                            this.setState({id_recebimento: Item.id});
                        }} className="fa fa-edit cursor-pointer">Receber</i>
                    )
                }
            }

            const getDataRecebimento = () =>{
                if(Item.pago == true && Item.data_recebimento){
                    return Item.data_recebimento.toISOString().substring(0,10);
                } else {
                    return "Não recebido"
                }
            }

            return (
                <tr key={this.state.itemKey}>
                    <td>
                        { Item.numero_parcela }
                    </td>
                    <td>
                        { Item.valor }
                    </td>
                    <td>
                        { Item.valor_recebido }
                    </td>
                    <td>
                        { Item.juros }
                    </td>
                    <td>
                        { Item.vencimento }
                    </td>
                    <td>
                        { getTextoRecebimento() }
                    </td>
                    <td>
                        { getDataRecebimento() }
                    </td>
                </tr>
            )
        })
    }

    getOrigem(){
        if(this.state.objectData.id_pedido == 0 || this.state.objectData.id_pedido == null){
            return "Cadastro"
        } else {
            return "Pedidos";
        }
    }

    getValorInput(){
        if(this.state.objectData.id_pedido == 0 || this.state.objectData.id_pedido == null){
            return (
                <div className="form-group">
                    <label htmlFor="nome">Valor: R$</label>
                    <input type="text" 
                        className="form-control" 
                        id="nome" 
                        placeholder="Digite o valor"
                        value={this.state.objectData.valor}
                        onChange={this.onChangeValor.bind(this)}
                    />
                </div>
            )
        } else {
            return (
                <div className="form-group">
                    <label>Valor: R$</label> { this.state.objectData.valor }
                </div>
            )
        }
    }

    getClienteInput(){
        if(this.state.objectData.id_pedido == 0 || this.state.objectData.id_pedido == null){
            return (
                <div className="form-group">
                    <label>Cliente</label>
                    <select value={this.state.objectData.id_cliente} onChange={this.onChangeCliente.bind(this)} className="form-control select2 select2-hidden-accessible" style={{ width: "100%" }} tabIndex="-1" aria-hidden="true">
                        { this.listarCliente() }
                    </select>
                </div>
            )
        } else {
            return (
                <div className="form-group">
                    <label>Cliente: </label> { this.state.objectData.nome_cliente }
                </div>
            )
        }
    }

    onBlurVencimento(){
        var data_recebida = this.state.dataVencimento;
        if((data_recebida.match(/[0][1-9][/][1-2][0-9][0-9][0-9]/g) != null || data_recebida.match(/[1][0-2][/][1-2][0-9][0-9][0-9]/g) != null ) && data_recebida.length == 7){
            var parse = data_recebida.substring(3,7) + "-" + data_recebida.substring(0,2) + "-05";
            this.state.objectData.vencimento = parse;
            this.gerarParcelas();
        } else {
            alert("Digite uma data no formato mes/ano");
            this.parseMesVencimento();
        }
    }

    onChangeMesVencimento(e, comp){
        comp.setState({dataVencimento: e.target.value})
    }

    parseMesVencimento(){
        var ano = this.state.objectData.vencimento.substring(0,4);
        var mes = this.state.objectData.vencimento.substring(5,7);
        var data = mes + "/" + ano;
        this.setState({dataVencimento: data});
    }

    parseDataVencimento(Isodata){
        var ano = Isodata.substring(0,4);
        var mes = Isodata.substring(5,7);
        var dia = Isodata.substring(8,10);
        return dia + "/" + mes + "/" + ano;
    }

    getRecebimentoView(){
        var comp = this;
        const calcularValoraReceber = () =>{
            var dataVencimento = new Date(Parcela.vencimento);
            var dataRecebimento = new Date(Parcela.data_recebimento);
            if(dataVencimento.getTime() < dataRecebimento.getTime()){
                var diferenca_em_dias = ( dataRecebimento - dataVencimento ) / 86400000;
                Parcela.valor_recebido = ( diferenca_em_dias * ( 0.0005 * Parcela.valor) ) + Parcela.valor;
                Parcela.juros = Parcela.valor_recebido - Parcela.valor;
            } else {
                Parcela.valor_recebido = Parcela.valor;
                Parcela.juros = 0;
            }
        }

        if(this.state.id_recebimento != null){
            var Parcela = this.state.Parcela;
            if(Parcela.data_recebimento == null){
                Parcela.data_recebimento = "2017-01-01";
                this.state.dataRecebimento = this.parseDataVencimento(Parcela.data_recebimento);
                calcularValoraReceber();
                this.forceUpdate();
            }
            const onBlurDataRecebimento = ()=>{
                var data_recebida = this.state.dataRecebimento;
                if((data_recebida.match(/[0-3][0-9][/][0][1-9][/][1-2][0-9][0-9][0-9]/g) != null || data_recebida.match(/[0-3][0-9][/][1][0-2][/][1-2][0-9][0-9][0-9]/g) != null ) && data_recebida.length == 10){
                    Parcela.data_recebimento = data_recebida.substring(6,10) + "-" + data_recebida.substring(3,5) + "-" + data_recebida.substring(0,2);
                } else {
                    alert("Digite uma data no formato mes/ano");
                    this.state.dataRecebimento = this.parseDataVencimento(Parcela.data_recebimento);
                    this.forceUpdate();
                }
                calcularValoraReceber();
                this.forceUpdate();
            }
            const receberParcela= () =>{
                Parcela.pago = true;
                this.state.objectDAO.saveParcela(Parcela, (err, result) =>{
                    if(err){
                        alert(err);
                    } else {
                        alert("Parcela Recebida com sucesso");
                        this.readObject(this.state.idObj);
                        this.setState({id_recebimento: null});
                    }
                })
            } 
            return (
                <div className="box-body">
                    <h3> Recebimento de parcelas </h3>
                    <div className="form-group">
                        <label>Número da parcela:</label> { Parcela.numero_parcela }
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-4">
                            <div className="form-group">
                                <label>Valor:</label> { Parcela.valor }
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-4">
                            <div className="form-group">
                                <label>Valor a receber:</label> { Parcela.valor_recebido }
                            </div>
                            <small>Juros simples de 0,05% ao dia</small>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-4">
                            <div className="form-group">
                                <label>Data Vencimento:</label> { Parcela.vencimento }
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                    <label htmlFor="nome">Data do recebimento</label>
                        <input type="text" 
                            className="form-control" 
                            id="nome" 
                            placeholder="Digite a data do recebimento"
                            onBlur={onBlurDataRecebimento}
                            onChange={(e)=>{ comp.setState({dataRecebimento: e.target.value}) }}
                            value={this.state.dataRecebimento}
                        />
                    </div>
                    <button 
                        onClick={()=>{
                            this.setState({id_recebimento: null});
                        }} 
                        type="submit" style={{marginRight : 10}} className="btn btn-default">
                        Cancelar
                    </button>
                    <button 
                        onClick={()=>{
                            receberParcela()
                        }} 
                        type="submit" style={{marginRight : 10}} className="btn btn-default">
                        Receber Pagamento
                    </button>                  
                </div>
            )
        } else {
            return null
        }
    }
    
    render(){
        return(
            <div>
                <section className="content-header">
                    <h1>
                        Movimentos
                        <small>Contas a Receber</small>
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
                                        <CrudNavegator crudComponent={this} idList={this.state.idList} idObj={this.state.idObj}/>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="form-group">
                                        <label>Origem:</label> { this.getOrigem() }
                                    </div>
                                    { this.getValorInput() }
                                    { this.getClienteInput() }
                                    <div className="form-group">
                                    <label>Conta para recebimento</label>
                                        <select value={this.state.objectData.id_contas_financeiras} onChange={this.onChangeContaFinanceira.bind(this)} className="form-control select2 select2-hidden-accessible" style={{ width: "100%" }} tabIndex="-1" aria-hidden="true">
                                            { this.listarContasFinanceiras() }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nome">Quantidade de parcelas</label>
                                        <input type="text" 
                                            className="form-control" 
                                            id="nome" 
                                            placeholder="Digite o valor"
                                            value={this.state.objectData.quantidade_parcelas}
                                            onChange={this.onChangeQuantidadeParcelas.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nome">Mês do vencimento</label>
                                        <input type="text" 
                                            className="form-control" 
                                            id="nome" 
                                            placeholder="Digite o valor"
                                            onChange={(e)=>{this.onChangeMesVencimento(e, this)}}
                                            onBlur={this.onBlurVencimento.bind(this)}
                                            value={this.state.dataVencimento}
                                        />
                                    </div>
                                    { this.getRecebimentoView() }
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th style={{width: 60}}>Numero</th>
                                                <th style={{width: 20}}>Valor</th>
                                                <th style={{width: 20}}>Valor Pago</th>
                                                <th style={{width: 20}}>Juros</th>
                                                <th style={{width: 20}}>Vencimento</th>
                                                <th style={{width: 2}}>Recebimento</th>
                                                <th style={{width: 30}}>Data do recebimento</th>
                                            </tr>
                                            { this.listarParcelas() }
                                        </tbody>
                                    </table>
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