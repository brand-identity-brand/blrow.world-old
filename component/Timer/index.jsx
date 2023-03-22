import css from './index.module.css';

export default function Timer(){
    return (
        <div className={css.container}>
           <span className={css.timer}>30:00</span> 
        </div>
    )
}