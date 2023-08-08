import { component$ } from '@builder.io/qwik';

export const CopiedText = component$(() => {
    return <div class="z-10 absolute top-2 left-2">
        <div class="rounded-xl bg-gray-900 text-white p-5 text-lg border border-gray-500">Text Copied to clipboard</div>
    </div>
});
