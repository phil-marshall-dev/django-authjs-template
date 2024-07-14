"use client"

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

type TodoCardProps = {
    text: string;
    id: string;
};

const TodoCard: React.FC<TodoCardProps> = ({ text, id }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleClick = async () => {
        const token = session?.access;
        const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.ok) {
            console.log('result ok')
            router.refresh();
        } else {
            // Handle error
            console.error('Failed to add todo');
            console.log(response.text)
        }

    }
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="row d-flex align-items-center">
                    <div className="col-9">
                        <p className="card-text mb-0">{text}</p>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-danger w-100" onClick={handleClick}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>);
};

export default TodoCard;