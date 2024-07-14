import TodoCard from "@/components/Todo";
import { ITodo, } from "@/models";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { DjangoUser } from "../../types/next-auth";
import AddTodoForm from "@/components/AddTodo";

type HomePageData = {
  user: DjangoUser | null,
  todos: ITodo[]
};


export default async function Page(req: NextApiRequest) {
  const { user, todos } = await getData()
  return (
    <div>
      <h1 className="display-4 text-center my-4">
        Welcome,{' '}{user ? user.username : 'Guest'}
      </h1>
      {user ?
        <div>
          <div>
            {todos.map((todo) => (
              <TodoCard key={todo.id} id = {todo.id} text={todo.text} />
            ))}
          </div>
          <AddTodoForm />
        </div>
        : null
      }
    </div>

  )
}




async function getData(): Promise<HomePageData> {
  const session = await getServerSession(authOptions)
  if (session) {
    const access = session.access
    const res = await fetch('http://127.0.0.1:8000/api/todos/', {
      cache: 'no-store',
      headers: { 'Authorization': `Bearer ${access}` }
    })
    const todos = await res.json();
    return {
      user: session.user,
      todos: todos as ITodo[]
    }
  } else {
    return {
      user: null,
      todos: []
    }
  }
}
