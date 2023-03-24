import css from './NavBar.module.css';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GogglesIcon from '../public/GogglesIcon.png';

import { ProgressContext } from '@/context/ProgressContext';

export default function NavBar(props){

    const { pathBlueUnlocked } = useContext(ProgressContext);
    const router = useRouter();
    
    return (
        <div className={css.navBarContainer}>
            <div className={css.iconContainer}
                onClick={()=>{
                    pathBlueUnlocked(0);
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