import React, { Component } from 'react';
import { Modal } from 'antd';
import { Col, Label, Button } from 'reactstrap';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { FaEdit } from 'react-icons/fa';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
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
      console.log(moveY);
      document
        .getElementById('tableBody')
        .animate(
          [
            { transform: 'translateY(0px)' },
            { transform: 'translateY(' + moveY + 'px)' }
          ],
          {
            duration: 80000,
            direction: 'alternate-reverse',
            iterations: Infinity
          }
        );
    }
  }

  handleEdit = id => {
    console.log('id', id);
  };

  render() {
    return (
      <div id="myBody" ref={this.state.heightBody}>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AvForm encType="multipart/form-data" className="form-horizintal">
            <AvGroup row>
              <Col md="auto">
                <Label for="nama_project">Nama Project</Label>
              </Col>
              <Col md="auto">
                <AvField
                  type="text"
                  id="nama_project"
                  name="nama_project"
                  onChange={this.handleChange}
                />
              </Col>
            </AvGroup>
            <AvGroup row>
              <Col md="auto">
                <Label for="task">task</Label>
              </Col>
              <Col md="auto">
                <AvField
                  type="text"
                  id="task"
                  name="task"
                  onChange={this.handleChange}
                />
              </Col>
            </AvGroup>

            <AvGroup row>
              <Col md="auto">
                <Label for="priority">Priority</Label>
              </Col>
              <Col md="auto">
                <AvField
                  type="select"
                  name="priority"
                  onChange={this.handleChange}
                >
                  <option value="">--Pilih Prioritas--</option>
                  <option value="h">High</option>
                  <option value="m">Medium</option>
                </AvField>
              </Col>
            </AvGroup>
            <AvGroup row>
              <Col md="auto">
                <Label for="pic">PIC</Label>
              </Col>
              <Col md="auto">
                <AvField
                  type="text"
                  id="pic"
                  name="pic"
                  onChange={this.handleChange}
                />
              </Col>
            </AvGroup>
            <AvGroup row>
              <Col md="auto">
                <Label for="deadline">DeadLine</Label>
              </Col>
              <Col>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChangeDate}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </Col>
            </AvGroup>
            <AvGroup row>
              <Col md="auto">
                <Label for="status_progress">Status Progress</Label>
              </Col>
              <Col md="auto">
                <AvField
                  type="select"
                  name="status_progress"
                  onChange={this.handleChange}
                >
                  <option value="">--Pilih Status Project--</option>
                  <option value="complete">Complete</option>
                  <option value="pending">Pending</option>
                  <option value="inprogress">In Progress</option>
                </AvField>
              </Col>
            </AvGroup>
          </AvForm>
        </Modal>
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
              <th style={{ textAlign: 'center', fontSize: '20px' }} />
            </tr>
          </thead>
          <tbody id="tableBody">
            {this.state.data.map(value => (
              <tr
              // className={
              //   value.status_progress === 'pending'
              //     ? 'pending'
              //     : value.status_progress === 'complete'
              //     ? 'complete'
              //     : value.status_progress === 'inprogress'
              //     ? 'inprogress'
              //     : ''
              // }
              >
                <td>{value.nama_project}</td>
                <td>{value.task}</td>
                <td>{value.priority === 'm' ? 'Medium' : 'High'}</td>
                <td>{value.pic}</td>
                <td>{convertDate(value.deadline)}</td>
                <td
                  className={
                    value.status_progress === 'pending' ? 'pending' : ''
                  }
                  style={{ fontWeight: 'bold' }}
                >
                  {value.status_progress.toUpperCase()}
                </td>
                <td>
                  <Button
                    color="success"
                    title="Edit"
                    onClick={this.handleEdit}
                  >
                    <FaEdit />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
