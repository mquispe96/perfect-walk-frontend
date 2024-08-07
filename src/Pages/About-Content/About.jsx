import {Link} from 'react-router-dom';
import profile from '/public/profile.jpeg';
import './Styling/about.css';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <main className='about-container'>
      <section className='about-container__image'>
        <img src={profile} alt='profile' />
      </section>
      <section className='about-container__info'>
        <h2>Personal Info</h2>
        <p>Name: Marco Roberto Quispe</p>
        <p>Age: 28</p>
        <p>Mobile: 860-308-3996</p>
        <p>Email: mquispe@pursuit.org</p>
        <p>Programming Languages: Javascript, Express, SQL, C++, and a fair undersatnding of others...</p>
        <div className='profile-links'>
          <Link to='https://github.com/mquispe96'><FaGithub /></Link>
          <Link className='linkedin' to='https://www.linkedin.com/in/marco-quispe-a88b3a14a/'><FaLinkedin /></Link>
        </div>
      </section>
      <section className='about-container__bio'>
        <h2>Bio</h2>
        <p>I'm a Peruvian American Software Developer, with a degree on Computer Engineering and Technology from the University of Hartford. My love for tech started back in high school, where I submerged myself in robotics and some basic web development. My first programming language was Arduino, which is base on C++. Arduino allowed me to explore robotics, which helped me with my creativity and my problem solving skils. Later, in college, I learned more about computer circuiting and computer programming. Some of the languages I was exposed to were: more C++, C#, Java, MatLab. I did had some exposured to Frontend Web Development, where I learned more Javascript, HTML, and CSS. I also learned how to physically and virtually setup servers, its routers and switches. Currently, I dived in again into the tech world, but this time with a complete focus on Full Stack Web Development. I had the chance to applied my previous knowledge into what I'm currently learning, and at the same time learn completely new programming languages. It has been a lot of work, but it will always be worth it.</p>
      </section>
    </main>
  );
}

export default About
