

export const Sidebar = ({ nodes, onClick }) => {
    return <aside>
        {nodes.length > 0 ? nodes.map(item => <div onClick={(e) => onClick(item)} key={item.id}><h1>{item.name}</h1>
            <p>{item.text}</p><p>{item.date}</p></div>) : <div>No nodes</div>}
    </aside>
}