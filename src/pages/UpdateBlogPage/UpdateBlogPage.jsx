import { useParams } from "react-router-dom";
import FormWithValidation from "../../components/common/FormWithValidation/FormWithVaildation";

const UpdateBlog = () => {
    const { id } = useParams();
    return <FormWithValidation formType={"update blog"} blogId={id} />
}
 
export default UpdateBlog;