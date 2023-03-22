import css from './index.module.css';
import { useRouter } from 'next/router';

export default function Timer(){
    const router = useRouter();
    return (
        <div className={css.container}>
            <span 
                className={css.timer}
                onClick={()=>{
                    router.push('twitter');
                }}
            >
                30:00
            </span> 
        </div>
    )
}