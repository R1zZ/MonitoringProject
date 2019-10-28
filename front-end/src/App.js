import React, { Component } from 'react';
import { Modal, Popconfirm, message } from 'antd';
import { Col, Label, Button } from 'reactstrap';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';

import Axios from 'axios';
import DatePicker from 'react-datepicker';
import ButtonAdd from './views/ButtonAdd';
import { convertDate } from './config';
import './tables.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';
import 'react-notifications/lib/notifications.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightBody: React.createRef(),
      heightTable: React.createRef(),
      data: [],
      detail: [],
      visibleEdit: false,
      id: '',
      loading: false,
      visible: false,
      time: '',
      destroy: false,
      startDate: new Date()
    };
  }
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
          visible: false,
          destroy: true
        });
        setTimeout(() => {
          this.setState({
            loading: false
          });
        }, 1000);
        NotificationManager.success(
          `Berhasil Menambahkan Project`,
          'SUCCESS',
          5000
        );

        this.get();
      }
    });
  };

  handleCancel = e => {
    console.log('event', e);
    this.setState({
      visible: false,
      [e.target.name]: ''
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

  get = () => {
    Axios({
      method: 'get',
      url: 'http://192.168.100.12:8000/monitorings/'
    }).then(response => {
      this.setState({
        data: response.data
      });
    });
  };

  componentDidMount() {
    this.get();
  }

  handleCancelEdit = e => {
    console.log(e);
    this.setState({
      visibleEdit: false
    });
  };

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
            { transform: 'translateY(64px)' },
            { transform: 'translateY(' + moveY + 'px)' }
          ],
          {
            duration: 50000,
            direction: 'alternate-reverse',
            iterations: Infinity
          }
        );
    }
    // this.get();
  }

  handleChangeEdit = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeEditDate = date => {
    this.setState({
      startDateEdit: date
    });
  };

  handleEdit = value => {
    console.log(this.state.startDateEdit);
    Axios({
      method: 'get',
      url: 'http://192.168.100.12:8000/monitorings/' + value
    }).then(response => {
      console.log(response.data.deadline);
      this.setState({
        detail: response.data,
        visibleEdit: true,
        startDateEdit: new Date(response.data.deadline)
      });
    });
    this.get();
  };

  handleSubmitEdit = () => {
    const {
      id,
      nama_project,
      task,
      priority,
      pic,
      status_progress
    } = this.state.detail;
    var asiaDate = new Date(this.state.startDateEdit).toISOString();
    var data = {};
    data['nama_project'] =
      this.state.nama_project === undefined
        ? nama_project
        : this.state.nama_project;
    data['task'] = this.state.task === undefined ? task : this.state.task;
    data['priority'] =
      this.state.priority === undefined ? priority : this.state.priority;
    data['pic'] = this.state.pic === undefined ? pic : this.state.pic;
    data['deadline'] = asiaDate;
    data['status_progress'] =
      this.state.status_progress === undefined
        ? status_progress
        : this.state.status_progress;

    console.log(data);
    Axios({
      method: 'put',
      url: 'http://192.168.100.12:8000/monitorings/' + id + '/',
      data: data
    }).then(response => {
      console.log(response);
      if (response.status === 200) {
        this.setState({
          visibleEdit: false
        });
        setTimeout(() => {
          this.setState({
            loading: false
          });
        }, 1000);
        NotificationManager.success(`Data Berhasil Di Ubah`, 'SUCCESS', 5000);

        this.get();
      }
    });
  };

  handleDelete = value => {
    Axios({
      method: 'delete',
      url: 'http://192.168.100.12:8000/monitorings/' + value + '/'
    }).then(response => {
      console.log(response);
      if (response.status === 204) {
        this.setState({
          visibleEdit: false
        });
        setTimeout(() => {
          this.setState({
            loading: false
          });
        }, 1000);
        NotificationManager.success(`Data Berhasil Di Hapus`, 'SUCCESS', 5000);

        this.get();
      }
    });
  };

  cancelDelete = () => {
    console.log('tidak Jadi di hapus');
  };
  render() {
    return (
      <div id="myBody" ref={this.state.heightBody}>
        <Modal
          destroyOnClose={this.state.destroy}
          title="Edit Data"
          visible={this.state.visibleEdit}
          onOk={this.handleSubmitEdit}
          onCancel={this.handleCancelEdit}
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
                  value={this.state.detail.nama_project}
                  onChange={this.handleChangeEdit}
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
                  value={this.state.detail.task}
                  onChange={this.handleChangeEdit}
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
                  onChange={this.handleChangeEdit}
                >
                  <option value={this.state.detail.priority}>
                    {this.state.detail.priority === 'm' ? 'Medium' : 'Heigh'}
                  </option>
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
                  value={this.state.detail.pic}
                  onChange={this.handleChangeEdit}
                />
              </Col>
            </AvGroup>
            <AvGroup row>
              <Col md="auto">
                <Label for="deadline">DeadLine</Label>
              </Col>
              <Col>
                <DatePicker
                  selected={this.state.startDateEdit}
                  onChange={this.handleChangeEditDate}
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
                  onChange={this.handleChangeEdit}
                >
                  <option value={this.state.detail.status_progress}>
                    {this.state.detail.status_progress === 'complete'
                      ? 'Complete'
                      : this.state.detail.status_progress === 'pending'
                      ? 'Pending'
                      : this.state.detail.status_progress === 'inprogress'
                      ? 'In Progress'
                      : ''}
                  </option>
                  <option value="complete">Complete</option>
                  <option value="pending">Pending</option>
                  <option value="inprogress">In Progress</option>
                </AvField>
              </Col>
            </AvGroup>
          </AvForm>
        </Modal>
        <Modal
          destroyOnClose={this.state.destroy}
          title="ADD Project"
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
        {/* <div style={{ position: 'sticky', top: '0', zIndex: '999' }}>
        </div> */}
        <Button
          color="primary"
          onClick={this.showModal}
          block
          // style={{ position: 'sticky', top: '0', zIndex: '999' }}
        >
          Tambah Project
        </Button>
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
              <tr>
                <td>{value.nama_project}</td>
                <td>{value.task}</td>
                <td>{value.priority === 'm' ? 'Medium' : 'High'}</td>
                <td>{value.pic}</td>
                <td>{convertDate(value.deadline)}</td>
                <td
                  className={
                    value.status_progress === 'pending'
                      ? 'pending'
                      : value.status_progress === 'inprogress'
                      ? 'inprogress'
                      : value.status_progress === 'complete'
                      ? 'complete'
                      : ''
                  }
                  style={{ fontWeight: 'bold' }}
                >
                  {value.status_progress.toUpperCase()}
                </td>
                <td>
                  <Button
                    color="success"
                    title="Edit"
                    onClick={this.handleEdit.bind(this, value.id)}
                  >
                    <FaEdit />
                  </Button>{' '}
                  <Popconfirm
                    title="Are you sure delete this task?"
                    onConfirm={this.handleDelete.bind(this, value.id)}
                    onCancel={this.cancelDelete}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button color="danger" title="Delete">
                      <FaTrashAlt />
                    </Button>
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
