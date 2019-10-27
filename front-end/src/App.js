import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Modal, Button } from 'antd';
import { Row, Col, Label, Card, CardBody, CardHeader } from 'reactstrap';
import reqwest from 'reqwest';
import DatePicker from 'react-datepicker';
import Axios from 'axios';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import './App.css';
import 'antd/dist/antd.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';

class App extends Component {
  state = {
    data: [
      {
        nama_project: 'Project1',
        Task: 'Task1',
        priority: 'Prioritas1',
        pic: 'PIC1',
        deadline: '2019',
        status_progress: 'Progres1'
      },
      {
        nama_project: 'Project2',
        Task: 'Task2',
        priority: 'Prioritas2',
        pic: 'PIC2',
        deadline: '2012',
        status_progress: 'Progres2'
      },
      {
        nama_project: 'Project3',
        Task: 'Task3',
        priority: 'Prioritas3',
        pic: 'PIC3',
        deadline: '2013',
        status_progress: 'Progres3'
      },
      {
        nama_project: 'Project3',
        Task: 'Task3',
        priority: 'Prioritas3',
        pic: 'PIC3',
        deadline: '2013',
        status_progress: 'Progres3'
      },
      {
        nama_project: 'Project3',
        Task: 'Task3',
        priority: 'Prioritas3',
        pic: 'PIC3',
        deadline: '2013',
        status_progress: 'Progres3'
      },
      {
        nama_project: 'Project3',
        Task: 'Task3',
        priority: 'Prioritas3',
        pic: 'PIC3',
        deadline: '2013',
        status_progress: 'Progres3'
      }
    ],
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
    // Axios({
    //   method: 'get',
    //   url: 'http://192.168.100.12:8000/monitorings/'
    // }).then(response => {
    //   this.setState({
    //     data: response.data,
    //     size: ReactDOM.findDOMNode(this).offsetHeight
    //   });
    // });
    $('.scroll').wrap('<div class="scroll-group"></div>');
    $('.scroll').css({ overflow: 'hidden', height: 'auto', width: '1820px' });
    // $('.scroll-group').append($('.scroll').clone());
    $('.scroll-group').wrap('<div class="scroll-wrap"></div>');
    $('.scroll-wrap').css({ overflow: 'hidden' });

    /*animate*/
    var targetY = $('.scroll')
      .eq(0)
      .outerHeight();
    var $scrollGroup = $('.scroll-group');
    var scroll = function(resetY) {
      $scrollGroup.animate(
        { top: targetY * -1 + 'px' },
        9000,
        'linear',
        function() {
          $scrollGroup.css({ top: 0 });
          scroll();
        }
      );

      $scrollGroup.hover(function() {
        $scrollGroup.stop(true, false);
      });
      $scrollGroup.mouseleave(function() {
        scroll();
      });
    };

    scroll();
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
    // const columns = [
    //   {
    //     id: 'nama_project',
    //     Header: 'Nama Project',
    //     accessor: 'nama_project' // String-based value accessors!
    //   },
    //   {
    //     id: 'Task',
    //     Header: 'Task',
    //     accessor: 'Task'
    //   },
    //   {
    //     id: 'priority', // Required because our accessor is not a string
    //     Header: 'Priority',
    //     accessor: 'priority'
    //   },
    //   {
    //     id: 'pic', // Required because our accessor is not a string
    //     Header: 'PIC',
    //     accessor: 'pic'
    //   },
    //   {
    //     id: 'deadline', // Required because our accessor is not a string
    //     Header: 'Deadline',
    //     accessor: 'deadline'
    //   },
    //   {
    //     id: 'status_progress', // Required because our accessor is not a string
    //     Header: 'Status Progress',
    //     accessor: 'status_progress'
    //   }
    // ];
    // var set = document.getElementById('tables').offsetHeight;
    console.log('halo');
    const nama_project = this.state.data.map(value => (
      <div style={{ marginBottom: '40px', marginTop: '20px' }}>
        {value.nama_project}
      </div>
    ));
    const Task = this.state.data.map(value => (
      <div style={{ marginBottom: '40px', marginTop: '20px' }}>
        {value.Task}
      </div>
    ));
    const priority = this.state.data.map(value => (
      <div style={{ marginBottom: '40px', marginTop: '20px' }}>
        {value.priority}
      </div>
    ));
    const pic = this.state.data.map(value => (
      <div style={{ marginBottom: '40px', marginTop: '20px' }}>{value.pic}</div>
    ));
    const deadline = this.state.data.map(value => (
      <div style={{ marginBottom: '40px', marginTop: '20px' }}>
        {value.deadline}
      </div>
    ));
    const status_progress = this.state.data.map(value => (
      <div style={{ marginBottom: '40px', marginTop: '20px' }}>
        {value.status_progress}
      </div>
    ));
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
        <Row>
          <Col>
            <Button type="primary" onClick={this.showModal}>
              Tambah Project
            </Button>
          </Col>
        </Row>
        <p />

        {/* header */}
        <Card
          style={{
            position: 'relative',
            borderStyle: 'groove',
            borderRadius: '10px'
          }}
        >
          <CardHeader style={{ backgroundColor: '#ececec' }}>
            <Row>
              <Col md="2">
                <h4>Nama Project</h4>
              </Col>
              <Col md="2">
                <h4>Task</h4>
              </Col>
              <Col md="2">
                <h4>Prioritas</h4>
              </Col>
              <Col md="2">
                <h4>PIC</h4>
              </Col>
              <Col md="2">
                <h4>Deadline</h4>
              </Col>
              <Col md="2">
                <h4>Status Progres</h4>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className={this.state.data.length > 5 ? 'scroll' : ''}>
            {/* body */}
            <Row style={{ border: '1px' }}>
              <Col md="2">{nama_project}</Col>
              <Col md="2">{Task}</Col>
              <Col md="2">{priority}</Col>
              <Col md="2">{pic}</Col>
              <Col md="2">{deadline}</Col>
              <Col md="2">{status_progress}</Col>
            </Row>
          </CardBody>
        </Card>

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
            />
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default App;
