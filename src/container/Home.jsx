import React, {useState, useRef, useEffect} from 'react';
import {HiMenu} from 'react-icons/hi';
import {AiFillCloseCircle} from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { userQuery } from '../utils/data';
import { client } from '../utils/client';
import { fetchUser } from '../utils/fetchUser';

import Pins from './Pins';
import {Sidebar, UserProfile} from '../components/index';

import logo from '../assets/logo.png';

const Home = () => {
  const scrollRef = useRef(null)
  const [user, setUser] = useState(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const userInfo = fetchUser();


  useEffect(() => {
    const query = userQuery(userInfo?.id);
    
    client.fetch(query)
    .then((data) => {
      setUser(data[0]);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.id]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);
  

  return (
    <div className='flex md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-inital'>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)}/>
          <Link to='/'>
            <img src={logo} alt='logo' className='w-28'/>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt='logo' className='w-20 rounded-full'/>
          </Link>
        </div>
        {toggleSidebar && (
          <div className='fixed w-4/5 bg-default h-screen overflow-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)}/>
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
          </div>
        )}
      </div>
      <div className='pb-2 flex-1 bg-default h-screen overflow-y-scroll' ref={scrollRef}>
          <Routes>
            <Route path='/user-profile/:userId' element={<UserProfile/>}/>
            <Route path='/*' element={<Pins user={user && user}/>}/>
          </Routes>
      </div>
    </div>
  )
}

export default Home