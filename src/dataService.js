import { api } from "./api.js";

const dataEndPoints = {
    getAllCharacters: 'data/shoes?sortBy=_createdOn%20desc',
    postCharacter: 'data/shoes',
    getSingleCharacter: 'data/shoes/',
    deleteCharacter: 'data/shoes'
}

async function getAllCharacters(){
    return api.get(dataEndPoints.getAllCharacters);
}

async function addCharacter(data){
   return api.post(dataEndPoints.postCharacter, data);
}

async function getSingleCharacter(id){
    return api.get(dataEndPoints.getSingleCharacter + id);
}

async function updateCharacter(id, data){
    return api.put(dataEndPoints.getSingleCharacter + id, data);
}

async function deleteCharacter(id){
    return api.del(dataEndPoints.getSingleCharacter + id);
}

export const dataService = {
   getAllCharacters,
   addCharacter,
   getSingleCharacter,
   updateCharacter,
   deleteCharacter
}