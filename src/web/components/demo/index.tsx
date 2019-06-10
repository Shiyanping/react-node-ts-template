import "./demo.css";
import * as React from "react";
const { useContext } = React;
import { observer } from "mobx-react-lite";
import TodoStore from "./Store";
import Store from "../../models/index";
import TodoList from "./TodoList";
import Footer from "./Footer";
import useDataApi from "../../models/react-hooks-state";
const demo = observer(() => {
  // function demo(props) {
  const store = useContext(TodoStore);
  const store = useContext(Store);
  // const data = useDataApi("api/test",{});
  // console.log(data);
  // fetch("api/test").then()
  return (
    <div>
      <h2 className="nav">{store.str}</h2>
      <TodoList todos={store.todos} toggleTodo={store.toggleTodo} />
      <Footer remaining={store.remainingTodos} total={store.todos.length} />
      <h3>{store.id}</h3>
      <input type="button" value="测试异步加载" onClick={() => store.test()} />
    </div>
  );
});
export default demo;
