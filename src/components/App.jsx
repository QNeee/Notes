import { useState } from "react";
import { Form } from "./Form/Form";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { nanoid } from 'nanoid'
import { useEffect } from "react";
import { Container } from "./App.styled";
import { Notes } from "./Notes/Notes";
import { Redactor } from "./Redactor/Redactor";
export const App = () => {
  const KEY = 'local-key';
  const stateMachine = {
    ADD: 'add',
    DELETE: 'delete',
    REDACTERED: "redactered"
  }
  const [status, setStatus] = useState('');
  const [nodes, setNodes] = useState([]);
  const [node, setNode] = useState([]);
  const [modal, setModal] = useState({ isOpen: false });
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(KEY)) || [];
    if (localData.length > 0) {
      setNodes(localData);
    }
  }, [])
  useEffect(() => {
    if (status === stateMachine.ADD || status === stateMachine.DELETE || status === stateMachine.REDACTERED) {
      return localStorage.setItem(KEY, JSON.stringify(nodes));
    }
  }, [status, nodes])
  const handleSubmit = (e) => {

    const newNode = {
      id: nanoid(),
      name: e.name,
      date: e.date,
      text: e.text,
      isEdit: false,
    }
    const findNode = nodes.find(item => item.name.toLowerCase() === e.name.toLowerCase())
    if (!findNode) {
      setNodes([...nodes, newNode]);
      setFilter('');
      return setStatus(stateMachine.ADD);
    }
    return alert(`${e.name} is already in list`);
  }
  const onClick = (e) => {
    setNode([e]);
  }
  const onClickDelete = (e) => {

    setNode([]);
    setStatus(stateMachine.DELETE);
    return setNodes(nodes.filter(item => item.id !== e))
  }
  const onClickRedactor = (e) => {
    setModal({ isOpen: true })
  }
  const redactorSubmit = (e) => {
    const index = nodes.findIndex(item => item.id === e.id);
    const findNode = nodes.find(item => item.name.toLowerCase() === e.name.toLowerCase())
    if (!findNode) {
      const redacteredNode = {
        id: nanoid(),
        name: e.name,
        date: e.date,
        text: e.text,
        isEdit: true,
      }
      nodes.splice(index, 1);
      setNodes([...nodes, redacteredNode]);
      setNode([]);
      setModal({ isOpen: false });
      setStatus(stateMachine.REDACTERED);
      return setFilter('');
    }
    return alert(`${e.name} is already in list`);
  }
  const onChangeFilter = (value) => {
    setFilter(value);
  }
  const getFilteredNodes = () => {
    return nodes.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
  }
  const onClose = (e) => {
    setModal({ isOpen: false });
  }
  return (
    <>
      <Header value={filter} onChange={onChangeFilter} />
      {!modal.isOpen && <Form onSubmit={handleSubmit} />}
      <Container>
        <Sidebar nodes={getFilteredNodes()} onClick={onClick} />
        {nodes.length !== 0 ? <Notes node={node} onClickDelete={onClickDelete} onClickRedactor={onClickRedactor} /> : <h1>Create Note</h1>}
      </Container>
      {modal.isOpen && <Redactor onClose={onClose} onSubmit={redactorSubmit} node={node} />}
    </>
  );
};
