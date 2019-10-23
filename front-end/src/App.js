import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Modal, Button } from 'antd';
import { Row, Col, Label } from 'reactstrap';
import reqwest from 'reqwest';
import ReactTable from 'react-table';
import DatePicker from 'react-datepicker';
import Axios from 'axios';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import './App.css';
import 'antd/dist/antd.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';

class App extends Component {
  state = {
    data: [],
    // pagination: {},
    loading: false,
    visible: false,
    time: '',
    startDate: new Date()
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = event => {
    event.preventDefault();

    var formData = new FormData();
    var asiaDate = new Date(this.state.startDate).toISOString();

    console.log(asiaDate);

    formData.append('nama_project', this.state.nama_project);
    formData.append('task', this.state.task);
    formData.append('priority', this.state.priority);
    formData.append('pic', this.state.pic);
    formData.append('deadline', asiaDate);
    formData.append('status_progress', this.state.status_progress);
    Axios({
      method: 'post',
      url: 'http://192.168.100.12:8000/monitorings/',
      data: formData
    }).then(response => {
      if (response.status === 201) {
        this.setState({
          visible: false
        });
        // this.fetch();
      }
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeDate = date => {
    this.setState({
      startDate: date
    });
  };

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

  // handleTableChange = (pagination, filters, sorter) => {
  //   // const pager = { ...this.state.pagination };
  //   // pager.current = pagination.current;
  //   // this.setState({
  //   //   pagination: pager,
  //   // });
  //   this.fetch({
  //     // results: pagination.pageSize,
  //     // page: pagination.current,
  //     sortField: sorter.field,
  //     sortOrder: sorter.order,
  //     ...filters
  //   });
  // };

  // fetch = (params = {}) => {
  //   this.setState({ loading: true });
  //   reqwest({
  //     url: 'http://192.168.100.12:8000/monitorings/',
  //     method: 'get',
  //     data: {
  //       // results: 10,
  //       ...params
  //     },
  //     type: 'json'
  //   }).then(data => {
  //     console.log('params:', data);
  //     // const pagination = { ...this.state.pagination };
  //     // Read total count from server
  //     // pagination.total = data.totalCount;
  //     // pagination.total = 200;
  //     this.setState({
  //       loading: false,
  //       data: data
  //       // pagination,
  //     });
  //   });
  // };

  render() {
    // const { projects, project } = this.state
    const columns = [
      {
        id: 'nama_project',
        Header: 'Nama Project',
        accessor: 'nama_project' // String-based value accessors!
      },
      {
        id: 'Task',
        Header: 'Task',
        accessor: 'Task'
      },
      {
        id: 'priority', // Required because our accessor is not a string
        Header: 'Priority',
        accessor: 'priority'
      },
      {
        id: 'pic', // Required because our accessor is not a string
        Header: 'PIC',
        accessor: 'pic'
      },
      {
        id: 'deadline', // Required because our accessor is not a string
        Header: 'Deadline',
        accessor: 'deadline'
      },
      {
        id: 'status_progress', // Required because our accessor is not a string
        Header: 'Status Progress',
        accessor: 'status_progress'
      }
    ];
    // var set = document.getElementById('tables').offsetHeight;
    console.log('halo', this.state.data);
    const nama = this.state.data.map(value => <li>{value.nama_project}</li>);
    return (
      <div className="App">
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
                <Label for="task">Task</Label>
              </Col>
              <Col md="auto">
                <AvField
                  type="text"
                  id="task"
                  name="task"
                  onChange={this.handleChange}
                />
              </Col>
              webkitAnimationDirection
            </AvGroup>
            webkitAnimationDirection
            <AvGroup row>
              webkitAnimationDirection
              <Col md="auto">
                webkitAnimationDirection
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
        <Row>
          <Col>
            <Button type="primary" onClick={this.showModal}>
              Tambah Project
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <div id="header">
              <ul>{nama}</ul>
            </div>
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <ReactTable
              id="tables"
              data={this.state.data}
              columns={columns}
              showPagination={false}
              style={{
                height: '400px'
              }}
              defaultPageSize={50}
              getTdProps={(state, rowInfo, column) => {
                return {
                  style: {

                    background: rowInfo.row.age > 20 ? 'green' : 'red'
                  }
                }
              }}
            />
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default App;
