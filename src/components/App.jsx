import { useState } from "react";
import { Form } from "./Form/Form";
import { HeaderLayout } from "./Header/HeaderLayout";
import { Sidebar } from "./Sidebar/Sidebar";
import { nanoid } from 'nanoid'
import { useEffect } from "react";
import { Container } from "./App.styled";
import { Notes } from "./Notes/Notes";
import { Redactor } from "./Redactor/Redactor";
import { Context } from "./context";
import { Button } from '@mui/material/';
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
  const [filter, setFilter] = useState('');
  const date = new Date();
  const time = (date.getHours() + ':' + date.getMinutes());
  const [form, setForm] = useState({ name: '', date: time, text: '', isEdit: false });
  const [modalHeader, setModalHeader] = useState({ isToggle: false });
  const [isOpen, setIsopen] = useState({ redacteredForm: false });
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
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleClick = (e) => {
    setModalHeader({ isToggle: !modalHeader.isToggle });
    setIsopen({ redacteredForm: false });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newNode = {
      id: nanoid(),
      name: form.name,
      date: form.date,
      text: form.text,
      isEdit: false,
    }
    const findNode = nodes.find(item => item.name.toLowerCase() === form.name.toLowerCase())
    if (!findNode) {
      setNodes([...nodes, newNode]);
      setFilter('');
      setStatus(stateMachine.ADD);
      setForm({ name: '', date: time, text: '', isEdit: false });
      return setModalHeader({ isToggle: false });
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
    setIsopen({ redacteredForm: true });
    setModalHeader({ isToggle: false });
  }
  const redactorSubmit = (e) => {
    e.preventDefault();

    const index = nodes.findIndex(item => item.id === e.id);
    const findNode = nodes.find(item => item.name.toLowerCase() === form.name.toLowerCase())
    if (!findNode) {
      const redacteredNode = {
        id: nanoid(),
        name: form.name,
        date: form.date,
        text: form.text,
        isEdit: true,
      }
      nodes.splice(index, 1);
      setNodes([...nodes, redacteredNode]);
      setNode([]);
      setStatus(stateMachine.REDACTERED);
      setIsopen({ redacteredForm: false });
      setForm({ name: '', date: time, text: '', isEdit: true });
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
    setIsopen({ redacteredForm: false });
  }
  // const onClickCancel = (e) => {
  //   setIsopen({ redacteredForm: false });
  // }
  return (
    <>
      <Context.Provider value={{ filter, onChangeFilter }}>
        <HeaderLayout />
      </Context.Provider>
      <Button type="button" variant="contained" onClick={handleClick}>Add Node</Button>
      <Context.Provider value={{ handleSubmit, handleInput, form, handleClick, modalHeader, onClose, redactorSubmit, node }}>
        {modalHeader.isToggle && <Form />}
        {isOpen.redacteredForm && <Redactor />}
      </Context.Provider>
      <Context.Provider value={{ getFilteredNodes, onClick, node, onClickDelete, onClickRedactor }}>
        <Container>
          <Sidebar />
          {nodes.length !== 0 ? <Notes /> : <h1>Create Note</h1>}
        </Container>
      </Context.Provider>
    </>
  );
};
