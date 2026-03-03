import React, { useState } from 'react';
import { Trash2, Edit2, Check, X, Save } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleSave = () => {
        if (editText.trim()) {
            onEdit(todo.id, editText.trim());
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditText(todo.text);
        setIsEditing(false);
    };

    return (
        <div className={cn(
            "group flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl transition-all duration-300 hover:shadow-md animate-fade-in",
            todo.completed && "opacity-60 bg-slate-50 dark:bg-slate-900/50"
        )}>
            <button
                onClick={() => onToggle(todo.id)}
                className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                    todo.completed
                        ? "bg-primary border-primary text-white"
                        : "border-slate-300 dark:border-slate-700 hover:border-primary"
                )}
            >
                {todo.completed && <Check className="w-4 h-4" />}
            </button>

            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none focus:ring-0 rounded px-2 py-1 text-slate-800 dark:text-slate-100"
                        autoFocus
                    />
                ) : (
                    <p className={cn(
                        "text-slate-800 dark:text-slate-100 font-medium truncate",
                        todo.completed && "line-through text-slate-500"
                    )}>
                        {todo.text}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="p-2 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 rounded-lg transition-colors"
                        >
                            <Save className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleCancel}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-lg transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(todo.id)}
                            className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TodoItem;
