import { Aside, NodeContainer, TextContainer, H3, H1 } from "./Sidebar.styled"
import { Context } from 'components/context';
import { useContext } from 'react';
export const Sidebar = () => {
    const { getFilteredNodes, onClick } = useContext(Context);
    return <Aside>
        {getFilteredNodes().length > 0 ? getFilteredNodes().map(item => <NodeContainer onClick={(e) => onClick(item)} key={item.id}><H1>{item.name}</H1>
            <TextContainer><H3>{item.text}</H3>{!item.isEdit ? <p>Created at : {item.date}</p> : <p>Edited at : {item.date}</p>}</TextContainer></NodeContainer>) : <h1>No notes</h1>}
    </Aside>
}