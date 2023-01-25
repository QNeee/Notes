import { Container } from "./Notes.styled"
import { Button } from '@mui/material/';
import { Context } from 'components/context';
import { useContext } from 'react';
export const Notes = () => {
    const { node, onClickDelete, onClickRedactor } = useContext(Context);
    console.log(node);
    return <Container>
        {node.length > 0 ? node.map(item => <div key={item.id}><h1>{item.name}</h1><h3>{item.text}</h3><Button variant="contained" onClick={(e) => onClickDelete(item.id)} type="button">Delete</Button><Button variant="contained" onClick={() => onClickRedactor(item)} type="button">Redactor</Button></div>) : <h1>Choose Note</h1>}
    </Container>
}