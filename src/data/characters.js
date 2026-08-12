import narutoImg from '../assets/naruto.jpg';
import tanjiroImg from '../assets/tanjiro.jpg';
import luffyImg from '../assets/luffy.jpg';
import rengokuImg from '../assets/rengoku.jpg';


export const CHARACTERS = [
  {
    id: 'naruto',
    name: 'Naruto Uzumaki',
    anime: 'Naruto',
    tags: ['Determinação', 'Força', 'Nunca desiste'],
    image: narutoImg,
    bgGradient: 'from-purple-900/50 via-slate-900 to-purple-950',
    quote: '“O fracasso não é razão para você desistir, desde que continue acreditando.”',
    author: 'Naruto Uzumaki',
    times: { focus: 25, shortBreak: 5, longBreak: 15 },
  },
  {
    id: 'tanjiro',
    name: 'Tanjiro Kamado',
    anime: 'Demon Slayer',
    tags: ['Bondade', 'Coragem', 'Foco'],
    image: tanjiroImg,
    bgGradient: 'from-emerald-900/50 via-slate-900 to-slate-950',
    quote: '“Siga em frente! Conduza a si mesmo!”',
    author: 'Tanjiro Kamado',
    times: { focus: 25, shortBreak: 5, longBreak: 15 },
  },
  {
    id: 'luffy',
    name: 'Monkey D. Luffy',
    anime: 'One Piece',
    tags: ['Liberdade', 'Amizade', 'Sonhos'],
    image: luffyImg,
    bgGradient: 'from-amber-900/50 via-slate-900 to-slate-950',
    quote: '“Se você não arriscar, não poderá criar um futuro!”',
    author: 'Monkey D. Luffy',
    times: { focus: 25, shortBreak: 5, longBreak: 15 },
  },
  {
  id: 'rengoku',
  name: 'Kyojuro Rengoku',
  anime: 'Demon Slayer',
  tags: ['Entusiasmo', 'Paixão', 'Determinação'],
  image: rengokuImg, 
  bgGradient: 'from-orange-950/60 via-slate-900 to-red-950',
  quote: '“Se estiver se sentindo desmotivado, ou sentindo que não é bom o suficiente, incendeie o seu coração. Enxugue as lágrimas e siga em frente.”',
  author: 'Kyojuro Rengoku',
  times: { focus: 25, shortBreak: 5, longBreak: 15 },
}
];