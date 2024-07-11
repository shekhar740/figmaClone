import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from '@liveblocks/node'
import { ConvexHttpClient } from "convex/browser"


const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
    secret: "sk_dev_hJskivotwCMpAweqzPu3RgWpZPEzEqF8qyfwSslAycw6z1Cz8qE9xu_OCAvxb7P4",
})



export async function POST(request: Request) {
    const authorization = await auth();
    const user = await currentUser();

    if (!authorization || !user) {
        return new Response("Unauthorized", { status: 403 });
    }

    const { room } = await request.json();
    const board = await convex.query(api.board.getAno, { id: room })


    // if (board?.orgId !== authorization.orgId) {
    //     return new Response("Unauthorized", { status: 403 });
    // }


    const userInfo = {
        name: user.firstName || "Anonymous",
        picture: user.imageUrl!,
    }

    const sesssion = liveblocks.prepareSession(user.id, { userInfo })
    if (room) {
        sesssion.allow(room, sesssion.FULL_ACCESS)
    }
    const { status, body } = await sesssion.authorize();
    
    return new Response(body, { status  : status})

}



