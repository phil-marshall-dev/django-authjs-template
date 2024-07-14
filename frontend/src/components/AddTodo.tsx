"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

const AddTodoForm: React.FC = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('input value')
        console.log(inputValue);
        console.log('session')
        console.log(session)
        if (inputValue.trim()) {
            const token = session?.access;

            const response = await fetch('http://127.0.0.1:8000/api/todos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text: inputValue }),
            });

            if (response.ok) {
                console.log('result ok')
                setInputValue('')
                router.refresh();
            } else {
                console.error('Failed to add todo');
            }
        }
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-9">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Add a new todo"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>
                        <div className="col-3">
                            <button className="btn btn-primary w-100" type="submit">
                                Add Todo
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTodoForm;
