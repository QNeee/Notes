import { useState } from "react"

export const Redactor = (props) => {
    const date = new Date();
    const time = (date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
    const id = props.node.map(item => item.id).join("");
    const [form, setForm] = useState({ id: id, name: '', date: time, text: '', isEdit: true });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.name === "" || form.text === "") return alert("alo");
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