import React, { Component } from "react";
import { Table } from "antd";
import { Row, Col, Button } from "reactstrap";
import reqwest from "reqwest";
import "./App.css";
import "antd/dist/antd.css";

const columns = [
  {
    title: "Nama Project",
    dataIndex: "nama_project",
    width: "20%"
  },
  {
    title: "Task",
    dataIndex: "task",
    width: "20%"
  },
  {
    title: "Priority",
    dataIndex: "priority"
  },
  {
    title: "PIC",
    dataIndex: "pic"
  },
  {
    title: "Deadline",
    dataIndex: "deadline",
    render: value => {
      const date = new Date(value);
      var month = [];
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      var mount = month[date.getMonth()];
      var day = date.getDate();
      var year = date.getFullYear();
      return `${day} ${mount} ${year}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  },
  {
    title: "status_progress",
    dataIndex: "status_progress"
  }
];

class App extends Component {
  state = {
    data: [],
    // pagination: {},
    loading: false
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
      url: "http://192.168.100.12:8000/monitorings/",
      method: "get",
      data: {
        // results: 10,
        ...params
      },
      type: "json"
    }).then(data => {
      console.log("params:", data);
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
    return (
      <div className="App">
        <Row>
          <Col>
            <Button className="float-md-right" size="default" color="primary">
              Tambah
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
