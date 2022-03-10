import './footer.css';
import { useEffect, useState } from 'react';

const Footer = () => {
    const [show, setShow] = useState(false);
    const [display, setDisplay] = useState('');

    useEffect(() => {
        if (show) {
            setDisplay('show');
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
                <div className={`popup-box ${display}`}>
                    <a href='https://github.com/skyline502'>GitHub: Skyline502</a>
                    <img src='https://avatars.githubusercontent.com/u/93230132?v=4' />
                </div>
            </div>
            <div>REACT</div>
            <div>REDUX</div>
            <div>NODEJS</div>
            <div>EXPRESS</div>
            <div>POSTGRES</div>
            <div>SEQUELIZE</div>
            <div>CSS</div>
        </div>
    )
}

export default Footer;