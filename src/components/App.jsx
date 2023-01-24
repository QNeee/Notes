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
      setNodes([...nodes, newNode])
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
    return setStatus(stateMachine.REDACTERED);
  }
  return (
    <>
      <Header />
      <Form onSubmit={handleSubmit} />
      <Container>
        <Sidebar nodes={nodes} onClick={onClick} />
        <Notes node={node} onClickDelete={onClickDelete} onClickRedactor={onClickRedactor} />
      </Container>
      {modal.isOpen && <Redactor onSubmit={redactorSubmit} node={node} />}
    </>
  );
};
