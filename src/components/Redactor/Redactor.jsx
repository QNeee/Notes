
import { Button, TextField } from '@mui/material/';
import { Context } from 'components/context';
import { useContext } from 'react';
export const Redactor = () => {
    const { onClose, redactorSubmit, handleInput, form } = useContext(Context);
    return <div>
        <form onSubmit={redactorSubmit}>
            <TextField label="Имя заметки" id="outlined-basic" variant="outlined" type="text" name="name" onChange={handleInput} value={form.name} />
            <TextField label="Текс заметки" id="outlined-basic" variant="outlined" type="text" name="text" onChange={handleInput} value={form.text} />
            <Button type="submit" variant="contained">edit</Button>
            <Button variant="contained" onClick={onClose} type="button">Cancel</Button>
        </form>
    </div>
}