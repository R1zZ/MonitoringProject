import React, { Component } from 'react';

import Axios from 'axios';
import ButtonAdd from './views/ButtonAdd';
import { convertDate } from './config';
import './tables.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightBody: React.createRef(),
      heightTable: React.createRef(),
      data: []
    };
  }

  componentDidMount() {
    Axios({
      method: 'get',
      url: 'http://192.168.100.12:8000/monitorings/'
    }).then(response => {
      this.setState({
        data: response.data
      });
    });
  }

  componentDidUpdate() {
    var initBodyHeight = this.state.heightBody.current.offsetHeight;
    var initTableHeight = this.state.heightTable.current.offsetHeight;

    if (initTableHeight > initBodyHeight) {
      var moveY = initBodyHeight - initTableHeight;
      document
        .getElementById('tableBody')
        .animate(
          [
            { transform: 'translateY(0px)' },
            { transform: 'translateY(' + moveY + 'px)' }
          ],
          {
            duration: 7000,
            direction: 'alternate-reverse',
            iterations: Infinity
          }
        );
    }
  }

  render() {
    return (
      // <ButtonAdd />
      <div id="myBody" ref={this.state.heightBody}>
        <div style={{ position: 'sticky', top: '0', zIndex: '999' }}>
          <ButtonAdd />
        </div>

        <table ref={this.state.heightTable} id="myTable">
          <thead>
            <tr className="header">
              <th style={{ textAlign: 'center', fontSize: '20px' }}>
                Nama Project
              </th>
              <th style={{ textAlign: 'center', fontSize: '20px' }}>Task</th>
              <th style={{ textAlign: 'center', fontSize: '20px' }}>
                Priority
              </th>
              <th style={{ textAlign: 'center', fontSize: '20px' }}>PIC</th>
              <th style={{ textAlign: 'center', fontSize: '20px' }}>
                Deadline
              </th>
              <th style={{ textAlign: 'center', fontSize: '20px' }}>
                Status Project
              </th>
            </tr>
          </thead>
          <tbody id="tableBody">
            {this.state.data.map(value => (
              <tr>
                <td>{value.nama_project}</td>
                <td>{value.task}</td>
                <td>{value.priority === 'm' ? 'Medium' : 'Hight'}</td>
                <td>{value.pic}</td>
                <td>{convertDate(value.deadline)}</td>
                <td>{value.status_progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
