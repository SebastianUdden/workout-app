import React from 'react';

export default function Input(props) {
    if (props.input.type === 'submit' || props.input.type === 'button') {
        return (
            <input 
                id={props.input.id}
                style={props.input.style} 
                type={props.input.type}
                value={props.input.value} />
        )
    } else {
        return (
            <input 
                id={props.input.id}
                style={props.input.style} 
                type={props.input.type}
                placeholder={props.input.placeholder} />
        )
    }
}