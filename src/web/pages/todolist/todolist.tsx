import * as React from 'react';
import { Input, Button, List } from 'antd';
import store from '../../models';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  state = store.getState();

  render() {
    return (
      <div>
        <div>
          <Input
            placeholder="请输入要添加的任务"
            onChange={this.handleChangeInput.bind(this)}
            style={{ width: '300px', margin: '15px' }}
            value={this.state.inputValue}
          />
          <Button type="primary" onClick={this.handleSubmit.bind(this)}>
            提交
          </Button>
        </div>
        <List bordered dataSource={this.state.list} renderItem={item => <List.Item>{item}</List.Item>} />
      </div>
    );
  }

  handleChangeInput(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleSubmit() {
    let list = [...this.state.list, this.state.inputValue];
    this.setState({
      inputValue: '',
      list
    });
  }

  handleRemoveItem(key) {
    let list = [...this.state.list];
    list.splice(key, 1);
    this.setState({
      list
    });
  }
}

export default TodoList;

// import * as React from 'react';
// import { Component, Fragment } from 'react';

// class Todolist extends Component<any> {
//   constructor(props) {
//     super(props);
//   }

//   state = {
//     inputValue: '',
//     list: []
//   };

//   render() {
//     return (
//       <Fragment>
//         <div>
//           <input type="text" placeholder="请输入要添加的任务" onChange={this.handleChangeInput.bind(this)} value={this.state.inputValue} />
//           <button onClick={this.handleSubmit.bind(this)}>提交</button>
//         </div>
//         <ul>
//           {this.state.list.map((item, index) => {
//             return (
//               <li key={index} onClick={this.handleRemoveItem.bind(this, index)}>
//                 {item}
//               </li>
//             );
//           })}
//         </ul>
//       </Fragment>
//     );
//   }
// }

// export default Todolist;
