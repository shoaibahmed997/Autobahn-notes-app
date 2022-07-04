import {fireEvent,screen,render} from '../utils/test.utils'
import { createMemoryHistory } from 'history'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App'
import Header from '../Components/Header'
import AddPost from '../Pages/AddPost'
import Dashboard from '../Pages/Dashboard'

const MockedComponent = ()=>{
    const history = createMemoryHistory(['/','/add','/dashboard'])
    return(
        <BrowserRouter location={history.location} navigator={history}>
            <Header />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add" element={<AddPost />} />
            </Routes>
        </BrowserRouter>
    )
}


describe("Header unit tests",()=>{
    test("Dashboard and Add-Post button should render", ()=>{
        render(<MockedComponent  />);
        const dashboardBtn = screen.getByRole("button",{name:"Dashboard"})
        const addpostBtn = screen.getByRole("button",{name:"Add Post"})
        expect(dashboardBtn).toBeInTheDocument();
        expect(addpostBtn).toBeInTheDocument();
    })

    test("Routing Test - Should go to Add Post Page",async()=>{
        render(<MockedComponent  />);
        const addpostBtn = screen.getByRole("button",{name:"Add Post"})
        expect(addpostBtn).toBeInTheDocument();
        fireEvent.click(addpostBtn)
        const addpostelement = await screen.findByText("Add a New Post")
        expect(addpostelement).toBeInTheDocument();
    })
    test("Routing Test - Should go to the Dashboard Page",async ()=>{
        render(<MockedComponent  />);
        const dashboardBtn = screen.getByRole("button",{name:"Dashboard"})
        expect(dashboardBtn).toBeInTheDocument();
        fireEvent.click(dashboardBtn)
        const addpostelement = await screen.findByText("Dashboard")
        expect(addpostelement).toBeInTheDocument();
    })

   
})

