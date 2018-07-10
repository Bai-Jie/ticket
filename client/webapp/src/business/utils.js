import axios from "axios";
import {ticketBackendPathGraphql} from "../config";

export const graphqlApi = axios.create({
    baseURL: ticketBackendPathGraphql,
    method: 'post',
    timeout: 10000
});

export function base64ascii(asciiStringToEncode) {
    return btoa(asciiStringToEncode);
}
