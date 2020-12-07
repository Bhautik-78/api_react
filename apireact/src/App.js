import React,{useState,useEffect} from 'react';
import {Row, Col,Table,Button,Popconfirm} from 'antd';
import axios from "axios";

const App = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        initial();
    },[])

    const initial = () =>{
        axios.get('http://dummy.restapiexample.com/api/v1/employees')
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const T = 'Are you sure to delete this task?';

    const onEdit = (id, data) => {
        return axios.put(`http://dummy.restapiexample.com/api/v1/update/${id}`, data)
            .then(res => {
                console.log()
            })
    }

    const onDelete = id => {
        return axios.delete(`http://dummy.restapiexample.com/api/v1/delete/${id}`)
            .then(res => {
            console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        initial();
    }

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
                    <Button type="primary" onClick={() => onEdit(record)}>
                        Edit
                    </Button>
                    &nbsp;&nbsp;
                    <Popconfirm placement="right" title={T} onConfirm={() => onDelete(record)} okText="Yes"
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
              <Col span={4}/>
              <Col span={16} className="mt-3">
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
