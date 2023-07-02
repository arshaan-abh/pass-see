import React, {useEffect, useState} from 'react';
import {type} from "os";

function TheEye(isFocused: any = false) {
    const [x, setX] = useState(0)

    const [y, setY] = useState(0)

    const [blink, setBlink] = useState<boolean>(false)

    document.addEventListener("mousemove", theIrisMovement)
    const xRatio = 80 / window.innerWidth
    const yRatio = 40 / window.innerHeight

    function theIrisMovement(event: MouseEvent) {
        const xFinal = event.pageX * xRatio
        const yFinal = event.pageY * yRatio
        setX(xFinal - 40)
        setY(yFinal - 20)
    }

    useEffect(() => {    setInterval(() => {
        setBlink(true)
        setTimeout(() => {
            setBlink(false)
        }, 500)
    }, 3000)
    }, []);

    return (
        <div id="the-eye-container">
            <div id="the-lid-shadow">
                <div id="the-lid">
                    <div id="the-eyelash" style={{height: blink ? "1px" : isFocused.isFocused ? "3rem" : "5rem"}}>
                        <div id="the-white">
                            <div id="the-iris" style={{transform: `translate(${x}px, ${y}px)`}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TheEye;
