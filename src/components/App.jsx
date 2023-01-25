import { useState } from "react";
import { Form } from "./Form/Form";
import { HeaderLayout } from "./Header/HeaderLayout";
import { Sidebar } from "./Sidebar/Sidebar";
import { nanoid } from 'nanoid'
import { useEffect } from "react";
import { Container, H1 } from "./App.styled";
import { Notes } from "./Notes/Notes";
import { Redactor } from "./Redactor/Redactor";
import { Context } from "./context";
import { Button } from '@mui/material/';
import { DeleteModal } from "./DeleteModal/DeleteModal";

export const App = () => {
  const KEY = 'local-key';
  const stateMachine = {
    ADD: 'add',
    DELETE: 'delete',
    REDACTERED: "redactered"
  }
  const date = new Date();
  const time = (date.getHours() + ':' + date.getMinutes());
  const [status, setStatus] = useState('');
  const [nodes, setNodes] = useState([]);
  const [node, setNode] = useState([]);
  const [filter, setFilter] = useState('');
  const [form, setForm] = useState({ id: '', name: '', date: time, text: '', isEdit: false });
  const [modalHeader, setModalHeader] = useState({ isToggle: false });
  const [isOpen, setIsopen] = useState({ redacteredForm: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');
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


  const handleOk = () => {
    setIsModalOpen(false);
    setNode([]);
    setStatus(stateMachine.DELETE);
    setIsopen({ redacteredForm: false });
    return setNodes(nodes.filter(item => item.id !== itemToDelete))
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleClick = (e) => {
    setForm({ id: '', name: '', date: time, text: '', isEdit: false })
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
      setForm({ name: '', date: time, text: '', isEdit: false });
      setModalHeader({ isToggle: false });
      setNode([]);
      return setStatus(stateMachine.ADD);
    }
    return alert(`${e.name} is already in list`);
  }
  const onClick = (e) => {
    setNode([e]);
  }
  const onClickDelete = (e) => {
    setIsModalOpen(true);
    setItemToDelete(e);
  }
  const onClickRedactor = (e) => {
    const nodeToEditName = node.map(item => item.name).join("");
    const nodeToEditText = node.map(item => item.text).join("");
    const nodeToEditId = node.map(item => item.id).join("");
    const nodeToEdit = {
      id: nodeToEditId,
      date: form.date,
      name: nodeToEditName,
      text: nodeToEditText,
      isEdit: true,
    }
    setForm(nodeToEdit);
    setIsopen({ redacteredForm: true });
    setModalHeader({ isToggle: false });
  }
  const redactorSubmit = (e) => {
    e.preventDefault();
    const index = nodes.findIndex(item => item.id === form.id);
    nodes.splice(index, 1);
    setNodes([...nodes, form])
    setIsopen({ redacteredForm: false });
    setStatus(stateMachine.REDACTERED);
    setForm({ id: '', name: '', date: time, text: '', isEdit: false });
    return setNode([]);
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
  return (
    <>
      <Context.Provider value={{ handleOk, handleCancel, isModalOpen }}>
        <DeleteModal />
      </Context.Provider>
      <Context.Provider value={{ filter, onChangeFilter }}>
        <HeaderLayout />
      </Context.Provider>
      <Button type="button" variant="contained" onClick={handleClick}>Create Note</Button>
      <Context.Provider value={{ handleSubmit, handleInput, form, handleClick, modalHeader, onClose, redactorSubmit, node }}>
        {modalHeader.isToggle && <Form />}
        {isOpen.redacteredForm && <Redactor />}
      </Context.Provider>
      <Context.Provider value={{ getFilteredNodes, onClick, node, onClickDelete, onClickRedactor }}>
        <Container>
          <Sidebar />
          {nodes.length !== 0 ? <Notes /> : <H1>Create Note</H1>}
        </Container>
      </Context.Provider>
    </>
  );
};
