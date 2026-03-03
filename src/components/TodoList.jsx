import React from 'react';
import TodoItem from './TodoItem';
import { ListTodo } from 'lucide-react';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
    if (todos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <ListTodo className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No tasks found</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-xs">
                    Your list is empty. Add a task to get started on your productivity journey!
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto px-1 py-1 custom-scrollbar">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};

export default TodoList;
