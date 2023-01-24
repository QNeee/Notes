
import { useState } from "react"
import { Button, TextField } from '@mui/material/';
export const Redactor = (props) => {
    const date = new Date();
    const time = (date.getHours() + ':' + date.getMinutes());
    const id = props.node.map(item => item.id).join("");
    const [form, setForm] = useState({ id: id, name: '', date: time, text: '', isEdit: true });
    const [isOpen, setIsopen] = useState({ formIsOpen: false });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.name === "" || form.text === "") return alert("enter value");
        props.onSubmit(form);
    }
    const onClickCancel = (e) => {
        setIsopen({ formIsOpen: true });
        props.onClose();
    }
    return <div>
        {!isOpen.formIsOpen && <form onSubmit={handleSubmit}>
            <TextField label="Имя заметки" id="outlined-basic" variant="outlined" type="text" name="name" onChange={handleInput} value={form.name} />
            <TextField label="Текс заметки" id="outlined-basic" variant="outlined" type="text" name="text" onChange={handleInput} value={form.text} />
            <Button type="submit" variant="contained">edit</Button>
            <Button variant="contained" onClick={onClickCancel} type="button">Cancel</Button>
        </form>}
    </div>
}