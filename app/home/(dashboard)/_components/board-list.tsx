'use client'
import board from '../../../../public/board.svg'
import EmptyString from "./empty-string";
import favourte from '../../../../public/favourite.svg'
import result from '../../../../public/result.svg'
import EmptyFavourite from './empty/empty-favourite';
import EmptySearch from './empty/empty-search';
import EmptyBoardString from './empty/empty-board-string';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { BoardCard } from './board-card/board-card';
import { NewBoardButton } from './board-card/new-button';

interface BoardListProps {
    organizations: string;
    searchParams: {
        search?: string;
        favourites?: string;
    }
}

export function BoardList({ organizations, searchParams }: BoardListProps) {
    console.log(searchParams.favourites)
    const data = useQuery(api.board.get, { orgId: organizations,favourite : searchParams.favourites,search : searchParams.search }); // TODO : change to api call
    console.log(data?.length)

    if (!data?.length && searchParams?.favourites) return <EmptyFavourite image={favourte} lable='No favourites' description='Try adding favourites' />

    if (!data?.length && searchParams?.search) return <EmptySearch image={result} lable='No results found ' description='Try searching something else' />

    //
    if (!data?.length) return <EmptyBoardString image={board} lable='Create your first board' description='Start by creating a board for your organization' button='Create board' />
    if (data === undefined) {
        return (
            <div>
                <h2 className='text-3xl'>{searchParams.favourites ? "Favourites Board" : "Team Boards"}</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-5 mt-8 pb-10'>
                    <NewBoardButton id={organizations} disabled />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                </div>
            </div>
        )
    }
    return (
        <div>
            <h2 className='text-5xl my-5 mb-10'>
                {searchParams.favourites ? "Favourites Board" : "Team Boards"}
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8 pb-10'>
                <NewBoardButton id={organizations} />
                {data?.map((board) => <BoardCard key={board?._id} idNumber={board?._id} title={board?.title} imagurl={board?.imageUrl} authorId={board?.authorId} authorName={board?.authorName}
                    createdAt={board?._creationTime}
                    autorId={board?.authorId}
                    orgId={board?.orgId}
                    isFavourite={board.isFavourite}
                />)}
            </div>

        </div>
    )
}