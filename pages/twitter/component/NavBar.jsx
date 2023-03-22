import css from './NavBar.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import GogglesIcon from '../public/GogglesIcon.png';

export default function NavBar(props){
    const router = useRouter();
    return (
        <div className={css.navBarContainer}>
            <div className={css.iconContainer}
                onClick={()=>{
                    router.push('/google');
                }}
            >
                <Image
                    src={GogglesIcon}
                    fill
                />
            </div>
        </div>
    )
}