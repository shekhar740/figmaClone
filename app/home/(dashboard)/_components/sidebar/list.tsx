'use client'

import { useOrganizationList } from "@clerk/nextjs"
import { Item } from "./item"

export const List = () => {
    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true,
        }
    })
    if (!userMemberships.data?.length) return null
    console.log(userMemberships.data)
    return (
        <ul>
            {userMemberships.data.map((user) => (
                <Item id={user.organization?.id} name={user.organization?.name} key={user.organization?.id} image={user.organization?.imageUrl}  />
                // <p key={user.organization?.id}> {user.organization?.name}</p>
            ))}

        </ul>
    )
}