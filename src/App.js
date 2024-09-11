import { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data));
  }, []);

  const totalPages = Math.ceil(todos.length / rowsPerPage);
  const pages = Array(totalPages)
    .fill()
    .map((_, i) => i + 1);

  const startIdx = (currentPage - 1) * rowsPerPage;
  const lastIdx = currentPage * rowsPerPage;

  const filteredTodos = todos.slice(startIdx, lastIdx);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {filteredTodos.map((todo, idx) => (
        <p>{`${todo.title}`}</p>
      ))}
      {pages.map((p) => (
        <span onClick={() => setCurrentPage(p)}>{`${p} | `}</span>
      ))}
      <hr />
      <div>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          prev
        </button>{" "}
        <label>{`Rows per page:`}</label>
        <select
          onChange={(event) => {
            setRowsPerPage(event.target.value);
          }}
        >
          {[5, 10, 15, 20, 25].map((i) => (
            <option key={i}>{Number(i)}</option>
          ))}
        </select>{" "}
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          next
        </button>
      </div>
    </div>
  );
}
