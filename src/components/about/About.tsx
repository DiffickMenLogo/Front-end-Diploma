import { AboutCard } from './AboutCard';
import '../../style/about/About.scss';
import diffick from '../../assets/aboutImages/diffick.jpg';
import grmlin from '../../assets/aboutImages/89806421.jpg';
import maxim from '../../assets/aboutImages/70817598.png';
import yulia from '../../assets/aboutImages/yliya.jpg';

export function About() {
    return (
        <div className='about'>
            <div className='about__container'>
                <div className='about__title'><h1>О нашей команде</h1></div>
                <div className='about__cards'>
                    <div className="about__cards__grid">
                        <AboutCard currentImage={diffick} currentText={'Разработал Back-end , Настройки , Профиль и О команде. Принимал участие в разработке статистики.'} currentTitle={'Фиштик Илья'} />
                        <AboutCard currentImage={yulia} currentText={'Разработала Учебник. Создала базовый дизайн приложения. Принимала участие в разработке статистики.'} currentTitle={'Наумчик Юлия'} />
                    </div>
                    <div className="about__cards__grid">
                        <AboutCard currentImage={grmlin} currentText={'Создал начальное react приложение. Настроил Eslint. Разработал Мини-игры. Принимал участие в разработке статистики.'} currentTitle={'Сидельников Андрей'} />
                        <AboutCard currentImage={maxim} currentText={'Самый крутой ментор!!!'} currentTitle={'Максим Андреев'} />
                    </div>
                </div>
            </div>
            
        </div>
    );
}