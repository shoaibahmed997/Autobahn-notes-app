import PostItem from "../Components/PostItem"
import { render,screen } from "../utils/test.utils"



describe("Post Item Component Tests",()=>{

    test("Post",()=>{
        render(<PostItem title="Hallo" />)
        const Element = screen.getByText("Hallo")
        expect(Element).toBeInTheDocument();
    })
})