import React, { Component } from 'react';

class Result extends Component {

    render(){
        var list = [];

        function listtorender(item){

            var imgsrc;

            try {
                imgsrc = <img className="thumb" src={item.images[2].url} alt="" />;
            }
            catch (e) {
                imgsrc = '';
            }

            list.push(<li key={item.id}> {imgsrc} {item.name} <em>({item.type})</em> </li>)
        }

        this.props.data.forEach((data) => {

            if(this.props.filter){
                console.log('filer change');

                let rows = data.items.filter(function(item){
                    return item.type === this.props.filter;
                },this);

                rows.forEach(function(item){
                    listtorender(item);
                });

            } else {
                data.items.forEach((item) =>{
                    listtorender(item);
                });
            }

        });


        return(
            <div className="container">
                <div className="col-xs-12 col-sm-8 col-sm-offset-2">
                    <ul className="results">
                        {list}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Result