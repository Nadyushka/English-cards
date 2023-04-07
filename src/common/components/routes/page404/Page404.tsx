import React from 'react';
import s from './Page404.module.css'
import page404Img from '../../../assets/pictures/error.svg'

const Page404 = () => {
    return (
        <div className={s.page404}>
            <div className={s.page404_container}>
                <div className={s.page404_body}>
                    <img src={page404Img} alt={'404 error image'}/>
                    <div className={s.page404_info}>
                        <p>ERROR 404: </p>
                        <p>page was not found</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Page404;