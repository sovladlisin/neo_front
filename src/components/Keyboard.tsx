import * as React from 'react';

interface IKeyboardProps {
  onClick: (letter: string) => void,
  onClose: () => void
}

const Keyboard: React.FunctionComponent<IKeyboardProps> = (props) => {
  const letters = 'ӑ.ӱ.ў.ӧ.ө.є.ә.i.ү.ң.ӈ.ҥ.њ.қ.ӄ.ғ.ӌ.һ.č.ӆ.ԓ.љ.ʔ.ʕ.Ӱ.ӱ.Ö.ӧ.Ҥ.ҥ.Ғ.ғ.Ң.ң.I.i.Қ.қ.Һ.H.Ү.ү.Ө.ɵ.Č.č.ʔ.ʕ.Ӄ.ӄ.Ӈ.ӈ.ә'


  return <>
    <div className='keyboard-container'>
      {letters.split('.').map(l => {
        return <button onClick={_ => props.onClick(l)}>{l}</button>
      })}
    </div>
  </>;
};

export default Keyboard;
