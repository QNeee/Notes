import { useState } from "react"
import { Button, TextField } from '@mui/material/';
export const Form = (props) => {
    const [modal, setModal] = useState({ isToggle: false });
    const date = new Date();
    const time = (date.getHours() + ':' + date.getMinutes());
    const [form, setForm] = useState({ name: '', date: time, text: '', isEdit: false });
    const handleClick = (e) => {
        setModal({ isToggle: !modal.isToggle })
    }
    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(form);
        setForm({ name: '', date: time, text: '', isEdit: false });
        return setModal({ isToggle: false });
    }
    return <div>
        <Button type="button" variant="contained" onClick={handleClick}>Add Node</Button>
        {modal.isToggle && <form onSubmit={handleSubmit}>

            <TextField label="Имя заметки" id="outlined-basic" variant="outlined" type="text" name="name" onChange={handleInput} value={form.name} />


            <TextField label="Текс заметки" id="outlined-basic" variant="outlined" type="text" name="text" onChange={handleInput} value={form.text} />

            <Button type="submit" variant="contained">Add Note</Button>
        </form>}</div>
}