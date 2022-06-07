import React from 'react';
import '@testing-library/jest-dom';
import {render,screen,waitFor} from '@testing-library/react';
import axios from "axios";
import Anime from '../Anime';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// match media workaround
global.matchMedia = global.matchMedia || function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

var mockAnilist = {
    "data": {
        "Page": {
            "pageInfo": {
                "total": 5000,
                "perPage": 10,
                "currentPage": 1,
                "lastPage": 500,
                "hasNextPage": true
            },
            "recommendations": [
                {
                    "id": 12,
                    "rating": 75,
                    "media": {
                        "id": 11757,
                        "title": {
                            "english": "Sword Art Online",
                            "native": "\u30bd\u30fc\u30c9\u30a2\u30fc\u30c8\u30fb\u30aa\u30f3\u30e9\u30a4\u30f3"
                        },
                        "description": "In the near future, a Virtual Reality Massive Multiplayer Online Role-Playing Game (VRMMORPG) called Sword Art Online has been released where players control their avatars with their bodies using a piece of technology called Nerve Gear. One day, players discover they cannot log out, as the game creator is holding them captive unless they reach the 100th floor of the game's tower and defeat the final boss. However, if they die in the game, they die in real life. Their struggle for survival starts now...<br><br>\n(Source: Crunchyroll)",
                        "episodes": 25,
                        "type": "ANIME",
                        "bannerImage": "https:\/\/s4.anilist.co\/file\/anilistcdn\/media\/anime\/banner\/11757-TlEEV9weG4Ag.jpg",
                        "coverImage": {
                            "extraLarge": "https:\/\/s4.anilist.co\/file\/anilistcdn\/media\/anime\/cover\/large\/nx11757-Q9P2zjCPICq5.jpg",
                            "large": "https:\/\/s4.anilist.co\/file\/anilistcdn\/media\/anime\/cover\/medium\/nx11757-Q9P2zjCPICq5.jpg",
                            "medium": "https:\/\/s4.anilist.co\/file\/anilistcdn\/media\/anime\/cover\/small\/nx11757-Q9P2zjCPICq5.jpg",
                            "color": "#5DC0E4"
                        },
                        "startDate": {
                            "year": 2012,
                            "month": 7,
                            "day": 8
                        },
                        "endDate": {
                            "year": 2012,
                            "month": 12,
                            "day": 23
                        },
                        "genres": [
                            "Action",
                            "Adventure",
                            "Fantasy",
                            "Romance"
                        ]
                    }
                },
                {
                    "id": 14,
                    "rating": 217,
                    "media": {
                        "id": 11757,
                        "title": {
                            "english": "Sword Art Online",
                            "native": "\u30bd\u30fc\u30c9\u30a2\u30fc\u30c8\u30fb\u30aa\u30f3\u30e9\u30a4\u30f3"
                        },
                        "description": "In the near future, a Virtual Reality Massive Multiplayer Online Role-Playing Game (VRMMORPG) called Sword Art Online has been released where players control their avatars with their bodies using a piece of technology called Nerve Gear. One day, players discover they cannot log out, as the game creator is holding them captive unless they reach the 100th floor of the game's tower and defeat the final boss. However, if they die in the game, they die in real life. Their struggle for survival starts now...<br><br>\n(Source: Crunchyroll)",
                        "episodes": 25,
                        "type": "ANIME",
                        "bannerImage": "https:\/\/s4.anilist.co\/file\/anilistcdn\/media\/anime\/banner\/11757-TlEEV9weG4Ag.jpg",
                        "coverImage": {
                            "extraLarge": "https:\/\/s4.anilist.co\/file\/anilistcdn\/media\/anime\/cover\/large\/nx11757-Q9P2zjCPICq5.jpg",
                            "large": "https:\/\/s4.anilist.co\/file\/anilistcdn\/media\/anime\/cover\/medium\/nx11757-Q9P2zjCPICq5.jpg",
                            "medium": "https:\/\/s4.anilist.co\/file\/anilistcdn\/media\/anime\/cover\/small\/nx11757-Q9P2zjCPICq5.jpg",
                            "color": "#5DC0E4"
                        },
                        "startDate": {
                            "year": 2012,
                            "month": 7,
                            "day": 8
                        },
                        "endDate": {
                            "year": 2012,
                            "month": 12,
                            "day": 23
                        },
                        "genres": [
                            "Action",
                            "Adventure",
                            "Fantasy",
                            "Romance"
                        ]
                    }
                },
            ]
        }
    }
}

jest.mock("axios", () => ({
    post: jest.fn(),
}));

test('Match Snapshot', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({data:mockAnilist}));
    const {asFragment} = render(<BrowserRouter><Anime/></BrowserRouter>)
    
    await waitFor(() => axios.post)
    await new Promise((r) => setTimeout(r, 1000));
    expect(asFragment()).toMatchSnapshot()
})

test('Expect axios post to be called once', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({data:mockAnilist}));
    render(<Anime/>)
    
    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledTimes(1)
    })
})

test('On click Anime', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({data:mockAnilist}));
    render(<BrowserRouter><Anime/></BrowserRouter>)
    await waitFor(() => expect(axios.post).toHaveBeenCalled())
    await new Promise((r) => setTimeout(r, 1000));

    const card = screen.queryAllByTestId('test')[0]
    userEvent.click(card.firstChild)
    screen.debug()
})

