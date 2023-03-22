import css from './NavBar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import GogglesIcon from '../public/GogglesIcon.png';

export default function NavBar(props){
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