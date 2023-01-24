import { Container } from "./Notes.styled"

export const Notes = ({ node }) => {
    return <Container>
        {node.length > 0 ? node.map(item => <div key={item.id}><h1>{item.name}</h1></div>) : <h1>Choose Note</h1>}
    </Container>
}