'use client';

import { useOthers, useSelf } from "@/liveblocks.config";
import { UserAvatar } from "./user-avatar";

const MAX_SHOWN_USERS = 1;

export const Participants = () => {
    const users = useOthers();
    const currentUser = useSelf();
    const hasMoreUsers = users.length > MAX_SHOWN_USERS;


    return (
        <div className="absolute h-12 top-2 right-2 rounded-md text-white p-3 flex items-center shadow-md">
            <div className="flex gap-x-2">
                {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
                    <UserAvatar
                        key={connectionId}
                        src={info?.picture}
                        name={info?.name}
                        fallback={info?.name?.[0] || "A"}
                    />
                ))}
                {currentUser && (
                    <UserAvatar
                        src={currentUser.info?.picture}
                        name="me"
                        fallback={currentUser.info?.name?.[0] || "A"}
                    />
                )}
                {/*  */}
                {hasMoreUsers && (
                    <UserAvatar name={`${users.length - MAX_SHOWN_USERS} more`} fallback={`+${users.length - MAX_SHOWN_USERS}`} />
                )}
            </div>
        </div>
    );
};

export const PartiSkeleton = () => {
    return (
        <div className="absolute w-[200px] h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md" />
    );
};
