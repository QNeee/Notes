import { TextField } from '@mui/material/';
export const Header = ({ value, onChange }) => {
    return <header>
        <div>
            <TextField label="Найти заметку" id="outlined-basic" variant="outlined" type="text" value={value} onChange={(e) => onChange(e.target.value)} /> </div>
    </header>
}