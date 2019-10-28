import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { Col, Label, Row } from 'reactstrap';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import DatePicker from 'react-datepicker';
import Axios from 'axios';
import 'antd/dist/antd.css';

class ButtonAdd extends Component {
  state = {
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

  render() {
    return (
      <div>
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
        <Row>
          <Col>
            <Button type="primary" onClick={this.showModal} block>
              Tambah Project
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

ButtonAdd.propTypes = {};

export default ButtonAdd;
