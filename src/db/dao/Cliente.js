import DAO from './DAO';

export default class Cliente extends DAO{
    constructor(component){
        super(component);
        this.table = 'cliente';
    }

    save(cliente, callback){
        console.log("objeto a ser gravado");
        console.log(cliente);
        var sql = 'update cliente set';
        sql += ' nome = \"' + cliente.nome;
        sql += '\", documento = \"' + cliente.documento;
        sql += '\", tipo = ' + cliente.tipo;
        sql += ' where id  = ' + cliente.id_cliente;
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

    insert(cliente, callback){
        console.log("objeto a ser gravado");
        console.log(cliente);
        var sql = 'insert into cliente (nome,documento,tipo) values (';
        sql += '\"' + cliente.nome;
        sql += '\",\"' + cliente.documento;
        sql += '\",' + cliente.tipo + ");";
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

}