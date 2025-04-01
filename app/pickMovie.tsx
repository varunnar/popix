/*
Creator: Varun Narayanswamy
Date: 03/26/2025
Overview: Displays movie information from MovieGlu api, and cards for each, including rating and name
*/
import { StyleSheet, Animated, View, TouchableOpacity, Text, Dimensions } from "react-native";
import {useState, useEffect, useRef} from 'react';
import MovieCard from "./components/movieCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useLocationStore, useCinemaStore, useMovieStore } from "../store/index";

export default function PickMovie() {


    //ZUSTAND FUNCTIONS
    const getlong = useLocationStore((state => state.long));
    const getlat = useLocationStore((state => state.lat));
    const cinemaId = useCinemaStore((state => state.pickedCinema));
    const setMovies = useMovieStore((store => store.setMoviesData));
    const movieData = useMovieStore((store => store.moviesData));
    const setPickedMovie = useMovieStore(store => store.setPickedMovieData);

    //navigation functions
    const navigation = useNavigation();

    //useState functions
    const [base_data, set_base_data] = useState(null);
    const [formated_data, set_formated_data] = useState(null);
    const [timeBased_data, set_timebase_data] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);

    //card Data for animation
    const cardWidth = Dimensions.get('screen').width * 0.9;
    const jumpThreshold = 0.5;
    const [currentCard, setCurrentCard] = useState(0)
    const scrollRef = useRef<Animated.FlatList>(null);

    //Movie Sample Data
    const sampleData = {
        "cinema": {
            "cinema_id": 10560,
            "cinema_name": "Cinemark Century Boulder"
        },
        "films": [
            {
                "film_id": 337408,
                "imdb_id": 6208148,
                "imdb_title_id": "tt6208148",
                "film_name": "Disney's Snow White",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "PG ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/pg.png",
                        "age_advisory": "for violence, some peril, thematic elements and brief rude humor."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/337408/337408h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/337408/337408h2.jpg",
                                "width": 300,
                                "height": 201
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 337408,
                        "film_name": "Disney's Snow White",
                        "times": [
                            {
                                "start_time": "12:05",
                                "end_time": "14:19"
                            },
                            {
                                "start_time": "12:55",
                                "end_time": "15:09"
                            },
                            {
                                "start_time": "13:45",
                                "end_time": "15:59"
                            },
                            {
                                "start_time": "14:50",
                                "end_time": "17:04"
                            },
                            {
                                "start_time": "15:40",
                                "end_time": "17:54"
                            },
                            {
                                "start_time": "16:30",
                                "end_time": "18:44"
                            },
                            {
                                "start_time": "17:35",
                                "end_time": "19:49"
                            },
                            {
                                "start_time": "18:25",
                                "end_time": "20:39"
                            },
                            {
                                "start_time": "19:15",
                                "end_time": "21:29"
                            },
                            {
                                "start_time": "20:20",
                                "end_time": "22:34"
                            },
                            {
                                "start_time": "21:10",
                                "end_time": "23:24"
                            },
                            {
                                "start_time": "22:00",
                                "end_time": "00:14"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-24"
                    },
                    {
                        "date": "2025-03-25"
                    },
                    {
                        "date": "2025-03-26"
                    },
                    {
                        "date": "2025-03-27"
                    },
                    {
                        "date": "2025-03-28"
                    },
                    {
                        "date": "2025-03-29"
                    },
                    {
                        "date": "2025-03-30"
                    },
                    {
                        "date": "2025-03-31"
                    },
                    {
                        "date": "2025-04-01"
                    },
                    {
                        "date": "2025-04-02"
                    }
                ]
            },
            {
                "film_id": 357705,
                "imdb_id": 29603959,
                "imdb_title_id": "tt29603959",
                "film_name": "Novocaine",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "R ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/r.png",
                        "age_advisory": "for strong bloody violence, grisly images, and language throughout."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/357705/357705h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/357705/357705h2.jpg",
                                "width": 300,
                                "height": 200
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 357705,
                        "film_name": "Novocaine",
                        "times": [
                            {
                                "start_time": "12:35",
                                "end_time": "14:50"
                            },
                            {
                                "start_time": "15:30",
                                "end_time": "17:45"
                            },
                            {
                                "start_time": "18:40",
                                "end_time": "20:55"
                            },
                            {
                                "start_time": "21:45",
                                "end_time": "00:00"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-24"
                    },
                    {
                        "date": "2025-03-25"
                    },
                    {
                        "date": "2025-03-26"
                    },
                    {
                        "date": "2025-03-27"
                    },
                    {
                        "date": "2025-03-28"
                    },
                    {
                        "date": "2025-03-29"
                    },
                    {
                        "date": "2025-03-30"
                    },
                    {
                        "date": "2025-03-31"
                    }
                ]
            },
            {
                "film_id": 370523,
                "imdb_id": 30988739,
                "imdb_title_id": "tt30988739",
                "film_name": "Black Bag",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "R ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/r.png",
                        "age_advisory": "for language including some sexual references, and some violence."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/370523/370523h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/370523/370523h2.jpg",
                                "width": 300,
                                "height": 200
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 370523,
                        "film_name": "Black Bag",
                        "times": [
                            {
                                "start_time": "12:00",
                                "end_time": "13:58"
                            },
                            {
                                "start_time": "14:30",
                                "end_time": "16:28"
                            },
                            {
                                "start_time": "17:00",
                                "end_time": "18:58"
                            },
                            {
                                "start_time": "19:30",
                                "end_time": "21:28"
                            },
                            {
                                "start_time": "22:00",
                                "end_time": "23:58"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-24"
                    },
                    {
                        "date": "2025-03-25"
                    },
                    {
                        "date": "2025-03-26"
                    }
                ]
            },
            {
                "film_id": 345657,
                "imdb_id": 21815562,
                "imdb_title_id": "tt21815562",
                "film_name": "The Alto Knights",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "R ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/r.png",
                        "age_advisory": "for violence and pervasive language."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/345657/345657h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/345657/345657h2.jpg",
                                "width": 300,
                                "height": 199
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 345657,
                        "film_name": "The Alto Knights",
                        "times": [
                            {
                                "start_time": "12:40",
                                "end_time": "15:05"
                            },
                            {
                                "start_time": "15:40",
                                "end_time": "18:05"
                            },
                            {
                                "start_time": "18:40",
                                "end_time": "21:05"
                            },
                            {
                                "start_time": "21:40",
                                "end_time": "00:05"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-26"
                    },
                    {
                        "date": "2025-03-27"
                    },
                    {
                        "date": "2025-03-28"
                    },
                    {
                        "date": "2025-03-29"
                    },
                    {
                        "date": "2025-03-30"
                    },
                    {
                        "date": "2025-03-31"
                    },
                    {
                        "date": "2025-04-01"
                    },
                    {
                        "date": "2025-04-02"
                    }
                ]
            },
            {
                "film_id": 334851,
                "imdb_id": 14513804,
                "imdb_title_id": "tt14513804",
                "film_name": "Captain America: Brave New World",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "PG-13 ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/pg-13.png",
                        "age_advisory": "for intense sequences of violence and action, and some strong language."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/334851/334851h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/334851/334851h2.jpg",
                                "width": 300,
                                "height": 199
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 334851,
                        "film_name": "Captain America: Brave New World",
                        "times": [
                            {
                                "start_time": "12:50",
                                "end_time": "15:13"
                            },
                            {
                                "start_time": "18:40",
                                "end_time": "21:03"
                            },
                            {
                                "start_time": "21:35",
                                "end_time": "23:58"
                            }
                        ]
                    },
                    "3D": {
                        "film_id": 384236,
                        "film_name": "Captain America: Brave New World 3D",
                        "times": [
                            {
                                "start_time": "15:45",
                                "end_time": "18:08"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-24"
                    },
                    {
                        "date": "2025-03-25"
                    },
                    {
                        "date": "2025-03-26"
                    }
                ]
            },
            {
                "film_id": 341442,
                "imdb_id": 12299608,
                "imdb_title_id": "tt12299608",
                "film_name": "Mickey 17",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "R ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/r.png",
                        "age_advisory": "for violent content, language throughout, sexual content and drug material."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/341442/341442h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/341442/341442h2.jpg",
                                "width": 300,
                                "height": 200
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 341442,
                        "film_name": "Mickey 17",
                        "times": [
                            {
                                "start_time": "12:30",
                                "end_time": "15:12"
                            },
                            {
                                "start_time": "15:00",
                                "end_time": "17:42"
                            },
                            {
                                "start_time": "18:15",
                                "end_time": "20:57"
                            },
                            {
                                "start_time": "21:30",
                                "end_time": "00:12"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-24"
                    },
                    {
                        "date": "2025-03-25"
                    },
                    {
                        "date": "2025-03-26"
                    }
                ]
            },
            {
                "film_id": 365929,
                "imdb_id": 14403504,
                "imdb_title_id": "tt14403504",
                "film_name": "Last Breath",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "PG-13 ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/pg-13.png",
                        "age_advisory": "for brief strong language."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/365929/365929h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/365929/365929h2.jpg",
                                "width": 300,
                                "height": 199
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 365929,
                        "film_name": "Last Breath",
                        "times": [
                            {
                                "start_time": "12:00",
                                "end_time": "13:58"
                            },
                            {
                                "start_time": "14:30",
                                "end_time": "16:28"
                            },
                            {
                                "start_time": "17:00",
                                "end_time": "18:58"
                            },
                            {
                                "start_time": "19:30",
                                "end_time": "21:28"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-24"
                    },
                    {
                        "date": "2025-03-25"
                    },
                    {
                        "date": "2025-03-26"
                    },
                    {
                        "date": "2025-03-27"
                    },
                    {
                        "date": "2025-03-28"
                    },
                    {
                        "date": "2025-03-29"
                    },
                    {
                        "date": "2025-03-30"
                    },
                    {
                        "date": "2025-03-31"
                    },
                    {
                        "date": "2025-04-01"
                    },
                    {
                        "date": "2025-04-02"
                    }
                ]
            },
            {
                "film_id": 333994,
                "imdb_id": 5822536,
                "imdb_title_id": "tt5822536",
                "film_name": "Paddington in Peru",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "PG ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/pg.png",
                        "age_advisory": "for action, mild rude humor and some thematic elements."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/333994/333994h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/333994/333994h2.jpg",
                                "width": 300,
                                "height": 199
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 333994,
                        "film_name": "Paddington in Peru",
                        "times": [
                            {
                                "start_time": "13:15",
                                "end_time": "15:25"
                            },
                            {
                                "start_time": "16:00",
                                "end_time": "18:10"
                            },
                            {
                                "start_time": "18:45",
                                "end_time": "20:55"
                            },
                            {
                                "start_time": "21:30",
                                "end_time": "23:40"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-24"
                    },
                    {
                        "date": "2025-03-25"
                    },
                    {
                        "date": "2025-03-26"
                    },
                    {
                        "date": "2025-03-27"
                    },
                    {
                        "date": "2025-03-28"
                    },
                    {
                        "date": "2025-03-29"
                    },
                    {
                        "date": "2025-03-30"
                    },
                    {
                        "date": "2025-03-31"
                    },
                    {
                        "date": "2025-04-01"
                    }
                ]
            },
            {
                "film_id": 336841,
                "imdb_id": 17489650,
                "imdb_title_id": "tt17489650",
                "film_name": "Ash",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "R ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/r.png",
                        "age_advisory": "for bloody violence, gore and language."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/336841/336841h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/336841/336841h2.jpg",
                                "width": 300,
                                "height": 200
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 336841,
                        "film_name": "Ash",
                        "times": [
                            {
                                "start_time": "12:10",
                                "end_time": "14:10"
                            },
                            {
                                "start_time": "14:45",
                                "end_time": "16:45"
                            },
                            {
                                "start_time": "17:20",
                                "end_time": "19:20"
                            },
                            {
                                "start_time": "19:55",
                                "end_time": "21:55"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-28"
                    },
                    {
                        "date": "2025-03-29"
                    },
                    {
                        "date": "2025-03-30"
                    },
                    {
                        "date": "2025-03-31"
                    },
                    {
                        "date": "2025-04-01"
                    },
                    {
                        "date": "2025-04-02"
                    }
                ]
            },
            {
                "film_id": 358875,
                "imdb_id": 29929565,
                "imdb_title_id": "tt29929565",
                "film_name": "Opus",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "R ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/r.png",
                        "age_advisory": "for violent content including a grisly image, language, sexual material and brief graphic nudity."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/358875/358875h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/358875/358875h2.jpg",
                                "width": 300,
                                "height": 199
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 358875,
                        "film_name": "Opus",
                        "times": [
                            {
                                "start_time": "22:00",
                                "end_time": "00:08"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-24"
                    },
                    {
                        "date": "2025-03-25"
                    },
                    {
                        "date": "2025-03-26"
                    }
                ]
            },
            {
                "film_id": 364982,
                "imdb_id": 32768323,
                "imdb_title_id": "tt32768323",
                "film_name": "The Assessment",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "R ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/r.png",
                        "age_advisory": "for sexual content, language, suicide, sexual assault and brief nudity."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/364982/364982h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/364982/364982h2.jpg",
                                "width": 300,
                                "height": 200
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 364982,
                        "film_name": "The Assessment",
                        "times": [
                            {
                                "start_time": "12:00",
                                "end_time": "14:19"
                            },
                            {
                                "start_time": "14:50",
                                "end_time": "17:09"
                            },
                            {
                                "start_time": "17:40",
                                "end_time": "19:59"
                            },
                            {
                                "start_time": "20:30",
                                "end_time": "22:49"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-28"
                    },
                    {
                        "date": "2025-03-29"
                    },
                    {
                        "date": "2025-03-30"
                    },
                    {
                        "date": "2025-03-31"
                    }
                ]
            },
            {
                "film_id": 353621,
                "imdb_id": 28607951,
                "imdb_title_id": "tt28607951",
                "film_name": "Anora",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "R ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/r.png",
                        "age_advisory": "for strong sexual content throughout, graphic nudity, pervasive language, and drug use."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/353621/353621h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/353621/353621h2.jpg",
                                "width": 300,
                                "height": 201
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 353621,
                        "film_name": "Anora",
                        "times": [
                            {
                                "start_time": "12:05",
                                "end_time": "14:49"
                            },
                            {
                                "start_time": "15:20",
                                "end_time": "18:04"
                            },
                            {
                                "start_time": "18:35",
                                "end_time": "21:19"
                            },
                            {
                                "start_time": "21:20",
                                "end_time": "00:04"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-24"
                    },
                    {
                        "date": "2025-03-25"
                    },
                    {
                        "date": "2025-03-26"
                    },
                    {
                        "date": "2025-03-27"
                    },
                    {
                        "date": "2025-03-28"
                    }
                ]
            },
            {
                "film_id": 360519,
                "imdb_id": 32083311,
                "imdb_title_id": "tt32083311",
                "film_name": "On Becoming a Guinea Fowl",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "PG-13 ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/pg-13.png",
                        "age_advisory": "for thematic material involving sexual abuse, some drug use and suggestive references."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/360519/360519h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/360519/360519h2.jpg",
                                "width": 300,
                                "height": 200
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 360519,
                        "film_name": "On Becoming a Guinea Fowl",
                        "times": [
                            {
                                "start_time": "12:25",
                                "end_time": "14:25"
                            },
                            {
                                "start_time": "15:55",
                                "end_time": "17:55"
                            },
                            {
                                "start_time": "18:30",
                                "end_time": "20:30"
                            },
                            {
                                "start_time": "21:05",
                                "end_time": "23:05"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-24"
                    },
                    {
                        "date": "2025-03-25"
                    },
                    {
                        "date": "2025-03-26"
                    }
                ]
            },
            {
                "film_id": 368894,
                "imdb_id": 10365912,
                "imdb_title_id": "tt10365912",
                "film_name": "Becoming Led Zeppelin",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "PG-13 ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/pg-13.png",
                        "age_advisory": "for some drug references and smoking."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/368894/368894h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/368894/368894h2.jpg",
                                "width": 300,
                                "height": 201
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 368894,
                        "film_name": "Becoming Led Zeppelin",
                        "times": [
                            {
                                "start_time": "12:20",
                                "end_time": "14:47"
                            },
                            {
                                "start_time": "15:20",
                                "end_time": "17:47"
                            },
                            {
                                "start_time": "18:20",
                                "end_time": "20:47"
                            },
                            {
                                "start_time": "21:50",
                                "end_time": "00:17"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-25"
                    },
                    {
                        "date": "2025-03-26"
                    },
                    {
                        "date": "2025-03-27"
                    },
                    {
                        "date": "2025-03-28"
                    }
                ]
            },
            {
                "film_id": 358894,
                "imdb_id": 11563598,
                "imdb_title_id": "tt11563598",
                "film_name": "A Complete Unknown",
                "other_titles": null,
                "version_type": "Standard",
                "age_rating": [
                    {
                        "rating": "R ",
                        "age_rating_image": "https://assets.movieglu.com/age_rating_logos/us/r.png",
                        "age_advisory": "for language."
                    }
                ],
                "images": {
                    "poster": {
                        "1": {
                            "image_orientation": "portrait",
                            "region": "global",
                            "medium": {
                                "film_image": "https://image.movieglu.com/358894/358894h1.jpg",
                                "width": 200,
                                "height": 300
                            }
                        }
                    },
                    "still": {
                        "1": {
                            "image_orientation": "landscape",
                            "medium": {
                                "film_image": "https://image.movieglu.com/358894/358894h2.jpg",
                                "width": 300,
                                "height": 201
                            }
                        }
                    }
                },
                "showings": {
                    "Standard": {
                        "film_id": 358894,
                        "film_name": "A Complete Unknown",
                        "times": [
                            {
                                "start_time": "12:15",
                                "end_time": "15:00"
                            },
                            {
                                "start_time": "15:25",
                                "end_time": "18:10"
                            },
                            {
                                "start_time": "18:20",
                                "end_time": "21:05"
                            },
                            {
                                "start_time": "21:25",
                                "end_time": "00:10"
                            }
                        ]
                    }
                },
                "show_dates": [
                    {
                        "date": "2025-03-24"
                    },
                    {
                        "date": "2025-03-25"
                    },
                    {
                        "date": "2025-03-26"
                    },
                    {
                        "date": "2025-03-27"
                    },
                    {
                        "date": "2025-03-28"
                    },
                    {
                        "date": "2025-03-29"
                    },
                    {
                        "date": "2025-03-30"
                    },
                    {
                        "date": "2025-03-31"
                    },
                    {
                        "date": "2025-04-01"
                    },
                    {
                        "date": "2025-04-02"
                    }
                ]
            }
        ],
        "status": {
            "count": 15,
            "state": "OK",
            "method": "cinemaShowTimes",
            "message": null,
            "request_method": "GET",
            "version": "UNEM_0v200",
            "territory": "US",
            "device_datetime_sent": "2025-03-24T04:12:40.514Z",
            "device_datetime_used": "2025-03-24 04:12:40"
        }
    }

    //Color data
    const color_options = [
      "rgba(176, 3, 3, 0.6)",
      "rgba(255, 221, 89, 0.6)",  // Warm yellow
      "rgba(0, 128, 255, 0.6)",   // Vibrant blue
      "rgba(34, 177, 76, 0.6)",   // Strong green
      "rgba(255, 127, 39, 0.6)",  // Orange
      "rgba(163, 73, 164, 0.6)",  // Purple
      "rgba(255, 201, 14, 0.6)",  // Golden yellow
      "rgba(153, 217, 234, 0.6)", // Soft cyan
      "rgba(185, 122, 87, 0.6)",  // Warm brown
      "rgba(200, 191, 231, 0.6)", // Soft lavender
      "rgba(112, 146, 190, 0.6)", // Muted blue
      "rgba(181, 230, 29, 0.6)",  // Bright green
      "rgba(255, 174, 201, 0.6)", // Soft pink
      "rgba(195, 195, 195, 0.6)", // Neutral gray
      "rgba(94, 60, 153, 0.6)",   // Deep purple
      "rgba(255, 242, 0, 0.6)"    // Bright yellow
    ];

    //Format Data for inspection and card
    const formatDataInspect = (data) => {

        const cinema_films = data.films;
        const movie_arr = cinema_films.map((movie, index) => {
          const rating = movie.age_rating[0].rating;
          const ar = rating.substring(0, rating.length-1);
          const movie_object = {
            index: index,
            title: movie.film_name,
            format: movie.versionType || "standard",
            image: movie.images.poster["1"].medium.film_image || "",
            showtimes: movie.showings["Standard"].times || {},
            showDates: movie.show_dates || {},
            ageRating: ar || {}
          }
          return movie_object;
        });

        setMovies(movie_arr);
        set_formated_data(movie_arr);

    
    }

    //Snapping to scroll functionality for cards
    const snapScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX/cardWidth);

        if (Math.abs(offsetX - index*cardWidth) < jumpThreshold*cardWidth ) {
            if (index != currentCard && index < formated_data.length) {
            setCurrentCard(index);
            scrollRef.current?.scrollToIndex({index, animated: true});
            }
        }
    };

    //Format data for show time visualization
    const getTimeData = (data) => {
        let minDate;
        let maxDate;
        const movieTimesArr = data.films.map((movie, index) => {
            if (movie.show_dates) {
                let early = movie.show_dates[0].date;
                if (minDate == null || minDate>early) {
                    minDate = early;
                }
                let late = movie.show_dates[movie.show_dates.length-1].date;
                if (maxDate == null || maxDate<late) {
                    maxDate = late;
                }
                return {
                    index: index,
                    film_id: movie.film_id,
                    title: movie.film_name,
                    earliest_date: early,
                    latest_date: late,
                    image: movie.images.poster["1"].medium.film_image
                }
            } else {
                console.log("UNABLE TO FIND SHOW DATES FOR MOVIE", movie.film_id);
                return [];
            }
        });
        let final_object = {
          movieTimes: movieTimesArr,
          earliest: minDate,
          latest: maxDate,
        }
        set_timebase_data(final_object);
    }

    //navigate to inspect page
    const cardClicked = (i) => {
        navigation.navigate('movieInspect');
        setPickedMovie(i);
    }

    //navigate to visualization page
    const vizClicked = () => {
        navigation.navigate('movieTimesVisualization', {movieTimeData: timeBased_data})
    }

    //collect movie data (currently using sample data due to API showdate issues)
    const fetchAPIData = async () => {

        try {
          if (!getlong || !getlong || hasFetched) {
            return;
          }  
          /*else  if (Object.keys(movieData).length != 0 && movieData.) {
            
          }*/
          else {
            const header_vals = {
                "client": "UNEM_0",
                "x-api-key": process.env.EXPO_PUBLIC_MOVIE_GLU_TOKEN,
                "authorization": "Basic VU5FTV8wOmhYVURCa0Z3cENNbQ==",
                "territory": "US",
                "api-version": "v201",
                "geolocation": `${getlat}; ${getlong}`, // Replace with actual coordinates
                "device-datetime": new Date().toISOString() // Generates the current time in ISO 8601 format
            };
        
            set_base_data(sampleData)
            formatDataInspect(sampleData);
            getTimeData(sampleData);  
            // const current_date = new Date();
            // const formatted_date = current_date.toISOString().split('T')[0];
            // console.log(formatted_date);
            // const response = await fetch(`https://api-gate2.movieglu.com/cinemaShowTimes/?cinema_id=${cinemaId}&date=${formatted_date}&sort=popularity`, {
            //   method: 'GET',
            //   headers: header_vals
            // });

            // if (response.status === 400) {
            //     console.log("ERROR FOUND - 400 RESPONSE");
            // } else {
            //     const data = await response.json();
            //     setHasFetched(true);
            //     console.log("data found", JSON.stringify(data));

                // const data = {"cinema":{"cinema_id":10560,"cinema_name":"Cinemark Century Boulder","address":"1700 29th Street","address2":"","city":"Boulder","country":"USA","state":"CO","postcode":80301,"returned_date":"2025-04-02","show_dates":[{"date":"2025-04-02","display_date":"Wed 2 Apr"},{"date":"2025-04-03","display_date":"Thu 3 Apr"},{"date":"2025-04-04","display_date":"Fri 4 Apr"},{"date":"2025-04-05","display_date":"Sat 5 Apr"},{"date":"2025-04-06","display_date":"Sun 6 Apr"},{"date":"2025-04-07","display_date":"Mon 7 Apr"},{"date":"2025-04-08","display_date":"Tue 8 Apr"},{"date":"2025-04-09","display_date":"Wed 9 Apr"},{"date":"2025-04-10","display_date":"Thu 10 Apr"},{"date":"2025-04-11","display_date":"Fri 11 Apr"},{"date":"2025-04-12","display_date":"Sat 12 Apr"},{"date":"2025-04-13","display_date":"Sun 13 Apr"},{"date":"2025-04-14","display_date":"Mon 14 Apr"},{"date":"2025-04-15","display_date":"Tue 15 Apr"},{"date":"2025-04-16","display_date":"Wed 16 Apr"},{"date":"2025-04-17","display_date":"Thu 17 Apr"},{"date":"2025-04-18","display_date":"Fri 18 Apr"},{"date":"2025-04-19","display_date":"Sat 19 Apr"},{"date":"2025-04-20","display_date":"Sun 20 Apr"},{"date":"2025-04-21","display_date":"Mon 21 Apr"},{"date":"2025-04-22","display_date":"Tue 22 Apr"},{"date":"2025-04-23","display_date":"Wed 23 Apr"},{"date":"2025-04-24","display_date":"Thu 24 Apr"},{"date":"2025-04-25","display_date":"Fri 25 Apr"},{"date":"2025-04-26","display_date":"Sat 26 Apr"},{"date":"2025-04-27","display_date":"Sun 27 Apr"},{"date":"2025-04-28","display_date":"Mon 28 Apr"},{"date":"2025-04-29","display_date":"Tue 29 Apr"},{"date":"2025-04-30","display_date":"Wed 30 Apr"},{"date":"2025-05-04","display_date":"Sun 4 May"},{"date":"2025-05-07","display_date":"Wed 7 May"},{"date":"2025-05-17","display_date":"Sat 17 May"},{"date":"2025-05-21","display_date":"Wed 21 May"},{"date":"2025-05-31","display_date":"Sat 31 May"},{"date":"2025-06-04","display_date":"Wed 4 Jun"}]},"films":[{"film_id":337408,"imdb_id":6208148,"imdb_title_id":"tt6208148","film_name":"Disney's Snow White","other_titles":null,"version_type":"Standard","synopsis_long":"<p>\"Disney's Snow White,\" a live-action musical reimagining of the classic 1937 film, opens exclusively in theaters March 21, 2025. Starring Rachel Zegler (\"West Side Story\") in the title role and Gal Gadot (\"Wonder Woman\") as her Stepmother, the Evil Queen, the magical music adventure journeys back to the timeless story with beloved characters Bashful, Doc, Dopey, Grumpy, Happy, Sleepy, and Sneezy.</p>","duration_mins":109,"duration_hrs_mins":"1h 49m","genres":[{"genre_id":32,"genre_name":"Fantasy"},{"genre_id":29,"genre_name":"Adventure"},{"genre_id":9,"genre_name":"Musical"}],"age_rating":[{"rating":"PG ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/pg.png","age_advisory":"for violence, some peril, thematic elements and brief rude humor."}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/337408/337408h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"landscape","medium":{"film_image":"https://image.movieglu.com/337408/337408h2.jpg","width":300,"height":201}}}},"showings":{"Standard":{"film_id":337408,"film_name":"Disney's Snow White","times":[{"start_time":"12:00","display_start_time":"12:00 PM"},{"start_time":"13:00","display_start_time":"1:00 PM"},{"start_time":"14:00","display_start_time":"2:00 PM"},{"start_time":"14:45","display_start_time":"2:45 PM"},{"start_time":"15:45","display_start_time":"3:45 PM"},{"start_time":"16:45","display_start_time":"4:45 PM"},{"start_time":"17:30","display_start_time":"5:30 PM"},{"start_time":"18:30","display_start_time":"6:30 PM"},{"start_time":"20:15","display_start_time":"8:15 PM"}]}}},{"film_id":360186,"imdb_id":9150192,"imdb_title_id":"tt9150192","film_name":"A Working Man","other_titles":null,"version_type":"Standard","synopsis_long":"<p>Levon Cade left his \"profession\" behind to live a simple life working construction and spending time with his daughter. But when his boss's teenage daughter vanishes, he's called upon to re-employ the skills that made him a legendary figure in the shadowy world of black ops. Levon's hunt for the missing college student takes him to the heart of a sinister criminal conspiracy creating a chain reaction that will threaten his new way of life.</p>","duration_mins":116,"duration_hrs_mins":"1h 56m","genres":[{"genre_id":5,"genre_name":"Action/Adventure"},{"genre_id":38,"genre_name":"Thriller"}],"age_rating":[{"rating":"R ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/r.png","age_advisory":"for strong violence, language throughout, and drug content."}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/360186/360186h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"landscape","medium":{"film_image":"https://image.movieglu.com/360186/360186h2.jpg","width":300,"height":200}}}},"showings":{"Standard":{"film_id":360186,"film_name":"A Working Man","times":[{"start_time":"13:10","display_start_time":"1:10 PM"},{"start_time":"16:05","display_start_time":"4:05 PM"},{"start_time":"19:00","display_start_time":"7:00 PM"}]}}},{"film_id":357163,"imdb_id":31314296,"imdb_title_id":"tt31314296","film_name":"The Woman In The Yard","other_titles":null,"version_type":"Standard","synopsis_long":"<p>A lone, spectral woman shrouded entirely in black appears on a family's front lawn without explanation and warns them \"today's the day.\"Where did she come from? What does she want? When will she leave? Only The Woman in the Yard knows.</p>","duration_mins":85,"duration_hrs_mins":"1h 25m","genres":[{"genre_id":13,"genre_name":"Horror"},{"genre_id":38,"genre_name":"Thriller"}],"age_rating":[{"rating":"PG-13 ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/pg-13.png","age_advisory":"for terror, some violent content/bloody images, suicide-related content, and brief strong language."}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/357163/357163h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"landscape","medium":{"film_image":"https://image.movieglu.com/357163/357163h2.jpg","width":300,"height":201}}}},"showings":{"Standard":{"film_id":357163,"film_name":"The Woman In The Yard","times":[{"start_time":"12:50","display_start_time":"12:50 PM"},{"start_time":"15:15","display_start_time":"3:15 PM"},{"start_time":"17:40","display_start_time":"5:40 PM"},{"start_time":"20:05","display_start_time":"8:05 PM"}]}}},{"film_id":372607,"imdb_id":28443655,"imdb_title_id":"tt28443655","film_name":"Death of a Unicorn","other_titles":null,"version_type":"Standard","synopsis_long":"<p>A father (Paul Rudd) and daughter (Jenna Ortega) accidentally hit and kill a unicorn while en route to a weekend retreat, where his billionaire boss (Richard E. Grant) seeks to exploit the creature's miraculous curative properties.</p>","duration_mins":108,"duration_hrs_mins":"1h 48m","genres":[{"genre_id":3,"genre_name":"Comedy"},{"genre_id":38,"genre_name":"Thriller"}],"age_rating":[{"rating":"R ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/r.png","age_advisory":"for strong violent content, gore, language and some drug use."}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/372607/372607h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"portrait","medium":{"film_image":"https://image.movieglu.com/0/0h2.jpg","width":200,"height":300}}}},"showings":{"Standard":{"film_id":372607,"film_name":"Death of a Unicorn","times":[{"start_time":"12:15","display_start_time":"12:15 PM"},{"start_time":"15:00","display_start_time":"3:00 PM"},{"start_time":"16:15","display_start_time":"4:15 PM"},{"start_time":"17:45","display_start_time":"5:45 PM"},{"start_time":"20:30","display_start_time":"8:30 PM"}]}}},{"film_id":381149,"imdb_id":31908820,"imdb_title_id":"tt31908820","film_name":"The Chosen: Last Supper Part 1","other_titles":null,"version_type":"Standard","synopsis_long":"<p>Jesus rides into the holy city as king, but finds his Father's house has been turned from a place of prayer into a corrupt market. As the Jewish High Priest schemes against the would-be Messiah, Jesus strikes firstturning the tables on religious corruption.</p>","duration_mins":120,"duration_hrs_mins":"2h 0m","genres":[{"genre_id":1,"genre_name":"Drama"}],"age_rating":[{"rating":"TBC ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/uc.png","age_advisory":""}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/381149/381149h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"landscape","medium":{"film_image":"https://image.movieglu.com/381149/381149h2.jpg","width":300,"height":200}}}},"showings":{"Standard":{"film_id":381149,"film_name":"The Chosen: Last Supper Part 1","times":[{"start_time":"12:10","display_start_time":"12:10 PM"},{"start_time":"14:50","display_start_time":"2:50 PM"},{"start_time":"17:30","display_start_time":"5:30 PM"},{"start_time":"20:30","display_start_time":"8:30 PM"}]}}},{"film_id":370523,"imdb_id":30988739,"imdb_title_id":"tt30988739","film_name":"Black Bag","other_titles":null,"version_type":"Standard","synopsis_long":"<p>From Director Steven Soderbergh, BLACK BAG is a gripping spy drama about legendary intelligence agents George Woodhouse and his beloved wife Kathryn. When she is suspected of betraying the nation, George faces the ultimate test - loyalty to his marriage or his country.</p>","duration_mins":93,"duration_hrs_mins":"1h 33m","genres":[{"genre_id":44,"genre_name":"Spy"},{"genre_id":38,"genre_name":"Thriller"}],"age_rating":[{"rating":"R ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/r.png","age_advisory":"for language including some sexual references, and some violence."}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/370523/370523h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"landscape","medium":{"film_image":"https://image.movieglu.com/370523/370523h2.jpg","width":300,"height":200}}}},"showings":{"Standard":{"film_id":370523,"film_name":"Black Bag","times":[{"start_time":"12:00","display_start_time":"12:00 PM"},{"start_time":"15:25","display_start_time":"3:25 PM"},{"start_time":"17:55","display_start_time":"5:55 PM"},{"start_time":"20:25","display_start_time":"8:25 PM"}]}}},{"film_id":357705,"imdb_id":29603959,"imdb_title_id":"tt29603959","film_name":"Novocaine","other_titles":null,"version_type":"Standard","synopsis_long":"<p>A high concept action movie about a sheltered bank executive (Jack Quaid) with a rare genetic condition that prevents him from feeling pain. When his bank is robbed and one of his co-workers (Amber Midthunder) is kidnapped, he is forced to act and turn his greatest liability into his greatest strength.</p>","duration_mins":110,"duration_hrs_mins":"1h 50m","genres":[{"genre_id":5,"genre_name":"Action/Adventure"},{"genre_id":38,"genre_name":"Thriller"}],"age_rating":[{"rating":"R ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/r.png","age_advisory":"for strong bloody violence, grisly images, and language throughout."}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/357705/357705h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"landscape","medium":{"film_image":"https://image.movieglu.com/357705/357705h2.jpg","width":300,"height":200}}}},"showings":{"Standard":{"film_id":357705,"film_name":"Novocaine","times":[{"start_time":"12:05","display_start_time":"12:05 PM"},{"start_time":"14:50","display_start_time":"2:50 PM"},{"start_time":"17:35","display_start_time":"5:35 PM"},{"start_time":"20:20","display_start_time":"8:20 PM"}]}}},{"film_id":345657,"imdb_id":21815562,"imdb_title_id":"tt21815562","film_name":"The Alto Knights","other_titles":null,"version_type":"Standard","synopsis_long":"<p>From Warner Bros. Pictures, \"The Alto Knights\" stars Academy Award winner Robert De Niro in a dual role, directed by Academy Award-winning filmmaker Barry Levinson.  The film follows two of New York's most notorious organized crime bosses, Frank Costello (De Niro) and Vito Genovese (De Niro), as they vie for control of the city's streets.  Once the best of friends, petty jealousies and a series of betrayals place them on a deadly collision course that will reshape the Mafia (and America)</p>","duration_mins":120,"duration_hrs_mins":"2h 0m","genres":[{"genre_id":1,"genre_name":"Drama"},{"genre_id":40,"genre_name":"Detective"},{"genre_id":38,"genre_name":"Thriller"}],"age_rating":[{"rating":"R ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/r.png","age_advisory":"for violence and pervasive language."}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/345657/345657h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"landscape","medium":{"film_image":"https://image.movieglu.com/345657/345657h2.jpg","width":300,"height":199}}}},"showings":{"Standard":{"film_id":345657,"film_name":"The Alto Knights","times":[{"start_time":"12:25","display_start_time":"12:25 PM"},{"start_time":"14:30","display_start_time":"2:30 PM"},{"start_time":"17:30","display_start_time":"5:30 PM"},{"start_time":"20:10","display_start_time":"8:10 PM"}]}}},{"film_id":341442,"imdb_id":12299608,"imdb_title_id":"tt12299608","film_name":"Mickey 17","other_titles":null,"version_type":"Standard","synopsis_long":"<p>From the Academy Award-winning writer/director of \"Parasite,\" Bong Joon Ho, comes his next groundbreaking cinematic experience, \"Mickey 17.\" The unlikely hero, Mickey Barnes (Robert Pattinson) has found himself in the extraordinary circumstance of working for an employer who demands the ultimate commitment to the jobto die, for a living.</p>","duration_mins":137,"duration_hrs_mins":"2h 17m","genres":[{"genre_id":5,"genre_name":"Action/Adventure"},{"genre_id":31,"genre_name":"Science Fiction"},{"genre_id":3,"genre_name":"Comedy"}],"age_rating":[{"rating":"R ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/r.png","age_advisory":"for violent content, language throughout, sexual content and drug material."}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/341442/341442h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"landscape","medium":{"film_image":"https://image.movieglu.com/341442/341442h2.jpg","width":300,"height":200}}}},"showings":{"Standard":{"film_id":341442,"film_name":"Mickey 17","times":[{"start_time":"13:05","display_start_time":"1:05 PM"},{"start_time":"16:20","display_start_time":"4:20 PM"},{"start_time":"19:35","display_start_time":"7:35 PM"}]}}},{"film_id":370460,"imdb_id":26677014,"imdb_title_id":"tt26677014","film_name":"The Penguin Lessons","other_titles":null,"version_type":"Standard","synopsis_long":"<p>THE PENGUIN LESSONS is inspired by the true story of a disillusioned Englishman who went to work in a school in Argentina in 1976. Expecting an easy ride, Tom discovers a divided nation and a class of unteachable students. However, after he rescues a penguin from an oil-slicked beach, his life is turned upside-down.</p>","duration_mins":110,"duration_hrs_mins":"1h 50m","genres":[{"genre_id":1,"genre_name":"Drama"}],"age_rating":[{"rating":"PG-13 ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/pg-13.png","age_advisory":"for strong language, some sexual references and thematic elements."}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/370460/370460h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"landscape","medium":{"film_image":"https://image.movieglu.com/370460/370460h2.jpg","width":300,"height":200}}}},"showings":{"Standard":{"film_id":370460,"film_name":"The Penguin Lessons","times":[{"start_time":"12:20","display_start_time":"12:20 PM"},{"start_time":"15:05","display_start_time":"3:05 PM"},{"start_time":"17:50","display_start_time":"5:50 PM"},{"start_time":"20:35","display_start_time":"8:35 PM"}]}}},{"film_id":366070,"imdb_id":31712434,"imdb_title_id":"tt31712434","film_name":"Sikandar","other_titles":null,"version_type":"Standard","synopsis_long":"<p>Sikandar follows the journey of a man who overcomes all hurdles that life throws his way just so that he can alleviate the plight of the less fortunate and those in need of his help. His transition from a nonchalant man to a selfless man, inspired by his wife, makes him emerge as a beacon of hope for those ensnared in darkness.</p>","duration_mins":136,"duration_hrs_mins":"2h 16m","genres":[{"genre_id":5,"genre_name":"Action/Adventure"},{"genre_id":38,"genre_name":"Thriller"}],"age_rating":[{"rating":"TBC ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/uc.png","age_advisory":""}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/366070/366070h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"portrait","medium":{"film_image":"https://image.movieglu.com/0/0h2.jpg","width":200,"height":300}}}},"showings":{"Standard":{"film_id":366070,"film_name":"Sikandar","times":[{"start_time":"12:40","display_start_time":"12:40 PM"},{"start_time":"19:05","display_start_time":"7:05 PM"}]}}},{"film_id":333994,"imdb_id":5822536,"imdb_title_id":"tt5822536","film_name":"Paddington in Peru","other_titles":null,"version_type":"Standard","synopsis_long":"<p>The highly anticipated third Paddington film brings Paddington's story to Peru as he returns to visit his beloved Aunt Lucy, who now resides at the Home for Retired Bears. With the Brown Family in tow, a thrilling adventure ensues when a mystery plunges them into an unexpected journey through the Amazon rainforest and to the mountain peaks of Peru.</p>","duration_mins":105,"duration_hrs_mins":"1h 45m","genres":[{"genre_id":29,"genre_name":"Adventure"},{"genre_id":8,"genre_name":"Family"},{"genre_id":3,"genre_name":"Comedy"}],"age_rating":[{"rating":"PG ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/pg.png","age_advisory":"for action, mild rude humor and some thematic elements."}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/333994/333994h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"landscape","medium":{"film_image":"https://image.movieglu.com/333994/333994h2.jpg","width":300,"height":199}}}},"showings":{"Standard":{"film_id":333994,"film_name":"Paddington in Peru","times":[{"start_time":"12:20","display_start_time":"12:20 PM"},{"start_time":"15:05","display_start_time":"3:05 PM"},{"start_time":"17:50","display_start_time":"5:50 PM"},{"start_time":"20:35","display_start_time":"8:35 PM"}]}}},{"film_id":357363,"imdb_id":28613536,"imdb_title_id":"tt28613536","film_name":"Bob Trevino Likes It","other_titles":null,"version_type":"Standard","synopsis_long":"<p>BOB TREVINO LIKES IT is inspired by the true friendship that writer/director Tracie Laymon found with a stranger in real life while looking for her father online.Often playing the role of caretaker to people like her father, who should be caring for her, Lily Trevino longs for familial connection. When her father, Robert, finally checks out of her life, Lily looks for him on the internet. She tries to \"friend\" a man she believes is her father on Facebook. But instead of finding Robert Trevino, she finds Bob Trevino instead.Bob Trevino works long hours at a construction company to support his wife Jeanie's elaborate scrapbooking habit. The couple has endured a lot in the past decade, and Bob has prioritized his wife's healing to the point of ignoring his feelings and sense of loneliness. When Bob gets an unexpected Facebook message from a stranger named Lily Trevino, he discerns she needs a friend as much as he does.Lily and Bob's blossoming friendship becomes a vital source of connection and healing for both, holding the power to change each of their lives forever. Winner of an astounding thirteen film festival audience awards, BOB TREVINO LIKES IT retains the optimism that big tech can still provide human connection and that true friendship is a powerful kind of love and perhaps the family we need most in today's world.</p>","duration_mins":102,"duration_hrs_mins":"1h 42m","genres":[{"genre_id":35,"genre_name":"ComedyDrama"}],"age_rating":[{"rating":"PG-13 ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/pg-13.png","age_advisory":"for brief strong language, and thematic elements."}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/357363/357363h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"landscape","medium":{"film_image":"https://image.movieglu.com/357363/357363h2.jpg","width":300,"height":201}}}},"showings":{"Standard":{"film_id":357363,"film_name":"Bob Trevino Likes It","times":[{"start_time":"12:05","display_start_time":"12:05 PM"},{"start_time":"14:45","display_start_time":"2:45 PM"},{"start_time":"17:25","display_start_time":"5:25 PM"},{"start_time":"20:05","display_start_time":"8:05 PM"}]}}},{"film_id":362937,"imdb_id":32221196,"imdb_title_id":"tt32221196","film_name":"One of Them Days","other_titles":null,"version_type":"Standard","synopsis_long":"<p>Best friends and roommates Dreux (Keke Palmer) and Alyssa (SZA) are about to have One of Them Days. When they discover Alyssa's boyfriend has blown their rent money, the duo finds themselves going to extremes in a comical race against the clock to avoid eviction and keep their friendship intact.</p>","duration_mins":97,"duration_hrs_mins":"1h 37m","genres":[{"genre_id":3,"genre_name":"Comedy"}],"age_rating":[{"rating":"R ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/r.png","age_advisory":"for language throughout, sexual material and brief drug use."}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/362937/362937h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"landscape","medium":{"film_image":"https://image.movieglu.com/362937/362937h2.jpg","width":300,"height":201}}}},"showings":{"Standard":{"film_id":362937,"film_name":"One of Them Days","times":[{"start_time":"19:30","display_start_time":"7:30 PM"}]}}},{"film_id":368894,"imdb_id":10365912,"imdb_title_id":"tt10365912","film_name":"Becoming Led Zeppelin","other_titles":null,"version_type":"Standard","synopsis_long":"<p>Becoming Led Zeppelin explores the origins of this iconic group and their meteoric rise in just one year against all the odds. Powered by awe-inspiring, psychedelic, never-before-seen footage, performances, and music, Bernard MacMahon's experiential cinematic odyssey explores Led Zeppelin's creative, musical, and personal origin story. The film is told in Led Zeppelin's own words and is the first officially sanctioned film on the group.</p>","duration_mins":122,"duration_hrs_mins":"2h 2m","genres":[{"genre_id":4,"genre_name":"Documentary"},{"genre_id":33,"genre_name":"Music"}],"age_rating":[{"rating":"PG-13 ","age_rating_image":"https://assets.movieglu.com/age_rating_logos/us/pg-13.png","age_advisory":"for some drug references and smoking."}],"images":{"poster":{"1":{"image_orientation":"portrait","region":"global","medium":{"film_image":"https://image.movieglu.com/368894/368894h1.jpg","width":200,"height":300}}},"still":{"1":{"image_orientation":"landscape","medium":{"film_image":"https://image.movieglu.com/368894/368894h2.jpg","width":300,"height":201}}}},"showings":{"Standard":{"film_id":368894,"film_name":"Becoming Led Zeppelin","times":[{"start_time":"12:55","display_start_time":"12:55 PM"},{"start_time":"15:55","display_start_time":"3:55 PM"},{"start_time":"18:55","display_start_time":"6:55 PM"}]}}}],"status":{"count":15,"state":"OK","method":"cinemaShowTimes","message":null,"request_method":"GET","version":"UNEM_0v201","territory":"US","device_datetime_sent":"2025-04-01T20:44:47.584Z","device_datetime_used":"2025-04-01 20:44:47"}}
                // set_base_data(data)
                // formatDataInspect(data);
                // getTimeData(data);
            //}
          }
        } catch(err) {
          console.log("ERROR FOUND QUERYING DATA", err);
        }
      }
    
      //collect data if cinemaId, and location data is collected
      useEffect(() => {
        fetchAPIData()
      }, [cinemaId, getlong, getlat])

        return (
          <SafeAreaView style={{flex: 1, backgroundColor: "#000000"}}>
            {timeBased_data && (<View>
            <TouchableOpacity style={pickMovieStyles.visualizationButton} onPress={vizClicked}>
              <Text style={pickMovieStyles.visualizationText}>Movie Time Visualization</Text>
            </TouchableOpacity>
            </View>)}
            { formated_data && 
            (<Animated.FlatList
              style={pickMovieStyles.scrollBarContainer}
              data={formated_data}
              horizontal
              contentContainerStyle={pickMovieStyles.itemStyle}
              onScroll={snapScroll}
              renderItem={({item, index, separators}) => (
                    <MovieCard cardClicked={cardClicked} movieContent={item} opacityColor={color_options[index]}></MovieCard>
            )}>
      
              </Animated.FlatList>)
            }
          </SafeAreaView>
        )

}

const pickMovieStyles = StyleSheet.create({
    scrollBarContainer: {
      marginTop: "auto",
      marginBottom: "auto",
      flexGrow: 1,
      height: "100%"
    },
  
    itemStyle: {
      alignItems: "flex-start",
      marginTop: 30
    },

    visualizationButton: {
      backgroundColor: "rgba(176, 3, 3, 0.46)",
      textAlign: "center",
      color: "#FFFFFF",
      width: "90%",
      margin: "auto",
      height: 50,
      padding: 5,
      borderRadius: 20
    },

    visualizationText: {
      fontSize: 18,
      color: "#FFFFFF",
      fontWeight: "600",
      margin: "auto"
    }
  })
