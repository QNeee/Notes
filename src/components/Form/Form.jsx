import { useState } from "react"
export const Form = (props) => {
    const [modal, setModal] = useState({ isToggle: false });
    const date = new Date().getTime();
    const [form, setForm] = useState({ name: '', date: date, text: '' });
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
    }
    return <div>
        <button type="button" onClick={handleClick}>Add Node</button>
        {modal.isToggle && <form onSubmit={handleSubmit}>
            <label>Имя заметки
                <input type="text" name="name" onChange={handleInput} value={form.name} />
            </label>
            <label>Текст заметки
                <input type="text" name="text" onChange={handleInput} value={form.text} />
            </label>
            <button type="submit">Add Note</button>
        </form>}</div>
}