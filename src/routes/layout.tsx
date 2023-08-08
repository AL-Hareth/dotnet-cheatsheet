import { component$, Slot, useContext, useContextProvider, useStore } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { CopiedText } from "~/components/CopiedText";
import { CopyAlertContext } from "~/context/CopyContext";

export const onGet: RequestHandler = async ({ cacheControl }) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

export default component$(() => {

    const copy = useStore({ visible: false });
    useContextProvider(CopyAlertContext, copy);

    return <>
        {copy.visible && <CopiedText />}
        <main class="container p-6 mx-auto">
            <Slot />
        </main>
    </>;
});
