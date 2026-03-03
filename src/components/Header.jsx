import React from 'react';

const Header = () => {
    return (
        <header className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                My To-Do List
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium">
                Stay productive every day
            </p>
        </header>
    );
};

export default Header;
