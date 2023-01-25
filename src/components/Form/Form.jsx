import { Button, TextField } from '@mui/material/';
import { Context } from 'components/context';
import { useContext } from 'react';
export const Form = () => {
    const { handleSubmit, handleInput, form, modalHeader } = useContext(Context);
    return <div>
        {/* <Button type="button" variant="contained" onClick={handleClick}>Add Node</Button> */}
        {modalHeader.isToggle && <form onSubmit={handleSubmit}>
            <TextField label="Имя заметки" id="outlined-basic" variant="outlined" type="text" name="name" onChange={handleInput} value={form.name} />
            <TextField label="Текс заметки" id="outlined-basic" variant="outlined" type="text" name="text" onChange={handleInput} value={form.text} />
            <Button type="submit" variant="contained">Add Note</Button>
        </form>}</div>
}