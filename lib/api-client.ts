import { IVideo } from './../models/Video';
export type VideoFormData = Omit<IVideo,"_id">

type FetchOptions = {
    method? : "GET" | "POST" | "PUT" | "DELETE"
    body?: any
    headers?: Record<string, string>
}

class ApiClient {
    private async featch<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<T> {
        const {method = "GET", body, headers = {}} = options;

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }

        const responce = await fetch('/api${endpoint}',{
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined
        })

        if (!responce.ok) {
            throw new Error(await responce.text());
        }

        return responce.json()
    }


    async getVideos() {
        return this.featch("/videos");
    }

    async createVideo(videData: VideoFormData){
        return this.featch<IVideo>("/videos", {
            method: "POST",
            body: videData
        });
    }
    
}

export const apiClient = new ApiClient();