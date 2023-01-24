import { Container } from "./Notes.styled"
import { Button } from '@mui/material/';
export const Notes = ({ node, onClickDelete, onClickRedactor }) => {
    return <Container>
        {node.length > 0 ? node.map(item => <div key={item.id}><h1>{item.name}</h1><Button variant="contained" onClick={(e) => onClickDelete(item.id)} type="button">Delete</Button><Button variant="contained" onClick={() => onClickRedactor(item)} type="button">Redactor</Button></div>) : <h1>Choose Note</h1>}
    </Container>
}