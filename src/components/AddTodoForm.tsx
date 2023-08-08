import { $, component$, useSignal } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { useAddTodo } from '~/routes';

export const AddTodoForm = component$(() => {
    const addTodo = useAddTodo();
    const inputStyle = "bg-gray-800 px-4 py-2 my-3 rounded-lg";

    return <Form action={addTodo} class="flex flex-col border border-gray-600 px-4 py-2 mb-4">
        <input
            placeholder='Title'
            name="title"
            required
            class={inputStyle}
        />
        <input
            placeholder='Description'
            name="description"
            required
            class={inputStyle}
        />
        <input
            placeholder='Command'
            name="command"
            required
            class={inputStyle}
        />
        <button class="bg-purple-700 rounded-lg px-4 py-2 my-2">Add</button>
    </Form>
});
