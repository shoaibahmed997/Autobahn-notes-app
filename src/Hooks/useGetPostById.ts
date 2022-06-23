import { useAppSelector } from "./reduxhooks";

const useGetPostById = (id:number|undefined)=>{
    const posts = useAppSelector(state=>state.PostState.posts)
    const post = posts.filter(item=>item.id === id) 
    return post[0]
}


export default useGetPostById