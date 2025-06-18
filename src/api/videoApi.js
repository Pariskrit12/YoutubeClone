import { baseApi } from "./baseApi";

export const videoApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllVideos:builder.query({
            query:()=>'api/v1/videos/get-all-video'
        })
    })
})
export const{useGetAllVideosQuery}=videoApi;