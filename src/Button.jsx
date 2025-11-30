import { useState } from 'react';

function Button() {
    const [text, setText] = useState('');

    const handleClick = () => {
        setText('Button was clicked!');
    };

    return (
        <div>
            <button onClick={handleClick}>Click Me</button>
            {text && <p>{text}</p>}
        </div>
    );
}

export default Button;