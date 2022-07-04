import { useAppSelector } from "./reduxhooks";

const useGetStatus = ()=>{
    const status = useAppSelector(state=>state.PostState?.status)
    return status
}

export default useGetStatus