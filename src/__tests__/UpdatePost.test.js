
import {screen,render, fireEvent} from '../utils/test.utils'
import { createMemoryHistory } from 'history'
import UpdatePost from '../Components/UpdatePost'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import { act } from 'react-dom/test-utils'

const MockedComponent = ()=>{
    const history = createMemoryHistory()
    return(
        <MemoryRouter initialEntries={["/update/1"]} location={history.location} navigator={history}>
            <Routes>
                <Route path='/update/:id' element={<UpdatePost />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </MemoryRouter>
    )
}

describe("Update Post Test",()=>{

    test("Render heading",async()=>{
        render(<MockedComponent />)
        const Heading = await screen.findByRole("heading",{
            name:/update post/i
        }) 
        expect(Heading).toBeVisible();
    })

    test("Render Form input",async()=>{
        render(<MockedComponent />);
        const TitleInput = screen.getByRole('textbox', {
            name: /title/i
          })
        const BodyInput = screen.getByRole('textbox', {
            name: /body/i
          })

        expect(TitleInput).toBeInTheDocument();
        expect(BodyInput).toBeInTheDocument();
    })

    test("Mocking the API Put request",async()=>{
        render(<MockedComponent />);
        const TitleInput = screen.getByRole('textbox', {
            name: /title/i
          })
        const BodyInput = screen.getByRole('textbox', {
            name: /body/i
          })
        const updateButton =await screen.findByRole('button', {
            name: /update/i
          })
          fireEvent.change(TitleInput,{target:{value:"Hello"}})
          fireEvent.change(BodyInput,{target:{value:"Hello World"}})
          await act(async()=>{
            fireEvent.click(updateButton)
        })
        const DashboardHeading = await screen.findByText(/Dashboard/i)
        expect(DashboardHeading).toBeInTheDocument();
    })

})