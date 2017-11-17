import React,{Component} from 'react';
import ObjectDAO from '../db/dao/Produto';
import CrudNavegator from '../component/CrudNavegator';

export default class Produtos extends Component {
    constructor(){
        super();
        this.state = {idList : [], 
            idObj: 0,  
            objectData: {id: 0, nome: "", valor_unitario: ""}, 
            objectDAO : new ObjectDAO(this),
            newObject: false};
    }

    componentWillMount(){
        this.getFirstId()
        this.updateIdList()
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
                    this.setState({idObj : 0, objectData: {id: 0, nome: "", valor_unitario: ""}});
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
            }
        });
    }

    newObjectSet(){
        this.setState({idObj : 0, objectData: {id: 0, nome: "", valor_unitario: ""}});
    }

    saveBtn(){
        if(this.state.objectData.id != 0){
            this.state.objectDAO.save(this.state.objectData, (err, result)=>{
                alert("Modificado com sucesso")
            });
        } else {
            this.state.objectDAO.insert(this.state.objectData, (err, result)=>{
                this.readObject(result.insertId);
                this.updateIdList()
                alert("Cadastro inserido com sucesso")
            });
        }
    }

    onChangeName(e){
        var obj = this.state.objectData;
        obj.nome = e.target.value;
        this.setState({objectData: obj})
    }

    onChangeValor(event){
        var obj = this.state.objectData;
        obj.valor_unitario = event.target.value;
        this.setState({objectData: obj})
    }

    renderId(){
        if(this.state.idObj != 0){
            return this.state.idObj
        } else {
            return ""
        }
    }

    render(){
        return(
            <div>
                <section className="content-header">
                    <h1>
                        Cadastro
                        <small>Produtos</small>
                    </h1>
                    <ol className="breadcrumb">
                    <li><a><i className="fa fa-dashboard"></i> Painel</a></li>
                    <li className="active">Produtos</li>
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
                                        <label htmlFor="nome">Nome do Produto:</label>
                                        <input type="text" 
                                            className="form-control" 
                                            id="nome" 
                                            placeholder="Digite o nome"
                                            value={this.state.objectData.nome}
                                            onChange={this.onChangeName.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nome">Valor Unitário:</label>
                                        <input type="text" value={this.state.objectData.valor_unitario} onChange={this.onChangeValor.bind(this)} className="form-control" id="valor" placeholder="Digite o valor"/>
                                    </div>
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