import { useAppSelector } from "./reduxhooks";

const useGetError = ()=>{
    const posts = useAppSelector(state=>state.PostState.error)
    return posts
}

export default useGetError