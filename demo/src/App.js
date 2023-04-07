//Importing all the required components and API form react and antdesign
import "./App.css";
import { Button, Table, Modal, Input, Form, Select } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from 'moment'


/*installed the moment and imported it to get the real time data into the time stamp column

defining the 'time' variable outside the App() component because want to set the 'time' as the default value of timestamp */
var time = moment().format("MMMM Do YYYY, h:mm:ss a");


function App() {
  

  /*defining 'time again in the App component because want the timestamp to update every time the App() is rendered or we can say that whenever new task is added */

  time = moment().format("MMMM Do YYYY, h:mm:ss a");

  /*creating a useState "newtask" which will hold an object which contains all the values of tasks  */
  const [newtask, setNewtask] = useState({
    timestamp: time,
    title: "",
    description: "",
    duedate: "",
    tag: "",
    status: "",
    });

    /*isEditing and editing are used when the data is edited */
  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState(null);

  /*dataSource contains an array of object, so, it helps us to accomodate all the updated states of newtask */
  const [dataSource, setDataSource] = useState([])

  /*creating all the colums below, and the required functions such as sorting of select tag for status and the widths of different colums, all of it is taken care in this column creation process. the last colum contains the edit and delete icon, which helps us perform respective tasks when clicked  */
 
  const columns = [
   
    {
      key: "1",
      title: "Time Stamp",
      dataIndex: "timestamp",
      sorter: (record1, record2)=>{
        return record1.timestamp > record2.timestamp
      }
    },

    {
      key: "2",
      title: "Title",
      dataIndex: "title",
      sorter: (record1, record2)=>{
        return record1.title > record2.title
      },
      render: (text) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', maxWidth: '150px' }}>
          {text}
        </div>
      ),
    },

    {
      key: "3",
      title: "Description",
      dataIndex: "description",
      sorter: (record1, record2)=>{
        return record1.description > record2.description
      },
      render: (text) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', maxWidth: '250px' }}>
          {text}
        </div>
      ),
    },

    {
      key: "4",
      title: "Due date",
      dataIndex: "duedate",
      sorter: (record1, record2)=>{
        return record1.duedate > record2.duedate 
      },
      // render:(record1, record2)=>{
      //   return record1.duedate > record2.timestamp
      // }
        
      
    },

    {
      key: "5",
      title: "Tag",
      dataIndex: "tag",
      render: (text) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100px' }}>
          {text}
        </div>
      ),
    },

    {
      key: "6",
      title: "Status",
      dataIndex: "status",
      render: (_, record) => (
        <Select placeholder="Set Status" required>

                  {statusOptions.map((opt, index)=>{
                          return <Select.Option key={index} value={opt} required >  {opt}  </Select.Option>
                  })}
                    
                  </Select>
      ),
    },

    {
      key: "7",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEdit(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDelete(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  
 /*onAddTask function helps us update the state of newtask and also add the newtask in to DataSource, this way we are creating an array of tasks and all of our tasks are displayed in the todo list */
  const onAddTask = () => {
    
    setNewtask((pre) => ({
    ...pre,
    timestamp: time,
    }));
    
    setDataSource((pre) => {
      return [...pre, newtask];
    });
    
  };

/*onDelete function helps us delete a particular task, it tracks the unique value of timestamp and on basis of that filters out the particular row and returns the other rows back */
  const onDelete = (record) => {

    Modal.confirm({
      title: "Are you sure, you want to delete item?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((task) => task.timestamp !== record.timestamp);
        });
      },
    });

  };

/*onEdit helps us to open the edit window and helps in editing and resetEditing helps us in updating the data */
  const onEdit = (record) => {
    setIsEditing(true);
    setEditing({ ...record });
  };


  const resetEditing = () => {
    setIsEditing(false);
    setEditing(null);
  };

  /*statusOptions is an array which holds the different values of status which the user can select as per the status of task going on*/
   const statusOptions = ["OPEN", "WORKING", "DONE", "OVERDUE"]


   /* in return, we return a form which is used to take data from the user.

   then we have a table which is used to display all the data and the pagination of table is set to 10, that means only 10 rows will be displayed in one page and once exceeded then the next page will be created which will hold next 10 rows and so on.

   then we have Modal component which pops up when we click the edit icon and in it we can change and edit the data of particula row and save it back.
   */
  return (
    <div className="App">
      <header style={{border: "4px solid blue", margin:"0 5px 2px 5px"}} className="App-header">
       

        <Form 
        style={{marginTop:"30px", width: "30vw"}} onFinish={onAddTask}>

         <Form.Item>
          <label>
            <h2 style={{fontSize:"30px", color:"blue", textDecoration:"underline"}}>Todo List</h2>
            </label>
         </Form.Item>

          <Form.Item>
          <Input

           placeholder="Enter title"
            maxLength={100} 
            required 
            onChange={(e) =>setNewtask((pre) => ({ ...pre, title: e.target.value }))}>

            </Input>
          </Form.Item>

          <Form.Item>
          <Input 

          placeholder="Enter Description" 
          maxLength={1000}
           required 
           onChange={(e) =>setNewtask((pre) => ({ ...pre, description: e.target.value }))}>

           </Input>
          </Form.Item>

          <Form.Item>
          <Input type="date" placeholder="Enter Duedate" onChange={(e) =>setNewtask((pre) => ({ ...pre, duedate: e.target.value }))}></Input>
          </Form.Item>

          <Form.Item>
          <Input placeholder="Enter Tags" onChange={(e) =>setNewtask((pre) => ({ ...pre, tag: e.target.value }))}></Input>
          </Form.Item>

          <Form.Item>
          <Button block type="primary" htmlType="submit">Add Task</Button>
          </Form.Item>

        </Form>
      

        <Table
        pagination={{
          pageSize:10,
        }}
         columns={columns} dataSource={dataSource}>
         </Table>
        
        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}

          onOk={() => {
            setDataSource((pre) => {

              return pre.map((student) => {
                if (student.timestamp === editing.timestamp) {
                  return editing;
                } else {
                  return student;
                }
              });

            });
            resetEditing();
          }}
        >


          <Input
            value={editing?.title}
            onChange={(e) => {
              setEditing((pre) => {
                return { ...pre, title: e.target.value };
              });
            }}
          />
        

          <Input
            value={editing?.description}
            onChange={(e) => {
              setEditing((pre) => {
                return { ...pre, description: e.target.value };
              });
            }}
          />
              
          <Input
          type="date"
            value={editing?.duedate}
            onChange={(e) => {
              setEditing((pre) => {
                return { ...pre, duedate: e.target.value };
              });
            }}
          />

          <Input
            value={editing?.tag}
            onChange={(e) => {
              setEditing((pre) => {
                return { ...pre, tag: e.target.value };
              });
            }}
          />

        </Modal>
      </header>
    </div>
  );
}

export default App;