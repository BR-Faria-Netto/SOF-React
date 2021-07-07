import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import api from "../../../services/api";

export default class Edit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products4: null,
            editingRows: {}
        };
        
        this.originalRows2 = {};

        this.onRowEditInit2 = this.onRowEditInit2.bind(this);
        this.onRowEditCancel2 = this.onRowEditCancel2.bind(this);
        this.onRowEditChange2 = this.onRowEditChange2.bind(this);
    }

    componentDidMount() {
        api.get('meta/edit/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    products4: response.estrategias
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onRowEditInit2(event) {
        this.originalRows2[event.index] = { ...this.state.products4[event.index] };
    }

    onRowEditCancel2(event) {
        let products = [...this.state.products4];
        products[event.index] = this.originalRows2[event.index];
        delete this.originalRows2[event.index];

        this.setState({ products4: products });
    }

    onRowEditChange2(event) {
        this.setState({ editingRows: event.data });
    }

    setActiveRowIndex(index) {
        let products = [...this.state.products4];
        this.originalRows2[index] = { ...products[index] };

        alert(products[index].codigo);

        let editingRows = { ...this.state.editingRows, ...{ [`${products[index].id}`]: true } };

        this.setState({ editingRows });
    }

    onEditorValueChange(productKey, props, value) {
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        this.setState({ [`${productKey}`]: updatedProducts });
    }

    inputTextEditor(productKey, props, field) {
        return <InputText type="text" value={props.rowData[field]} onChange={(e) => this.onEditorValueChange(productKey, props, e.target.value)} />;
    }

    codeEditor(productKey, props) {
        return this.inputTextEditor(productKey, props, 'codigo');
    }

    nameEditor(productKey, props) {
        return this.inputTextEditor(productKey, props, 'descricao');
    }

    render() {
        return (
            <div className="datatable-editing-demo">
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    <h5>Programmatic</h5>
                    <div className="p-pt-2 p-pb-4">
                        <Button onClick={() => this.setActiveRowIndex(0)} className="p-button-text" label="Activate 1st" />
                        <Button onClick={() => this.setActiveRowIndex(2)} className="p-button-text" label="Activate 3rd" />
                        <Button onClick={() => this.setActiveRowIndex(3)} className="p-button-text" label="Activate 5th" />
                    </div>

                    <DataTable value={this.state.products4} editMode="row" dataKey="id" editingRows={this.state.editingRows} onRowEditChange={this.onRowEditChange2} onRowEditInit={this.onRowEditInit2} onRowEditCancel={this.onRowEditCancel2}>
                        <Column field="codigo" header="Code" editor={(props) => this.codeEditor('products4', props)}></Column>
                        <Column field="descricao" header="Name" editor={(props) => this.nameEditor('products4', props)}></Column>
                        <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    </DataTable>
                </div>
            </div>
        );
    }
}

