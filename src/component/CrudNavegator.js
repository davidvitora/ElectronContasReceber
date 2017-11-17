import React,{Component} from 'react';

export default class CrudNavegator extends Component {

    componentWillMount(){

    }

    onClickLeft(){
        if(this.props.idObj != 0 && this.props.idObj != undefined){
            var index = this.props.idList.findIndex((item)=>{
                return item.id == this.props.idObj;
            });
            if(index > 0){
                this.props.crudComponent.readObject(this.props.idList[index - 1].id)
            }
        }
    }

    onClickRight(){
        if(this.props.idObj != 0 && this.props.idObj != undefined){
            var index = this.props.idList.findIndex((item)=>{
                return item.id == this.props.idObj;
            });
            if(index + 1 < this.props.idList.length){
                this.props.crudComponent.readObject(this.props.idList[index + 1].id)
            }
        } 
    }

    render(){
        return(
            <div className="col-md-6 pull-right">
                <ul style={{ margin: 0 }} className="pagination">
                    <li className="cursor-pointer paginate_button previous" id="example2_previous">
                        <a onClick={()=>{this.onClickLeft()}} aria-controls="example2" data-dt-idx="0" tabIndex="0">Anterior</a>
                    </li>
                    <li className="cursor-pointer paginate_button next" id="example2_next">
                        <a onClick={()=>{ this.onClickRight() }} aria-controls="example2" data-dt-idx="7" tabIndex="0">Próximo</a>
                    </li>
                </ul>
            </div>
        );
    }
}