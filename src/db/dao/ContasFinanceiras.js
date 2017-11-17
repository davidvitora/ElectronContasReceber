import DAO from './DAO';

export default class ContasFinanceiras extends DAO{
    constructor(component){
        super(component);
        this.table = 'contas_financeiras';
    }

    save(item, callback){
        console.log("objeto a ser gravado");
        console.log(item);
        var sql = 'update ' +  this.table + ' set';
        sql += ' descricao = \"' + item.descricao;
        sql += '\", saldoInicial = ' + item.saldoInicial;
        sql += ', saldo = ' + item.saldoInicial;
        sql += ' where id = ' + item.id;
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

    insert(item, callback){
        console.log("objeto a ser inserido");
        console.log(item);
        var sql = 'insert into ' + this.table + ' (descricao,saldoInicial,saldo) values (';
        sql += '\"' + item.descricao;
        sql += '\",' + item.saldoInicial;
        sql += ',' + item.saldoInicial + ");";
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

}