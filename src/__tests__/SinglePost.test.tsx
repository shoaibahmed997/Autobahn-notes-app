import SinglePost from "../Pages/SinglePost"
import { render,screen , act, fireEvent, findByText } from "../utils/test.utils"
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Dashboard from "../Pages/Dashboard"
import UpdatePost from "../Components/UpdatePost"

const MockedComponent = ()=>{
    const history = createMemoryHistory()
    return(
        <MemoryRouter initialEntries={["/posts/1"]} location={history.location} navigator={history}>
            <Routes>
                <Route path="/posts/:id" element={<SinglePost />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Dashboard />} />
                <Route path='update/:id' element={<UpdatePost />} />
            </Routes>
        </MemoryRouter>
    )
}

describe("Single Post Test",()=>{
    
    test("Render Buttons",async()=>{
        render(<MockedComponent />)
        const backButton = await screen.findByRole('button', {
            name: /back/i
          })

        const updateButton =await screen.findByRole('button', {
            name: /update/i
          })
        const deleteButton =await screen.findByRole('button', {
            name: /delete/i
          })

          expect(backButton).toBeInTheDocument();
          expect(updateButton).toBeVisible();
          expect(deleteButton).toBeVisible();
        })

    it("Render Title, Body, ID and UserID",async()=>{
        render(<MockedComponent />)
        const postid = await screen.findByText(/post\-id:1/i);
        const userid = await screen.findByText(/posted by:userid\-1/i)
        const title = await screen.findByRole('heading', {name: /hello world/i})
        const body = await screen.findByText(/hola hola/i)
        expect(postid).toBeInTheDocument()
        expect(userid).toBeInTheDocument()
        
    })

    it("Testing The back Button",async()=>{
        render(<MockedComponent />);
        const backButton = await screen.findByRole('button', {
            name: /back/i
          })
        
        await act(async()=>{
            fireEvent.click(backButton)
        })
        const DashboardHeading = await screen.findByText(/Dashboard/i)
        expect(DashboardHeading).toBeInTheDocument();
    })

    it("Testing The delete Button",async()=>{
        render(<MockedComponent />);
        const deleteButton = await screen.findByRole('button', {
            name: /delete/i
          })
        
        await act(async()=>{
            fireEvent.click(deleteButton)
        })
        const DashboardHeading = await screen.findByText(/Dashboard/i)
        expect(DashboardHeading).toBeInTheDocument();
    })

    it("Testing the update Button",async()=>{
        render(<MockedComponent />);

        const updateButton =await screen.findByRole('button', {
            name: /update/i
          })

        await act(async()=>{
            fireEvent.click(updateButton)
        })
        const UpdateHeading = await screen.findByRole("heading",{name:/Update Post/i})
        expect(UpdateHeading).toBeInTheDocument();
    })
})