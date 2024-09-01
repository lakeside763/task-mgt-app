import { useState, useEffect, useRef } from 'react';
import MobileHeader from './components/layout/MobileHeader';
import Sidebar from './components/layout/Sidebar';
import NonMobileHeader from './components/layout/NonMobileHeader';
import Task from './components/task/Task';
import CreateNewTask from './components/task/CreateNewTask';
import CreateNewGroup from './components/group/CreateNewGroup';
import CreateNewList from './components/list/CreateNewList';
import Footer from './components/layout/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [modalState, setModalState] = useState({
    list: false,
    group: false
  });

  const tasksRefetchRef = useRef<() => void>();
  const groupsRefetchRef = useRef<() => void>();
  const listsRefetchRef = useRef<() => void>()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarVisible(true);
      } else {
        setSidebarVisible(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleTaskModal = () => {
    setShowTaskModal(!showTaskModal);
  };

  const openModal = (type: string) => {
    if (showTaskModal) setShowTaskModal(false);
    setModalState((prevState) => ({
      ...prevState,
      [type]: true
    }));
  };

  const closeModal = (type: string) => {
    setModalState((prevState) => ({
      ...prevState,
      [type]: false
    }))
  }

  // Function to set the refetch function from Task component
  const setTasksRefetch = (refetch: () => void) => {
    tasksRefetchRef.current = refetch;
  };

  const setGroupsRefetch = (refetch: () => void) => {
    groupsRefetchRef.current = refetch;
  }

  const setListsRefetch = (refetch: () => void) => {
    listsRefetchRef.current = refetch;
  }

  return (
    <div className="container">
      <MobileHeader sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
      <Sidebar sidebarVisible={sidebarVisible} openModal={openModal} />

      <main className="main-content">
        <NonMobileHeader />
        <div className='flex flex-col h-full'>
          <Task setTasksRefetch={setTasksRefetch} />
          <Footer />
        </div>
      </main>

      <CreateNewTask 
        showTaskModal={showTaskModal}  
        toggleTaskModal={toggleTaskModal}
        refreshTasks={() => tasksRefetchRef.current?.()}
        setListsRefetch={setListsRefetch}
      />
      <CreateNewList 
        isModalOpen={modalState.list} 
        closeModal={() => closeModal('list')}
        setGroupsRefetch={setGroupsRefetch}
        refetchLists={() => listsRefetchRef.current?.()}
      />
      <CreateNewGroup 
        isModalOpen={modalState.group} 
        closeModal={() => closeModal('group')}
        refectchGroups={() => groupsRefetchRef.current?.()}
      />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </div>
  );
}

export default App;
