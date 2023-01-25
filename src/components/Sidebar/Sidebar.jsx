import { Aside, NodeContainer } from "./Sidebar.styled"
import { Context } from 'components/context';
import { useContext } from 'react';
export const Sidebar = () => {
    const { getFilteredNodes, onClick } = useContext(Context);
    return <Aside>
        {getFilteredNodes().length > 0 ? getFilteredNodes().map(item => <NodeContainer onClick={(e) => onClick(item)} key={item.id}><h1>{item.name}</h1>
            <p>{item.text}</p><p>{item.date}</p></NodeContainer>) : <div>No nodes</div>}
    </Aside>
}