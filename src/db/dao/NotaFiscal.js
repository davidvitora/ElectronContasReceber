import DAO from './DAO';

export default class Pedido extends DAO{
    constructor(component){
        super(component);
        this.table = 'nota_fiscal';
    }

    save(obj, callback){
        console.log("objeto a ser gravado");
        console.log(obj);
        var sql = 'update ' + this.table + ' set';
        sql += ' valor = ' + obj.valor;
        sql += ', numero_documento = \' ' + obj.numero_documento + " \' ";
        sql += ', cancelada = ' + obj.cancelada;
        sql += ', id_cliente = ' + obj.id_cliente;
        sql += ' where id  = ' + obj.id;
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

    getClienteDaNota(id, callback){
        this.conn.query("select * from nota_fiscal, cliente where nota_fiscal.id_cliente = cliente.id and nota_fiscal.id  = " + id , (err, result)=>{
            if(err){          
                callback(err, null);
            } else {
                callback(null, result[0]);
            }
        })
    }

    insert(obj, callback){
        console.log("objeto a ser inserido");
        console.log(obj);
        var sql = 'insert into ' + this.table + ' (valor, numero_documento, id_cliente, id_pedido) values (';
        sql += obj.valor;
        sql += ',\'' + obj.numero_documento + " \' ";
        sql += ', ' + obj.id_cliente;
        sql += ', ' + obj.id_pedido + ");";
        console.log("comando: " + sql);
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

    verificarSeTemNota(id, callback){
        console.log(
        this.conn.query("select id from nota_fiscal where cancelada = false and id_pedido = " + id , (err, result)=>{
            if(err){
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
        );
    }

    getItens(id, callback){
        console.log(
        this.conn.query("select * from nota_item, produto where nota_item.id_produto = produto.id and nota_item.id_nota_fiscal = " + id , (err, result)=>{
            if(err){
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
        );
    }


    insertItem(Item, callback){
        console.log("Item de nota a ser inserido");
        console.log(Item);
        var sql = 'insert into nota_item (valor,quantidade,id_produto,id_nota_fiscal) values (';
        sql += Item.valor;
        sql += ', ' + Item.quantidade;
        sql += ', ' + Item.id_produto;
        sql += ', ' + Item.id_nota_fiscal + ");";
        this.conn.query(sql, (err, result)=>{
            if(err){
                alert(err);
            } else {
                callback(null, result);
            }
        });
    }

}