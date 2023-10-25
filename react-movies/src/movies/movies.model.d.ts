export interface movieDTO{
    id:number ;
    title: string;
    poster: string;
}
export interface landingPageDTO{
    inTheaters? : movieDTO[];
    upcoming? : movieDTO[];
}
export interface filterMoviesForm{
    title: string;
    genreId: number;
    upcomingReleases : boolean;
    inTheaters : boolean;
}
export interface genreDTO{
    id:number;
    name: string;
}
export interface movieDTO2{
    id:number ;
    title: string;
    image: string;
    releasDate : Date,
    description : string,
    genre : genreDTO,
    image :string,
    genreId:number,
    trailer:string,
    rating:number,
    rateNbr:number
}
