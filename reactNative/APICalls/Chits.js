import React from 'react';

export async function getChits() {
    try {
      let response = await fetch('https://localhost:3333/api/v0.0.5/chits');
      let responseJson = await response.json();
      return responseJson.movies;
    } catch (error) {
      console.error(error);
    }
}

export async function postChits() {
    try {
        let response = await fetch('https://localhost:3333/api/v0.0.5/chits');
        let responseJson = await response.json();
        return responseJson.movies;
    } catch (error) {
        console.error(error);
    }
}

export async function getChitsPhoto() {
    try {
        let response = await fetch('https://localhost:3333/api/v0.0.5/chits');
        let responseJson = await response.json();
        return responseJson.movies;
    } catch (error) {
        console.error(error);
    }
}

export async function postChitsPhoto() {
    try {
        let response = await fetch('https://localhost:3333/api/v0.0.5/chits');
        let responseJson = await response.json();
        return responseJson.movies;
    } catch (error) {
        console.error(error);
    }
}