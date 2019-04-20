import * as React from 'react';
import { Component, Fragment } from 'react';

class Todolist extends Component<any> {
  constructor(props) {
    super(props);
  }

  state = {
    inputValue: '',
    list: []
  };

  render() {
    return (
      <Fragment>
        <div>
          <input type="text" placeholder="请输入要添加的任务" onChange={this.handleChangeInput.bind(this)} defaultValue={this.state.inputValue} />
          <button onClick={this.handleSubmit.bind(this)}>提交</button>
        </div>
        <ul>
          {this.state.list.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </Fragment>
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
}

export default Todolist;
