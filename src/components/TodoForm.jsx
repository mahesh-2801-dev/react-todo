import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const TodoForm = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedText = text.trim();

        if (!trimmedText) {
            setError('Please enter a task');
            setTimeout(() => setError(''), 3000);
            return;
        }

        onAdd(trimmedText);
        setText('');
        setError('');
    };

    return (
        <div className="w-full max-w-md mx-auto mb-8">
            <form onSubmit={handleSubmit} className="relative">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 group">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder="Add a new task..."
                            className={`w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border ${error ? 'border-destructive ring-destructive' : 'border-slate-200 dark:border-slate-800'
                                } focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-200 shadow-sm group-hover:shadow-md dark:text-slate-100`}
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span>Add Task</span>
                    </button>
                </div>

                {error && (
                    <p className="absolute -bottom-6 left-2 text-xs font-medium text-destructive animate-fade-in">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
};

export default TodoForm;
