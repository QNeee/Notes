import { useState } from "react"

export const Redactor = (props) => {
    const date = new Date().getTime();
    const id = props.node.map(item => item.id).join("");
    const [form, setForm] = useState({ id: id, name: '', date: date, text: '', isEdit: true });
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
        <form onSubmit={handleSubmit}>
            <label>Имя заметки
                <input type="text" name="name" onChange={handleInput} value={form.name} />
            </label>
            <label>Текст заметки
                <input type="text" name="text" onChange={handleInput} value={form.text} />
            </label>
            <button type="submit">Add Note</button>
        </form></div>
}