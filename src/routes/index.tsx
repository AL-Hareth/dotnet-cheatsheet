import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, routeAction$ } from "@builder.io/qwik-city";
import { createServerClient } from "supabase-auth-helpers-qwik";
import { AddTodoForm } from "~/components/AddTodoForm";
import { CommandCard } from "~/components/CommandCard";
import type { Todo } from "~/types";

export const useTodos = routeLoader$(async (req) => {
    const supabase = createServerClient(
        req.env.get("SUPABASE_URL")!,
        req.env.get("SUPABASE_ANON")!,
        req
    );

    const todos = await supabase.from("commands").select("title, description, command");

    return todos.data as Todo[];

});

export const useAddTodo = routeAction$(async (data, req) => {
    const supabase = createServerClient(
        req.env.get("SUPABASE_URL")!,
        req.env.get("SUPABASE_ANON")!,
        req
    );

    await supabase.from("commands").insert([{
        title: data.title as string,
        description: data.description as string,
        command: data.command as string
    }])
        .select();

});

export default component$(() => {

    const todos = useTodos();

    return <>
        <h1 class="text-6xl text-center font-extrabold py-6">
            <span class="inline-block bg-gradient-to-r from-blue-600 to-pink-500 via-emerald-400 text-transparent bg-clip-text">DotNet</span>
            &nbsp;Commands CheatSheet
        </h1>
        <AddTodoForm />
        <TodosList todos={todos.value} />
    </>;
});

const TodosList = component$<{ todos: Todo[] }>(({ todos }) => {
    return <>{todos.map((todo) => <CommandCard key={todo.title} title={todo.title} command={todo.command} description={todo.description} />)}</>;
});

export const head: DocumentHead = {
    title: "Dotnet Commands CheatSheet",
    meta: [
    ],
};
