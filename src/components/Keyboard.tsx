import * as React from 'react';

interface IKeyboardProps {
  onClick: (letter: string) => void,
  onClose: () => void
}

const Keyboard: React.FunctionComponent<IKeyboardProps> = (props) => {
  const letters = 'А.Б.В.Ы.А.Б.В.Ы.А.Б.В.Ы.А.Б.В.Ы.А.Б.В.Ы.А.Б.В.Ы.А.Б.В.Ы.А.Б.В.Ы.А.Б.В.Ы'
  return <>
    <div className='keyboard-container'>
      {letters.split('.').map(l => {
        return <button onClick={_ => props.onClick(l)}>{l}</button>
      })}
    </div>
  </>;
};

export default Keyboard;
