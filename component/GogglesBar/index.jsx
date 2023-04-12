import css from './index.module.css';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GogglesIcon from '@/public/twitter/GogglesIcon.png';

import { ProgressContext } from '@/context/ProgressContext';

export default function NavBar(props){

    const { pathUnlocked } = useContext(ProgressContext);
    const router = useRouter();
    
    return (
        <div className={css.navBarContainer}>
            <div className={css.iconContainer}
                onClick={()=>{
                    pathUnlocked(1 , 'blue');
                    router.push('/google');
                }}
            >
                <Image
                    alt={'goggles icon'}
                    src={GogglesIcon}
                    fill
                />
            </div>
        </div>
    )
}