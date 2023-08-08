import { $, component$, useContext, useOn } from '@builder.io/qwik';
import { CopyAlertContext } from '~/context/CopyContext';
import type { Todo } from '~/types';

export const CommandCard = component$<Todo>(({ title, description, command }) => {

    const copy = useContext(CopyAlertContext);

    useOn("click", $(() => {
        navigator.clipboard.writeText(command);

        copy.visible = true;
        setTimeout(() => {
            copy.visible = false;
        }, 2000);

    }));

    const editedCommand = command.split(" ").map((word) => {
        if (word[0] === "<") {
            return `&lt;${word.substring(1, word.length - 1)}&gt;`;
        }

        if (["dotnet", "add", "ef", "package"].includes(word)) {
            return `<span class="text-blue-400">${word}</span>`;
        }
        return word;
    }).join(" ");

    return <div class="bg-gray-950 px-4 py-2 my-2 rounded-lg">
        <h1 class="text-xl my-2">{title}</h1>
        <p class="text-gray-400 my-2">{description}</p>
        <pre class="mb-2 bg-gray-700 px-4 py-2 rounded-md overflow-x-scroll">$ <code dangerouslySetInnerHTML={editedCommand}></code></pre>
    </div>
});
