import { Container } from "./Notes.styled"

export const Notes = ({ node, onClickDelete, onClickRedactor }) => {
    return <Container>
        {node.length > 0 ? node.map(item => <div key={item.id}><h1>{item.name}</h1><button onClick={(e) => onClickDelete(item.id)} type="button">Delete</button><button onClick={() => onClickRedactor(item)} type="button">Redactor</button></div>) : <h1>Choose Note</h1>}
    </Container>
}