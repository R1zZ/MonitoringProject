import React, { Component } from 'react';
import { Table, Modal, Button } from 'antd';
import { Row, Col, Label } from 'reactstrap';
import reqwest from 'reqwest';
import DatePicker from 'react-datepicker';
import Axios from 'axios';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import './App.css';
import 'antd/dist/antd.css';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

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
        this.fetch();
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
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    // const pager = { ...this.state.pagination };
    // pager.current = pagination.current;
    // this.setState({
    //   pagination: pager,
    // });
    this.fetch({
      // results: pagination.pageSize,
      // page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    reqwest({
      url: 'http://192.168.100.12:8000/monitorings/',
      method: 'get',
      data: {
        // results: 10,
        ...params
      },
      type: 'json'
    }).then(data => {
      console.log('params:', data);
      // const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      // pagination.total = 200;
      this.setState({
        loading: false,
        data: data
        // pagination,
      });
    });
  };

  render() {
    // const { projects, project } = this.state
    const columns = [
      {
        title: 'Nama Project',
        dataIndex: 'nama_project',
        width: '20%'
      },
      {
        title: 'Task',
        dataIndex: 'task',
        width: '20%'
      },
      {
        title: 'Priority',
        dataIndex: 'priority'
      },
      {
        title: 'PIC',
        dataIndex: 'pic'
      },
      {
        title: 'Deadline',
        dataIndex: 'deadline',
        render: value => {
          const date = new Date(value);
          var month = [];
          month[0] = 'January';
          month[1] = 'February';
          month[2] = 'March';
          month[3] = 'April';
          month[4] = 'May';
          month[5] = 'June';
          month[6] = 'July';
          month[7] = 'August';
          month[8] = 'September';
          month[9] = 'October';
          month[10] = 'November';
          month[11] = 'December';
          var mount = month[date.getMonth()];
          var day = date.getDate();
          var year = date.getFullYear();
          return `${day} ${mount} ${year}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        }
      },
      {
        title: 'status_progress',
        dataIndex: 'status_progress'
      }
    ];

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
              <Col md="3">
                <Label for="nama_project">Nama Project</Label>
              </Col>
              <Col xs="12" md="3">
                <AvField
                  type="text"
                  id="nama_project"
                  name="nama_project"
                  onChange={this.handleChange}
                />
              </Col>
              <Col md="3">
                <Label for="task">Task</Label>
              </Col>
              <Col xs="12" md="3">
                <AvField
                  type="text"
                  id="task"
                  name="task"
                  onChange={this.handleChange}
                />
              </Col>
            </AvGroup>
            <AvGroup row>
              <Col md="3">
                <Label for="priority">Priority</Label>
              </Col>
              <Col xs="12" md="3">
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
              <Col md="3">
                <Label for="pic">PIC</Label>
              </Col>
              <Col xs="12" md="3">
                <AvField
                  type="text"
                  id="pic"
                  name="pic"
                  onChange={this.handleChange}
                />
              </Col>
            </AvGroup>
            <AvGroup row>
              <Col md="3">
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
              <Col md="3">
                <Label for="status_progress">Status Progress</Label>
              </Col>
              <Col xs="12" md="3">
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
            <Table
              columns={columns}
              rowKey={record => record.id}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
