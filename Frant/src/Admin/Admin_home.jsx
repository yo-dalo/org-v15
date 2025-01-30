import React, { useState, useEffect } from "react";

const Admin_home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    document.body.style.overflow = sidebarOpen ? "" : "hidden";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && sidebarOpen) {
        setSidebarOpen(false);
        document.body.style.overflow = "";
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      {sidebarOpen && (
        <div
          className={`fixed inset-0 bg-indigo-900/50 z-40 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={toggleSidebar}
        />
      )}
      <Header toggleSidebar={toggleSidebar} />
      <div className="pt-16 max-w-7xl mx-auto flex">
        <Sidebar isOpen={sidebarOpen} />
        <MainContent />
      </div>
    </div>
  );
};

const Header = ({ toggleSidebar }) => (
  <header className="fixed w-full bg-white text-indigo-800 z-50 shadow-lg animate-slide-down">
    <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16">
      <button
        className="mobile-menu-button p-2 lg:hidden"
        onClick={toggleSidebar}
      >
        <span className="material-icons-outlined text-2xl">menu</span>
      </button>
      <div className="text-xl font-bold text-blue-900">
        Admin<span className="text-indigo-800">Panel</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block">
          search
        </span>
        <NotificationIcon />
        <img
          className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 object-cover"
          src="https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg"
          alt="Profile"
        />
      </div>
    </div>
  </header>
);

const Sidebar = ({ isOpen }) => (
  <aside
    className={`sidebar fixed lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300 z-45 overflow-y-auto p-4`}
  >
    <Menu title="Main Menu" items={["Home", "Some menu item", "Another menu item"]} />
    <Menu title="Settings" items={["Profile", "Settings", "Log out"]} />
  </aside>
);

const Menu = ({ title, items }) => (
  <div className="bg-white rounded-xl shadow-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mb-6">
    {items.map((item, index) => (
      <a
        href="#"
        className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
        key={index}
      >
        <span className="material-icons-outlined mr-2">dashboard</span>
        {item}
        <span className="material-icons-outlined ml-auto">keyboard_arrow_right</span>
      </a>
    ))}
  </div>
);

const MainContent = () => (
  <main className="flex-1 p-4">
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <StatCard
        bgColor="bg-indigo-100"
        borderColor="border-indigo-200"
        title="Welcome"
        subtitle="Dash"
        badgeText="01:51"
      />
      <StatCard
        bgColor="bg-blue-100"
        borderColor="border-blue-200"
        title="Inbox"
        subtitle="23"
        buttonText="See messages"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <StatsCard key={index} index={index + 1} />
      ))}
    </div>
  </main>
);

const StatCard = ({ bgColor, borderColor, title, subtitle, badgeText, buttonText }) => (
  <div
    className={`${bgColor} ${borderColor} border rounded-xl p-6 animate-fade-in`}
  >
    <h2 className="text-4xl md:text-5xl text-blue-900">
      {title} <br />
      <strong>{subtitle}</strong>
    </h2>
    {badgeText && (
      <span className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800">
        {badgeText}
      </span>
    )}
    {buttonText && (
      <a
        href="#"
        className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform duration-300 hover:scale-105"
      >
        {buttonText}
      </a>
    )}
  </div>
);

const StatsCard = ({ index }) => (
  <div
    className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <h3 className="text-xl font-bold text-indigo-800">Stats Card {index}</h3>
  </div>
);

const NotificationIcon = () => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 ${
        pulse ? "scale-110" : ""
      } hidden md:block`}
    >
      notifications
    </span>
  );
};

export default Admin_home;