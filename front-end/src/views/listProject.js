import React, { Component } from 'react';
import { Table } from 'antd';
import axios from 'axios';

class listProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            payload:[]
        }
    }

    componentDidMount(){
        axios.get('192.168.100.12:8000/monitorings').then(response=>{
            console.log(response)
        })
    }
    render() {
        return (
            <div>
                list
            </div>
        );
    }
}

export default listProject;