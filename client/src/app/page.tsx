import {getMe} from "@/hooks/get-me.service";


export default async function Home() {
    const me = await getMe();
    console.log(me);
    return (
        <main>
        </main>
    );
}
