
export const Header = ({ value, onChange }) => {
    return <header>
        <div>
            <label>Search Node
                <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
            </label> </div>
    </header>
}