import './footer.css';
import { useEffect, useState } from 'react';

const Footer = () => {
    const [show, setShow] = useState(false);
    const [display, setDisplay] = useState('');

    useEffect(() => {
        if (show) {
            setDisplay('show-info');
        } else {
            setDisplay('');
        }
    }, [show]);

    return (
        <div className="footer-container">
            <div className='popup'>
                <div className='pop-up-button' onClick={() => setShow(!show)}>
                    ABOUT
                </div>
                <div className={`popup-box ${display}`} onMouseLeave={() => setShow(!show)}>
                    <div className='links-profile'>
                        <a href='https://github.com/skyline502'><img style={{width:30}} src='/images/github.png'/></a>
                        <a href='https://www.linkedin.com/in/johnny-san-a98b43218'><img style={{width:30}} src='/images/linkedin.png'/></a>
                        <a href='https://the-best-stuck-overflow.herokuapp.com/'><img style={{width:30, borderRadius: 5}} src='/images/group.svg'/></a>
                    </div>
                    <img src='https://avatars.githubusercontent.com/u/93230132?v=4' />
                </div>
            </div>
            <div className='technologies'>CREATED WITH:<img style={{marginLeft: 10,height: 28}} src='/images/technologies.png' /><img style={{height: 25}} src='/images/sequelize.png'></img></div>
            <div></div>
        </div>
    )
}

export default Footer;
