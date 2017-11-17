import DAO from './DAO';

export default class Produto extends DAO{
    constructor(component){
        super(component);
        this.table = 'produto';
    }

    save(item, callback){
        console.log("objeto a ser gravado");
        console.log(item);
        var sql = 'update produto set';
        sql += ' nome = \"' + item.nome;
        sql += '\", valor_unitario = ' + item.valor_unitario;
        sql += ' where id  = ' + item.id;
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

    insert(item, callback){
        console.log("objeto a ser gravado");
        console.log(item);
        var sql = 'insert into produto (nome,valor_unitario) values (';
        sql += '\"' + item.nome;
        sql += '\",' + item.valor_unitario + ");";
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

}