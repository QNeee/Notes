import { useState } from "react"
export const Header = () => {
    const [inputValue, setInputValue] = useState('');
    const handleInput = (e) => {
        setInputValue(e.target.value);
    }
    return <header>
        <div>
            <input type="text" name="text" value={inputValue} onChange={handleInput} />
        </div>
    </header>
}