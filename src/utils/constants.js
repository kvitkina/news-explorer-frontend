import InstagramIcon from '../components/icons/InstagramIcon';
import GithabIcon from '../components/icons/GithabIcon';
import image_1 from '../images/card/card/image_08.png';
import image_2 from '../images/card/card/image_04.png';
import image_3 from '../images/card/card/image_07.png';

export const links = {
  praktikum: 'https://praktikum.yandex.ru',
};

export const socialIcons = [
  {
    Icon: GithabIcon,
    link: 'https://github.com/kvitkina',
    id: '0',
  },
  {
    Icon: InstagramIcon,
    link: 'https://www.instagram.com/kvitkina',
    id: '1',
  },
];

export const articles = [
  {
    image: image_1,
    date: '2 августа, 2019',
    title: 'Национальное достояние – парки',
    subtitle: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
    link: 'Лента.ру',
    href: 'https://lenta.ru/',
    id: '1'
  },
  {
    image: image_3,
    date: '3 августа, 2019',
    title: 'Лесные огоньки: история одной фотографии',
    subtitle: 'Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.',
    link: 'Медуза',
    href: 'https://meduza.io/',
    id: '2'
  },
  {
    image: image_2,
    date: '4 августа, 2019',
    title: 'Лесные огоньки: история одной фотографии',
    subtitle: 'Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.',
    link: 'Риа',
    href: 'https://ria.ru/',
    id: '3'
  },
]