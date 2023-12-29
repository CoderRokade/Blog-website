import { common } from "@material-ui/core/colors";
import conf from "../conf/conf.js"
import { Client, Databases, Storage,Query,ID } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    //let's write some methods to intract with database
    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwuriteDatabaseId,conf.appwriteCollectionId,slug)
        } catch (error) {
            console.log("Appwrite service:: getPost()",error)
            return false
        }
    }

    async GetPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(conf.appwuriteDatabaseId,conf.appwriteCollectionId,queries)
        } catch (error) {
            console.log("Appwrite service:: getPosts()",error)
            return false
        }
    }
    
    async createPost({title,slug,content,feturedimage,status,userId}){
    try {
        return await this.databases.createDocument(conf.appwuriteDatabaseId,conf.appwriteCollectionId,slug,{title,content,feturedimage,status,userId})
    } catch (error) {
        console.log("Appwrite service:: createPost()",error)
            return false
    }
    }

    async updatePost(slug,{title,content,feturedimage,status}){
    try {
        return await this.databases.updateDocument(conf.appwuriteDatabaseId,conf.appwriteCollectionId,slug,
            {title,content,feturedimage,status})
    } catch (error) {
        console.log("Appwrite service:: UpdatePost()",error)
            return false
    }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwuriteDatabaseId,conf.appwriteCollectionId,slug)
            return true;
        } catch (error) {
            console.log("Appwrite service:: DeleteePost()",error)
                return false
        }
        }

        // storage service
        async uploadfile(file){
            try {
                return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file)
            } catch (error) {
                console.log("Appwrite service:: uploadfile()",error)
                return false
            }
        }
        async deletefile(fileID){
            try {
                return await this.bucket.deleteFile(conf.appwriteBucketId,fileID)
            } catch (error) {
                console.log("Appwrite service:: deletefile()",error)
                return false
            }
        }
        async getfilePreview(fileID){
            return await this.bucket.getFilePreview(conf.appwriteBucketId,fileID).href
        }

}

const service = new Service();
export default service;


