import { useMutation } from "convex/react"
import { useState } from "react";

export const useApiMutation = (mutationFUnction: any) => {
    const [pending, setPending] = useState(false)
    const apiMutation = useMutation(mutationFUnction);

    const mutatue = (payload: any) => {
        setPending(true)
        return apiMutation(payload).finally(() => setPending(false))
            .then((result) => { return result })
            .catch((error) => { throw error })
    }
    return { mutatue, pending }

}

