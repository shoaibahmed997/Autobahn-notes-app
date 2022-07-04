import { useAppSelector } from "./reduxhooks";

const useGetPosts = ()=>{
    const posts = useAppSelector(state=>state.PostState?.posts)
    return posts
}


export default useGetPosts