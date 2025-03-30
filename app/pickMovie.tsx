import { StyleSheet, Animated, TouchableHighlight, TextInput, View, TouchableOpacity, Text, Dimensions } from "react-native";
import {useState, useEffect, useRef} from 'react';
import MovieCard from "./components/movieCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLocationStore, useCinemaStore, useMovieStore } from "./store";

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

    const [base_data, set_base_data] = useState(null);
    const [formated_data, set_formated_data] = useState(null);
    const [timeBased_data, set_timebase_data] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);

    const cardWidth = Dimensions.get('screen').width * 0.9;
    const jumpThreshold = 0.5;
    const [currentCard, setCurrentCard] = useState(0)
    const scrollRef = useRef<Animated.FlatList>(null);

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

    const color_options = [
      "rgba(176, 3, 3, 0.9)",
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

      const snapScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX/cardWidth);
    
        if (Math.abs(offsetX - index*cardWidth) < jumpThreshold*cardWidth ) {
          if (index != currentCard) {
            setCurrentCard(index);
            scrollRef.current?.scrollToIndex({index, animated: true});
          }
        }
      };

    const getTimeData = (data) => {
        let minDate;
        let maxDate;
        const movieTimesArr = data.films.map((movie, index) => {
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
        });
        let final_object = {
          movieTimes: movieTimesArr,
          earliest: minDate,
          latest: maxDate,
        }
        set_timebase_data(final_object);
    }

    const cardClicked = (i) => {
        navigation.navigate('movieInspect');
        setPickedMovie(i);
        //router.push({pathname: '/movieInspect', params: {movieItem: item}})
    }

    const vizClicked = () => {
        navigation.navigate('movieTimesVisualization', {movieTimeData: timeBased_data})
    }

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
            
            // const response = await fetch(`https://api-gate2.movieglu.com/cinemaShowTimes/?cinema_id=${cinemaId}&date=2025-03-25&sort=popularity`, {
            //   method: 'GET',
            //   headers: header_vals
            // });
            // console.log("response found", response);
            // const data = await response.json();
            // setHasFetched(true);
            // console.log("data found", data);
            // set_base_data(data)
            // formatDataInspect(data);
            // getTimeData(data);
          }
        } catch(err) {
          console.log("ERROR FOUND QUERYING DATA", err);
        }
      }
    
      useEffect(() => {
        fetchAPIData()
      }, [cinemaId, getlong, getlat])

        return (
          <SafeAreaView style={{flex: 1, backgroundColor: "#000000"}}>
            <View>
            {/* <TextInput style={mainStyles.searchBar}
            placeholder="filter movies"
            onChangeText={setSearch}>
            </TextInput> */}
            <TouchableOpacity style={mainStyles.visualizationButton} onPress={vizClicked}>
              <Text style={mainStyles.visualizationText}>Movie Time Visualization</Text>
            </TouchableOpacity>
            </View>
            { formated_data && 
            (<Animated.FlatList
              style={mainStyles.scrollBarContainer}
              data={formated_data}
              horizontal
              contentContainerStyle={mainStyles.itemStyle}
              onScroll={snapScroll}
              renderItem={({item, index, separators}) => (
                // <TouchableHighlight key={index}
                //   onShowUnderlay={separators.highlight}
                //   onHideUnderlay={separators.unhighlight}>
                    <MovieCard cardClicked={cardClicked} movieContent={item} opacityColor={color_options[index]}></MovieCard>
                //</TouchableHighlight>
            )}>
      
              </Animated.FlatList>)
            }
          </SafeAreaView>
        )

}

const mainStyles = StyleSheet.create({
    searchBar: {
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: 20,
      backgroundColor: "#CCCCCC",
      width: "95%",
      marginTop: 10,
      marginBottom: 10,
      paddingLeft: 10,
      paddingTop: 3,
      paddingBottom: 3,
      color: "#000000"
    },
  
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
