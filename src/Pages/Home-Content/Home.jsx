import {useState, useEffect, useContext} from 'react';
import { PageContext } from '../Context/PageContext';

const Home = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { user, location, setLocation } = useContext(PageContext);
}

export default Home
