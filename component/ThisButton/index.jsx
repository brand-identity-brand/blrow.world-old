import css from './index.module.css';
import Image from 'next/image'
import thisButton from '@/public/portal/thisButton.png';
import thisButtonPressed from '@/public/portal/thisButtonPressed.png';
import { useState, useEffect } from 'react';

export default function ThisButton(props){
    const { onClick, className } = props;
    const [ isButtonPressed, setIsButtonPressed ] = useState(false);

    useEffect(()=>{
      if ( isButtonPressed ){
        onClick();
      }
    },[isButtonPressed])
  
  
    return (
    <div className={`${css.bot} ${className}`}>
  
      <div 
        style={isButtonPressed
          ? { visibility: 'hidden' }
          : {}
        }
        className={css.thisButtonContainer}
        onMouseDown={()=>{
          setIsButtonPressed(true);
        }}
        // onClick={onClick}
      >
        <Image
          draggable={false}
          src={thisButton}
          alt={'THIS button'}
          fill
        />
      </div>
      
      <div 
        className={css.thisButtonPressedContainer }
      >
        <Image
          draggable={false}
          src={thisButtonPressed}
          alt={'THIS button'}
          fill
        />
      </div>
  
    </div>
    )
}