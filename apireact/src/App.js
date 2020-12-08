import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Row, Col,Button,Popconfirm,Card,Form,Input} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import Table from "antd/lib/table";
let EditId = null;

const App = () => {

    const [userDetail, setUserDetail] = useState({
        employee_name: "",
        employee_salary: "",
        employee_age: "",
        id: ""
    });

    const [data, setData] = useState([]);

    useEffect(() => {
        initial();
    },[])

    const handleChange = e => {
        const {name, value} = e.target;
        setUserDetail({...userDetail, [name]: value})
    }

    const onsubmit = () => {
        if (EditId !== null) {
            axios.put(`http://dummy.restapiexample.com/api/v1/update/${EditId}`, userDetail)
                .then(res => {
                    setUserDetail(data[EditId])
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            userDetail.id = data.length + 1;
            axios.post(`http://dummy.restapiexample.com/api/v1/create`)
                .then(res => {
                    setData(res.data.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        setUserDetail({})
    }

    const initial = () => {
        axios.get('http://dummy.restapiexample.com/api/v1/employees')
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onEdit = (id) => {
            EditId =id;
            const findUserDetail = data.find(user => user.id === (id))
            setUserDetail(findUserDetail)

        // return axios.get(`http://dummy.restapiexample.com/api/v1/employee/${id}`,data)
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // return axios.put(`http://dummy.restapiexample.com/api/v1/update/${id}`, data)
        //     .then(res => {
        //         setUserDetail(data[id])
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // initial();
    }

    const onDelete = id => {
        return axios.delete(`http://dummy.restapiexample.com/api/v1/delete/${id}`)
            .then(res => {
            console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        // initial();
    }

    const T = 'Are you sure to delete this task?';
    const columns = [
        {
            title: 'ID',
            width: 120,
            dataIndex: 'id',
            fixed: 'left',
        },
        {
            title: 'Employee_Name',
            width: 120,
            dataIndex: 'employee_name',
            fixed: 'left',
        },
        {
            title: 'Employee_salary',
            width: 100,
            dataIndex: 'employee_salary',
            fixed: 'left',
        },
        {
            title: 'Employee_Age',
            width: 100,
            dataIndex: 'employee_age',
            fixed: 'left',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (text, record) => (
                <>
                    <Button type="primary" onClick={() => onEdit(record.id)}>
                        Edit
                    </Button>
                    &nbsp;&nbsp;
                    <Popconfirm placement="right" title={T} onConfirm={() => onDelete(data)} okText="Yes"
                                cancelText="No">
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>

                </>
            )
        },
    ]


  return (
      <>
          <Row style={{marginTop: 100}}>
              <Col span={7}/>
              <Col span={10}>
              <Card>
                <Form>
                    <Form.Item>
                        <Input placeholder="Enter Employee_Name" name="employee_name"
                               value={userDetail.employee_name}
                               onChange={handleChange} addonBefore={(<UserOutlined/>)}/>
                        {/*<span className="error">{errors.employee_name}</span>*/}
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="Enter Employee_salary" name="employee_salary"
                               value={userDetail.employee_salary}
                               onChange={handleChange} addonBefore={(<UserOutlined/>)}/>
                        {/*<span className="error">{errors.Employee_salary}</span>*/}
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="Enter Employee_Age" name="employee_age"
                               value={userDetail.employee_age}
                               onChange={handleChange} addonBefore={(<UserOutlined/>)}/>
                        {/*<span className="error">{errors.Employee_Age}</span>*/}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={onsubmit}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
              </Card>
              </Col>
          </Row><br />
          <Row >
              <Col span={7}/>
              <Col span={10} className="mt-3">
                  <Table
                      columns={columns}
                      dataSource={data || []}
                      pagination={{pageSize: 5}}
                      rowKey={record => record.id}
                  />
              </Col>
          </Row>
      </>
  );
}

export default App;
