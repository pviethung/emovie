import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type TTab = {
  tabs: {
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
  }[];
};

export const Tab = ({ tabs }: TTab) => {
  const [currentTab, setCurrentTab] = useState(0);
  const tabTitles: React.ReactNode[] = [];
  const tabContents: React.ReactNode[] = [];

  tabs.forEach((tab, idx) => {
    tabTitles.push(
      <button
        key={tab.id}
        onClick={() => setCurrentTab(idx)}
        className={clsx('tab tab-lifted', { 'tab-active': idx === currentTab })}
      >
        {tab.title}
      </button>
    );

    if (idx === currentTab)
      tabContents.push(
        <motion.div
          key={tab.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {tab.content}
        </motion.div>
      );
  });

  return (
    <div>
      <div className="tabs">{tabTitles}</div>
      <div className={clsx('tab-content')}>
        <AnimatePresence>{tabContents}</AnimatePresence>
      </div>
    </div>
  );
};
