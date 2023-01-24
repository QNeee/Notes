import { useState } from "react";
import { Form } from "./Form/Form";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { nanoid } from 'nanoid'
import { useEffect } from "react";
import { Container } from "./App.styled";
import { Notes } from "./Notes/Notes";
export const App = () => {
  const KEY = 'local-key';
  const stateMachine = {
    ADD: 'add',
    DELETE: 'delete'
  }
  const [status, setStatus] = useState('');
  const [nodes, setNodes] = useState([]);
  const [node, setNode] = useState([]);
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(KEY)) || [];
    if (localData.length > 0) {
      setNodes(localData);
    }
  }, [])
  useEffect(() => {
    if (status === stateMachine.ADD || status === stateMachine.DELETE) {
      return localStorage.setItem(KEY, JSON.stringify(nodes));
    }
  }, [status, nodes])

  const handleSubmit = (e) => {
    const newNode = {
      id: nanoid(),
      name: e.name,
      date: e.date,
      text: e.text
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
  console.log(node);
  return (
    <>
      <Header />
      <Form onSubmit={handleSubmit} />
      <Container>
        <Sidebar nodes={nodes} onClick={onClick} />
        <Notes node={node} />
      </Container>
    </>
  );
};
