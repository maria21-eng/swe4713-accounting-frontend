import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import RegistrationRequestScreen from './components/RegistrationRequestScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import PlaceholderScreen from './components/PlaceholderScreen';
import { IconLogo, IconDashboard, IconChartOfAccounts, IconJournal, IconReports, IconUsers, IconHelp, IconLogout } from './components/Icons';

function App() {
    const [user, setUser] = useState(null);
    const [page, setPage] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loginView, setLoginView] = useState('login');

    const mockUsers = {
        'meriam': { email: 'admin@ledgerify.com', fullName: 'Meriam', role: 'Administrator', status: 'Active', passwordExpires: '2025-12-25', securityQuestion1: 'What was your first pet\'s name?', securityAnswer1: 'Leo', securityQuestion2: 'In what city were you born?', securityAnswer2: 'Atlanta' },
        'shams': { email: 'manager@ledgerify.com', fullName: 'Shams', role: 'Manager', status: 'Active', passwordExpires: '2026-09-18', securityQuestion1: 'In what city were you born?', securityAnswer1: 'Atlanta', securityQuestion2: 'What is your mother\'s maiden name?', securityAnswer2: 'Jones' },
        'constant': { email: 'accountant@ledgerify.com', fullName: 'Constant', role: 'Accountant', status: 'Inactive', passwordExpires: '2026-01-10', securityQuestion1: 'What is your mother\'s maiden name?', securityAnswer1: 'Jones', securityQuestion2: 'What was the model of your first car?', securityAnswer2: 'Civic' },
        'dj': { email: 'dj@example.com', fullName: 'DJ', role: 'Accountant', status: 'Suspended', suspendUntil: '2025-10-01', passwordExpires: '2025-11-11', securityQuestion1: 'What was the model of your first car?', securityAnswer1: 'Civic', securityQuestion2: 'What is your favorite color?', securityAnswer2: 'Blue' },
        'alix': { email: 'alix@example.com', fullName: 'Alix', role: 'Accountant', status: 'Active', passwordExpires: '2026-08-01', securityQuestion1: 'What was the model of your first car?', securityAnswer1: 'G-Wagon', securityQuestion2: 'What is your favorite book?', securityAnswer2: 'Dune' },
    };
    
    const login = (username) => {
        const userData = mockUsers[username.toLowerCase()];
        if (userData && (userData.status === 'Active' || (userData.status === 'Suspended' && userData.suspendUntil && new Date() > new Date(userData.suspendUntil)))) {
            setUser({ username, ...userData });
            setLoginView('login');
            return undefined;
        } else {
            return userData?.status || 'Invalid';
        }
    };

    const logout = () => {
        setUser(null);
        setPage('dashboard');
    };

    if (!user) {
        if (loginView === 'register') {
            return <RegistrationRequestScreen setLoginView={setLoginView} />;
        }
        if (loginView === 'forgot') {
            return <ForgotPasswordScreen setLoginView={setLoginView} mockUsers={mockUsers} />;
        }
        return <LoginScreen onLogin={login} setLoginView={setLoginView} mockUsers={mockUsers} />;
    }
    
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', roles: ['Administrator', 'Manager', 'Accountant'] },
        { id: 'accounts', label: 'Chart of Accounts', icon: 'accounts', roles: ['Administrator', 'Manager', 'Accountant'] },
        { id: 'journal', label: 'Journal Entries', icon: 'journal', roles: ['Administrator', 'Manager', 'Accountant'] },
        { id: 'reports', label: 'Financial Reports', icon: 'reports', roles: ['Administrator', 'Manager', 'Accountant'] },
        { id: 'users', label: 'User Management', icon: 'users', roles: ['Administrator'] },
        { id: 'help', label: 'Help', icon: 'help', roles: ['Administrator', 'Manager', 'Accountant'] },
    ];

    const allowedNavItems = navItems.filter(item => user && item.roles.includes(user.role));

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <aside className={`bg-emerald-500 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
                <div className="flex items-center space-x-2 px-4">
                    <IconLogo className="w-10 h-10"/>
                    <span className="text-xl font-bold">Ledgerify</span>
                </div>
                <nav>
                    {allowedNavItems.map(item => (
                        <button key={item.id} onClick={() => { setPage(item.id); setIsMobileMenuOpen(false); }}
                            className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${page === item.id ? 'bg-gray-900' : ''} w-full text-left`}>
                            {item.icon === 'dashboard' && <IconDashboard className="w-5 h-5" />}
                            {item.icon === 'accounts' && <IconChartOfAccounts className="w-5 h-5" />}
                            {item.icon === 'journal' && <IconJournal className="w-5 h-5" />}
                            {item.icon === 'reports' && <IconReports className="w-5 h-5" />}
                            {item.icon === 'users' && <IconUsers className="w-5 h-5" />}
                            {item.icon === 'help' && <IconHelp className="w-5 h-5" />}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="absolute bottom-0 w-full p-4 left-0">
                    <button onClick={logout} className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 w-full text-left">
                        <IconLogout className="w-5 h-5" /><span>Logout</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white border-b-2 border-gray-200">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-500 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize">{page.replace('_', ' ')}</h1>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                           <span className="text-gray-600 font-semibold">{user.fullName}</span>
                           <span className="text-gray-400 text-sm block">{user.role}</span>
                        </div>
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.fullName.charAt(0)}
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
                    {page === 'dashboard' && <Dashboard user={user} mockUsers={mockUsers} />}
                    {page === 'accounts' && <PlaceholderScreen title="Chart of Accounts" message="Chart of Accounts module under construction for Sprint 1." />}
                    {page === 'journal' && <PlaceholderScreen title="Journal Entries" message="Journal Entries module under construction for Sprint 1." />}
                    {page === 'reports' && <PlaceholderScreen title="Financial Reports" message="Financial Reports module under construction for Sprint 1." />}
                    {page === 'users' && <UserManagement mockUsers={mockUsers} />}
                    {page === 'help' && <PlaceholderScreen title="Help" message="Help Center module under construction for Sprint 1." />}
                </main>
            </div>
        </div>
    );
}

export default App;
