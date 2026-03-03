import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const TodoFilter = ({ filter, setFilter, activeCount, onClearCompleted, hasCompleted }) => {
    const filters = ['all', 'active', 'completed'];

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/50">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {activeCount} {activeCount === 1 ? 'item' : 'items'} left
            </span>

            <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                            "px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-200",
                            filter === f
                                ? "bg-primary text-white shadow-sm"
                                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <button
                onClick={onClearCompleted}
                disabled={!hasCompleted}
                className={cn(
                    "text-xs font-semibold text-destructive/80 hover:text-destructive transition-colors disabled:opacity-0 disabled:cursor-not-allowed",
                    !hasCompleted && "pointer-events-none"
                )}
            >
                Clear Completed
            </button>
        </div>
    );
};

export default TodoFilter;
