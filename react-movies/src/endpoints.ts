import { useState } from "react";

const baseURL= process.env.REACT_APP_API_URL;
export const urlGenres = `${baseURL}/Genre`;
export const urlActors = `${baseURL}/Actor`;
export const urlAccount = `${baseURL}/Accounts`;
export const urlMovie = `${baseURL}/Movie`;


 export function TokenConx () {
    
        return {
            headers: {
            'Authorization': `bearer ${localStorage.getItem("token")}`
            }
         };
    
    
 }
 