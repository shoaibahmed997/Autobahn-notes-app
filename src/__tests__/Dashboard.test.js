import {screen,render} from '../utils/test.utils'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'


const MockedComponent = ({children})=>{
    return (
            <BrowserRouter>
            {children}
            </BrowserRouter>
    )
}

describe("Dashboard Page Test",()=>{
    
    it("ultimate test",async ()=>{
        render(<MockedComponent>
                <Dashboard />
            </MockedComponent>
        )
        const element = await screen.findByText("hello world")
        expect(element).toBeInTheDocument();
    })

   

})

