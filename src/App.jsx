import { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import { Moon, Sun } from 'lucide-react';

function App() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [filter, setFilter] = useState('all');
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark' ||
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
        };
        setTodos([newTodo, ...todos]);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = (id, newText) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    };

    const clearCompleted = () => {
        if (window.confirm('Are you sure you want to clear all completed tasks?')) {
            setTodos(todos.filter(todo => !todo.completed));
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const activeCount = todos.filter(todo => !todo.completed).length;
    const hasCompleted = todos.some(todo => todo.completed);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
            {/* Theme Toggle */}
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="fixed top-6 right-6 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 active:scale-90"
                aria-label="Toggle theme"
            >
                {isDarkMode ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                    <Moon className="w-5 h-5 text-slate-700" />
                )}
            </button>

            <div className="container max-w-2xl mx-auto px-4 py-16 md:py-24">
                {/* App Content Card */}
                <div className="max-w-xl mx-auto">
                    <Header />

                    <TodoForm onAdd={addTodo} />

                    <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden transition-all duration-300 animate-slide-up">
                        <div className="p-2 sm:p-4">
                            <TodoList
                                todos={filteredTodos}
                                onToggle={toggleTodo}
                                onDelete={deleteTodo}
                                onEdit={editTodo}
                            />
                        </div>

                        <div className="border-t border-slate-100 dark:border-slate-800/60 p-4">
                            <TodoFilter
                                filter={filter}
                                setFilter={setFilter}
                                activeCount={activeCount}
                                onClearCompleted={clearCompleted}
                                hasCompleted={hasCompleted}
                            />
                        </div>
                    </div>

                    {/* Footer Metadata */}
                    <div className="mt-8 text-center">
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                            My To-Do List v1.0 • Built with React & Tailwind
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
