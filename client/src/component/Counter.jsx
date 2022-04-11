import React, { useState } from 'react';

function Counter() {
    
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }

    
    return ( 
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Inc</button>
            <button onClick={decrement}>Dec</button>
        </div>
     );
}

export default Counter;