import React, {useCallback, useEffect, useState} from 'react';

function PassField(onFocusChange: any) {
    const elementRef = React.useRef<any>(null)

    const [content, setContent] = useState<{ string: string, isBackspace: boolean }>({string: "", isBackspace: false})
    type charObj = {
        character: string,
        width: number
    }
    const [pointerLeft, setPointerLeft] = useState<number>(0)
    const [character, setCharacter] = useState<Array<charObj>>([])
    const [selectedChar, setSelectedChar] = useState<number>(0)

    const setInputTrue = useCallback(() => {
        onFocusChange.onFocusChange(true)
    }, [onFocusChange.onFocusChange])
    const setInputFalse = useCallback(() => {
        onFocusChange.onFocusChange(false)
    }, [onFocusChange.onFocusChange])

    function addWord(event: any) {
        event.preventDefault();
        if (event.key.length === 1) {
            if (event.key === " ")
                setContent({string: content.string + "\u00A0", isBackspace: false})
            else
                setContent({string: content.string + event.key, isBackspace: false})

        } else if (event.key === "Backspace") {
            setContent({string: content.string.slice(0, -1), isBackspace: true})
        } else if (event.key === "ArrowLeft") {
            if (selectedChar > 0)
                setSelectedChar(selectedChar - 1)
        } else if (event.key === "ArrowRight") {
            if (selectedChar < character.length - 1)
                setSelectedChar(selectedChar + 1)

        }


    }

    useEffect(() => {
        if (content.string !== "") {
            if (!content.isBackspace) {
                setSelectedChar(selectedChar + 1)
                let width = 0
                character.forEach(char => {
                    width += char.width
                })
                setCharacter(prevCharacter => [...prevCharacter, {
                    character: content.string.slice(-1),
                    width: (prevCharacter[prevCharacter.length - 1] !== undefined) ? elementRef.current.offsetWidth - width : elementRef.current.offsetWidth
                }]);
            } else {
                if (selectedChar > 0) {
                    setSelectedChar(selectedChar - 1)
                    character.pop()
                }
            }
        }
    }, [content]);

    useEffect(() => {
        let finalPointerLeft = 0
        for (let i = 0; i <= selectedChar && i < character.length; i++) {
            finalPointerLeft += character[i].width
        }
        setPointerLeft(finalPointerLeft)

    }, [selectedChar])


    function debug() {
        console.log(character)
    }


    return (
        <div id="pass-container" onClick={debug}>
            <div id="pass-field" tabIndex={0} onKeyDown={addWord} onFocus={setInputTrue} onBlur={setInputFalse}>
                <div id="content-container" ref={elementRef}>
                    <div className="pointer" style={{transform: `translateX(${pointerLeft}px)`}}></div>
                    {content.string}</div>
            </div>
        </div>
    );


}

export default PassField;
