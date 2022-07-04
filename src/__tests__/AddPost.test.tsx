import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"
import AddPost from "../Pages/AddPost"
import { fireEvent, render, screen, waitFor } from "../utils/test.utils"


describe("AddPost Test",()=>{
    test("Heading Test - Should render Add a New Post",()=>{
        render(<AddPost /> )
        const HeadingElement = screen.getByText("Add a New Post")
        expect(HeadingElement).toBeInTheDocument();
    })

    test("Form Inputs Test - Should render Title and Body Input Elements",()=>{
        render(<AddPost /> )
        const TitleInput = screen.getByLabelText("Title")
        const BodyInput = screen.getByLabelText("Body")
        expect(TitleInput).toBeInTheDocument();
        expect(BodyInput).toBeInTheDocument();

    })

    test("Form Input Warnings Test - Should render warnings when trying to submit form without requirements ",async()=>{
        await act(async()=>{
            render(<AddPost /> )
        })
        const TitleInput = screen.getByRole('textbox', {
            name: /title/i
          })
        const BodyInput = screen.getByRole('textbox', {
            name: /body/i
          })
        const AddBtn = screen.getByRole('button', { name: /add post/i })
        fireEvent.change(TitleInput,{target:{value:"AB"}})
        fireEvent.change(BodyInput,{target:{value:"ABC"}})
        await act(async()=>{
            fireEvent.click(AddBtn)
        })
        const titleWarning =  screen.getByText(/minimum characters to be required are 3/i)
        const bodyWarning = screen.getByText(/minimum characters to be required are 5/i)
        expect(titleWarning).toBeVisible();
        expect(bodyWarning).toBeVisible();
    })

    test("Form Input Submission Test",async()=>{
        await act(async()=>{
            render(<AddPost /> )
        })
        const TitleInput = screen.getByRole('textbox', {
            name: /title/i
          })
        const BodyInput = screen.getByRole('textbox', {
            name: /body/i
          })
        const AddBtn = screen.getByRole('button', { name: /add post/i })
        
        fireEvent.change(TitleInput,{target:{value:"Hello"}})
        fireEvent.change(BodyInput,{target:{value:"Hello World"}})
        await act(async()=>{
            fireEvent.click(AddBtn)
        })
        const alertElement = await screen.findByText(/post added successfully/i)
        expect(alertElement).toBeInTheDocument()
    })

})