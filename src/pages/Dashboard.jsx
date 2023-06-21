import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import GeneralStore from '../store/GeneralContext.jsx';
import QuestionsOfWeek from '../components/QuestionsOfWeek.jsx';
import UserPanel from '../components/UserPanel.jsx';
import Feed from '../components/Feed.jsx';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* heading */}
      <div
        style={{
          backgroundColor: '#23272f',
          color: 'white',
          borderBottom: 'solid 3px #149eca',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Dashboard</h1>
        {/* {userData ? <h2>Welcome, {userData[0].userName}</h2> : ""} */}
      </div>

      {/* content of dashboard page */}
      <div
        className="container flex-col p-6 md:p-0 justify-around"
        style={{
          backgroundColor: '#23272f',
          color: 'white',
        }}
      >
        <nav>
          <ul>
            <li
              className={activeTab === 'Feed' ? 'active' : ''}
              onClick={() => handleTabClick('Feed')}
            >
              Feed
            </li>
            <li
              className={activeTab === 'Questions' ? 'active' : ''}
              onClick={() => handleTabClick('Questions')}
            >
              Questions
            </li>
            <li
              className={activeTab === 'UserPanel' ? 'active' : ''}
              onClick={() => handleTabClick('UserPanel')}
            >
              User panel
            </li>
          </ul>
        </nav>

        {activeTab === 'Feed' && <Feed />}
        {activeTab === 'Questions' && <QuestionsOfWeek />}
        {activeTab === 'UserPanel' && <UserPanel />}
      </div>
    </>
  );
}